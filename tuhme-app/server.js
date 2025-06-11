import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import stripeService from './src/services/stripeService.js';
import membershipService from './src/services/membershipService.js';
import whatsappService from './src/services/whatsappService.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.VITE_APP_URL || 'http://localhost:5173',
  credentials: true
}));

// Raw body parser for Stripe webhooks
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// JSON parser for other routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    services: {
      stripe: 'connected',
      whatsapp: whatsappService.isReady ? 'ready' : 'connecting'
    }
  });
});

// ===== CUSTOMER ROUTES =====
app.post('/api/customers', async (req, res) => {
  try {
    const customerData = req.body;
    const result = await membershipService.createCustomer(customerData);
    res.json(result);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/customers/:id', async (req, res) => {
  try {
    const customer = await membershipService.getCustomer(req.params.id);
    res.json(customer);
  } catch (error) {
    console.error('Error getting customer:', error);
    res.status(404).json({ error: error.message });
  }
});

app.put('/api/customers/:id', async (req, res) => {
  try {
    const customer = await membershipService.updateCustomer(req.params.id, req.body);
    res.json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(400).json({ error: error.message });
  }
});

// ===== MEMBERSHIP ROUTES =====
app.post('/api/memberships', async (req, res) => {
  try {
    const { customerId, planType, paymentMethodId } = req.body;
    const result = await membershipService.createMembership(customerId, planType, paymentMethodId);
    res.json(result);
  } catch (error) {
    console.error('Error creating membership:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/memberships/:id', async (req, res) => {
  try {
    const membership = await membershipService.getMembership(req.params.id);
    res.json(membership);
  } catch (error) {
    console.error('Error getting membership:', error);
    res.status(404).json({ error: error.message });
  }
});

app.get('/api/customers/:id/memberships', async (req, res) => {
  try {
    const memberships = await membershipService.getCustomerMemberships(req.params.id);
    res.json(memberships);
  } catch (error) {
    console.error('Error getting customer memberships:', error);
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/memberships/:id/cancel', async (req, res) => {
  try {
    const { cancelAtPeriodEnd = true } = req.body;
    const result = await membershipService.cancelMembership(req.params.id, cancelAtPeriodEnd);
    res.json(result);
  } catch (error) {
    console.error('Error cancelling membership:', error);
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/memberships/:id/reactivate', async (req, res) => {
  try {
    const result = await membershipService.reactivateMembership(req.params.id);
    res.json(result);
  } catch (error) {
    console.error('Error reactivating membership:', error);
    res.status(400).json({ error: error.message });
  }
});

// ===== STRIPE ROUTES =====
app.get('/api/stripe/plans', (req, res) => {
  try {
    const plans = stripeService.getAllMembershipPlans();
    res.json(plans);
  } catch (error) {
    console.error('Error getting plans:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/stripe/payment-intent', async (req, res) => {
  try {
    const { amount, currency, customerId, metadata } = req.body;
    const paymentIntent = await stripeService.createPaymentIntent(amount, currency, customerId, metadata);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/stripe/customers/:id/payment-methods', async (req, res) => {
  try {
    const paymentMethods = await stripeService.getCustomerPaymentMethods(req.params.id);
    res.json(paymentMethods);
  } catch (error) {
    console.error('Error getting payment methods:', error);
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/stripe/payment-methods/:id/attach', async (req, res) => {
  try {
    const { customerId } = req.body;
    const paymentMethod = await stripeService.attachPaymentMethod(req.params.id, customerId);
    res.json(paymentMethod);
  } catch (error) {
    console.error('Error attaching payment method:', error);
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/stripe/payment-methods/:id', async (req, res) => {
  try {
    const paymentMethod = await stripeService.detachPaymentMethod(req.params.id);
    res.json(paymentMethod);
  } catch (error) {
    console.error('Error detaching payment method:', error);
    res.status(400).json({ error: error.message });
  }
});

// ===== WHATSAPP ROUTES =====
app.post('/api/whatsapp/send', async (req, res) => {
  try {
    const { phoneNumber, message, options } = req.body;
    const result = await whatsappService.sendMessage(phoneNumber, message, options);
    res.json({ success: true, messageId: result.id });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/whatsapp/send-media', async (req, res) => {
  try {
    const { phoneNumber, mediaPath, caption } = req.body;
    const result = await whatsappService.sendMediaMessage(phoneNumber, mediaPath, caption);
    res.json({ success: true, messageId: result.id });
  } catch (error) {
    console.error('Error sending WhatsApp media:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/whatsapp/status', async (req, res) => {
  try {
    const info = await whatsappService.getClientInfo();
    res.json({ 
      ready: whatsappService.isReady, 
      info: info 
    });
  } catch (error) {
    console.error('Error getting WhatsApp status:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/whatsapp/validate-phone', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const isValid = await whatsappService.isPhoneNumberValid(phoneNumber);
    res.json({ valid: isValid });
  } catch (error) {
    console.error('Error validating phone number:', error);
    res.status(400).json({ error: error.message });
  }
});

// ===== PAYMENT ROUTES =====
app.get('/api/customers/:id/payments', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const payments = await membershipService.getCustomerPayments(req.params.id, limit);
    res.json(payments);
  } catch (error) {
    console.error('Error getting customer payments:', error);
    res.status(400).json({ error: error.message });
  }
});

// ===== ANALYTICS ROUTES =====
app.get('/api/analytics/memberships', async (req, res) => {
  try {
    const stats = await membershipService.getMembershipStats();
    res.json(stats);
  } catch (error) {
    console.error('Error getting membership stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// ===== WEBHOOK ROUTES =====
app.post('/api/webhooks/stripe', async (req, res) => {
  let event;

  try {
    const signature = req.headers['stripe-signature'];
    event = stripeService.constructWebhookEvent(req.body, signature);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return res.status(400).send(`Webhook signature verification failed: ${error.message}`);
  }

  try {
    await membershipService.handleStripeWebhook(event);
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler failed:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

// ===== SCHEDULED TASKS ROUTES =====
app.post('/api/tasks/check-expiring-memberships', async (req, res) => {
  try {
    const result = await membershipService.checkExpiringMemberships();
    res.json({ 
      success: true, 
      notificationsSent: result.length,
      notifications: result 
    });
  } catch (error) {
    console.error('Error checking expiring memberships:', error);
    res.status(500).json({ error: error.message });
  }
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// ===== SERVER STARTUP =====
async function startServer() {
  try {
    // Test Stripe connection
    const stripeTest = await stripeService.testConnection();
    console.log('Stripe connection:', stripeTest.connected ? '✅' : '❌');

    app.listen(PORT, () => {
      console.log(`🚀 TUHME API Server running on port ${PORT}`);
      console.log(`📱 WhatsApp Status: ${whatsappService.isReady ? 'Ready' : 'Connecting...'}`);
      console.log(`💳 Stripe Status: ${stripeTest.connected ? 'Connected' : 'Disconnected'}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  await whatsappService.destroy();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');
  await whatsappService.destroy();
  process.exit(0);
});

// Start the server
startServer();