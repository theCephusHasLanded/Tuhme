import Stripe from 'stripe';

class StripeService {
  constructor() {
    this.stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
      typescript: false
    });
    
    this.webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET;
    
    // Membership plans configuration
    this.membershipPlans = {
      monthly: {
        priceId: 'price_monthly_premium', // Replace with actual Stripe price ID
        name: 'Tuhme Premium Monthly',
        amount: 4999, // $49.99 in cents
        interval: 'month',
        features: [
          'Priority personal shopping',
          'Same-day delivery guarantee',
          'Exclusive store access',
          '24/7 concierge support',
          'Member-only pricing',
          'No delivery fees'
        ]
      },
      annual: {
        priceId: 'price_annual_premium', // Replace with actual Stripe price ID
        name: 'Tuhme Premium Annual',
        amount: 49999, // $499.99 in cents
        interval: 'year',
        features: [
          'All monthly benefits',
          'Save 17% vs monthly',
          'Priority customer support',
          'Exclusive annual member events',
          'Early access to new features'
        ]
      }
    };
  }

  // Customer Management
  async createCustomer(customerData) {
    try {
      const customer = await this.stripe.customers.create({
        email: customerData.email,
        name: customerData.name,
        phone: customerData.phone,
        metadata: {
          userId: customerData.userId,
          source: 'tuhme_app',
          registrationDate: new Date().toISOString()
        }
      });

      console.log('Stripe customer created:', customer.id);
      return customer;
    } catch (error) {
      console.error('Error creating Stripe customer:', error);
      throw new Error(`Failed to create customer: ${error.message}`);
    }
  }

  async updateCustomer(customerId, updateData) {
    try {
      const customer = await this.stripe.customers.update(customerId, updateData);
      console.log('Stripe customer updated:', customer.id);
      return customer;
    } catch (error) {
      console.error('Error updating Stripe customer:', error);
      throw new Error(`Failed to update customer: ${error.message}`);
    }
  }

  async getCustomer(customerId) {
    try {
      const customer = await this.stripe.customers.retrieve(customerId);
      return customer;
    } catch (error) {
      console.error('Error retrieving Stripe customer:', error);
      throw new Error(`Failed to retrieve customer: ${error.message}`);
    }
  }

  // Subscription Management
  async createSubscription(customerId, planType = 'monthly', paymentMethodId = null) {
    try {
      const plan = this.membershipPlans[planType];
      if (!plan) {
        throw new Error(`Invalid plan type: ${planType}`);
      }

      const subscriptionData = {
        customer: customerId,
        items: [{
          price: plan.priceId
        }],
        payment_behavior: 'default_incomplete',
        payment_settings: {
          save_default_payment_method: 'on_subscription'
        },
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          planType: planType,
          createdBy: 'tuhme_app',
          createdAt: new Date().toISOString()
        }
      };

      if (paymentMethodId) {
        subscriptionData.default_payment_method = paymentMethodId;
      }

      const subscription = await this.stripe.subscriptions.create(subscriptionData);

      console.log('Subscription created:', subscription.id);
      return subscription;
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw new Error(`Failed to create subscription: ${error.message}`);
    }
  }

  async updateSubscription(subscriptionId, updateData) {
    try {
      const subscription = await this.stripe.subscriptions.update(subscriptionId, updateData);
      console.log('Subscription updated:', subscription.id);
      return subscription;
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw new Error(`Failed to update subscription: ${error.message}`);
    }
  }

  async cancelSubscription(subscriptionId, cancelAtPeriodEnd = true) {
    try {
      const subscription = await this.stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: cancelAtPeriodEnd,
        metadata: {
          cancelledAt: new Date().toISOString(),
          cancelledBy: 'customer'
        }
      });

      console.log('Subscription cancelled:', subscription.id);
      return subscription;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw new Error(`Failed to cancel subscription: ${error.message}`);
    }
  }

  async reactivateSubscription(subscriptionId) {
    try {
      const subscription = await this.stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false,
        metadata: {
          reactivatedAt: new Date().toISOString()
        }
      });

      console.log('Subscription reactivated:', subscription.id);
      return subscription;
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      throw new Error(`Failed to reactivate subscription: ${error.message}`);
    }
  }

  async getSubscription(subscriptionId) {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['latest_invoice', 'customer', 'default_payment_method']
      });
      return subscription;
    } catch (error) {
      console.error('Error retrieving subscription:', error);
      throw new Error(`Failed to retrieve subscription: ${error.message}`);
    }
  }

  async getCustomerSubscriptions(customerId) {
    try {
      const subscriptions = await this.stripe.subscriptions.list({
        customer: customerId,
        status: 'all',
        expand: ['data.latest_invoice']
      });
      return subscriptions.data;
    } catch (error) {
      console.error('Error retrieving customer subscriptions:', error);
      throw new Error(`Failed to retrieve subscriptions: ${error.message}`);
    }
  }

  // Payment Methods
  async attachPaymentMethod(paymentMethodId, customerId) {
    try {
      const paymentMethod = await this.stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId
      });
      console.log('Payment method attached:', paymentMethod.id);
      return paymentMethod;
    } catch (error) {
      console.error('Error attaching payment method:', error);
      throw new Error(`Failed to attach payment method: ${error.message}`);
    }
  }

  async detachPaymentMethod(paymentMethodId) {
    try {
      const paymentMethod = await this.stripe.paymentMethods.detach(paymentMethodId);
      console.log('Payment method detached:', paymentMethod.id);
      return paymentMethod;
    } catch (error) {
      console.error('Error detaching payment method:', error);
      throw new Error(`Failed to detach payment method: ${error.message}`);
    }
  }

  async getCustomerPaymentMethods(customerId, type = 'card') {
    try {
      const paymentMethods = await this.stripe.paymentMethods.list({
        customer: customerId,
        type: type
      });
      return paymentMethods.data;
    } catch (error) {
      console.error('Error retrieving payment methods:', error);
      throw new Error(`Failed to retrieve payment methods: ${error.message}`);
    }
  }

  // One-time Payments
  async createPaymentIntent(amount, currency = 'usd', customerId, metadata = {}) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        customer: customerId,
        automatic_payment_methods: {
          enabled: true
        },
        metadata: {
          ...metadata,
          createdBy: 'tuhme_app',
          createdAt: new Date().toISOString()
        }
      });

      console.log('Payment intent created:', paymentIntent.id);
      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error(`Failed to create payment intent: ${error.message}`);
    }
  }

  async confirmPaymentIntent(paymentIntentId, paymentMethodId) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId
      });
      console.log('Payment intent confirmed:', paymentIntent.id);
      return paymentIntent;
    } catch (error) {
      console.error('Error confirming payment intent:', error);
      throw new Error(`Failed to confirm payment intent: ${error.message}`);
    }
  }

  // Invoices
  async getInvoice(invoiceId) {
    try {
      const invoice = await this.stripe.invoices.retrieve(invoiceId);
      return invoice;
    } catch (error) {
      console.error('Error retrieving invoice:', error);
      throw new Error(`Failed to retrieve invoice: ${error.message}`);
    }
  }

  async getCustomerInvoices(customerId, limit = 10) {
    try {
      const invoices = await this.stripe.invoices.list({
        customer: customerId,
        limit: limit
      });
      return invoices.data;
    } catch (error) {
      console.error('Error retrieving invoices:', error);
      throw new Error(`Failed to retrieve invoices: ${error.message}`);
    }
  }

  // Webhook Handling
  constructWebhookEvent(body, signature) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        this.webhookSecret
      );
      return event;
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      throw new Error(`Webhook signature verification failed: ${error.message}`);
    }
  }

  async handleWebhookEvent(event) {
    try {
      console.log(`Processing webhook event: ${event.type}`);

      switch (event.type) {
        case 'customer.subscription.created':
          return await this.handleSubscriptionCreated(event.data.object);
        
        case 'customer.subscription.updated':
          return await this.handleSubscriptionUpdated(event.data.object);
        
        case 'customer.subscription.deleted':
          return await this.handleSubscriptionDeleted(event.data.object);
        
        case 'invoice.payment_succeeded':
          return await this.handlePaymentSucceeded(event.data.object);
        
        case 'invoice.payment_failed':
          return await this.handlePaymentFailed(event.data.object);
        
        case 'customer.subscription.trial_will_end':
          return await this.handleTrialWillEnd(event.data.object);
        
        case 'payment_intent.succeeded':
          return await this.handlePaymentIntentSucceeded(event.data.object);
        
        case 'payment_intent.payment_failed':
          return await this.handlePaymentIntentFailed(event.data.object);
        
        default:
          console.log(`Unhandled webhook event type: ${event.type}`);
          return { received: true };
      }
    } catch (error) {
      console.error('Error handling webhook event:', error);
      throw error;
    }
  }

  async handleSubscriptionCreated(subscription) {
    console.log('Subscription created:', subscription.id);
    
    try {
      // Get customer details
      const customer = await this.getCustomer(subscription.customer);
      
      // Update database with subscription info
      const subscriptionData = {
        stripeSubscriptionId: subscription.id,
        customerId: subscription.customer,
        status: subscription.status,
        planType: subscription.metadata.planType || 'monthly',
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        createdAt: new Date(subscription.created * 1000)
      };

      // Save to Firebase (implement based on your database structure)
      // await this.saveMembershipToDatabase(subscriptionData);

      return { processed: true, subscription: subscriptionData };
    } catch (error) {
      console.error('Error processing subscription creation:', error);
      throw error;
    }
  }

  async handleSubscriptionUpdated(subscription) {
    console.log('Subscription updated:', subscription.id);
    
    try {
      const subscriptionData = {
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        updatedAt: new Date()
      };

      // Update database
      // await this.updateMembershipInDatabase(subscription.id, subscriptionData);

      return { processed: true, subscription: subscriptionData };
    } catch (error) {
      console.error('Error processing subscription update:', error);
      throw error;
    }
  }

  async handleSubscriptionDeleted(subscription) {
    console.log('Subscription deleted:', subscription.id);
    
    try {
      // Update database to mark subscription as cancelled
      // await this.cancelMembershipInDatabase(subscription.id);

      return { processed: true, subscriptionId: subscription.id };
    } catch (error) {
      console.error('Error processing subscription deletion:', error);
      throw error;
    }
  }

  async handlePaymentSucceeded(invoice) {
    console.log('Payment succeeded for invoice:', invoice.id);
    
    try {
      const customer = await this.getCustomer(invoice.customer);
      
      const paymentData = {
        invoiceId: invoice.id,
        customerId: invoice.customer,
        subscriptionId: invoice.subscription,
        amount: invoice.amount_paid / 100, // Convert from cents
        currency: invoice.currency,
        paidAt: new Date(invoice.status_transitions.paid_at * 1000)
      };

      // Update database
      // await this.recordPaymentInDatabase(paymentData);

      // Send WhatsApp confirmation
      if (customer.phone) {
        const whatsappService = (await import('./whatsappService.js')).default;
        await whatsappService.sendPaymentConfirmation(customer.phone, {
          customerName: customer.name,
          amount: paymentData.amount,
          date: paymentData.paidAt.toLocaleDateString(),
          method: 'Credit Card',
          transactionId: invoice.id,
          type: invoice.subscription ? 'membership' : 'order'
        });
      }

      return { processed: true, payment: paymentData };
    } catch (error) {
      console.error('Error processing payment success:', error);
      throw error;
    }
  }

  async handlePaymentFailed(invoice) {
    console.log('Payment failed for invoice:', invoice.id);
    
    try {
      const customer = await this.getCustomer(invoice.customer);
      
      // Handle payment failure logic
      // - Send notification
      // - Update subscription status
      // - Schedule retry

      return { processed: true, invoiceId: invoice.id };
    } catch (error) {
      console.error('Error processing payment failure:', error);
      throw error;
    }
  }

  async handleTrialWillEnd(subscription) {
    console.log('Trial ending soon for subscription:', subscription.id);
    
    try {
      const customer = await this.getCustomer(subscription.customer);
      
      // Send trial ending notification
      if (customer.phone) {
        const trialEndDate = new Date(subscription.trial_end * 1000);
        const daysLeft = Math.ceil((trialEndDate - new Date()) / (1000 * 60 * 60 * 24));
        
        const whatsappService = (await import('./whatsappService.js')).default;
        await whatsappService.sendExpiryWarning(customer.phone, {
          customerName: customer.name,
          daysLeft: daysLeft,
          expiryDate: trialEndDate.toLocaleDateString(),
          autoRenewal: !subscription.cancel_at_period_end
        });
      }

      return { processed: true, subscriptionId: subscription.id };
    } catch (error) {
      console.error('Error processing trial ending:', error);
      throw error;
    }
  }

  async handlePaymentIntentSucceeded(paymentIntent) {
    console.log('Payment intent succeeded:', paymentIntent.id);
    
    try {
      // Handle one-time payment success
      const paymentData = {
        paymentIntentId: paymentIntent.id,
        customerId: paymentIntent.customer,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        paidAt: new Date()
      };

      return { processed: true, payment: paymentData };
    } catch (error) {
      console.error('Error processing payment intent success:', error);
      throw error;
    }
  }

  async handlePaymentIntentFailed(paymentIntent) {
    console.log('Payment intent failed:', paymentIntent.id);
    
    try {
      // Handle payment failure
      return { processed: true, paymentIntentId: paymentIntent.id };
    } catch (error) {
      console.error('Error processing payment intent failure:', error);
      throw error;
    }
  }

  // Utility Methods
  formatPrice(amountInCents, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amountInCents / 100);
  }

  getMembershipPlan(planType) {
    return this.membershipPlans[planType] || null;
  }

  getAllMembershipPlans() {
    return this.membershipPlans;
  }

  async testConnection() {
    try {
      const account = await this.stripe.accounts.retrieve();
      console.log('Stripe connection successful. Account:', account.id);
      return { connected: true, account: account.id };
    } catch (error) {
      console.error('Stripe connection failed:', error);
      return { connected: false, error: error.message };
    }
  }
}

// Export singleton instance
export default new StripeService();