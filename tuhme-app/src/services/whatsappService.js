import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import path from 'path';

class WhatsAppService {
  constructor() {
    this.client = null;
    this.isReady = false;
    this.init();
  }

  async init() {
    try {
      this.client = new Client({
        authStrategy: new LocalAuth({
          clientId: "tuhme-client",
          dataPath: process.env.WHATSAPP_SESSION_PATH || './whatsapp-session'
        }),
        puppeteer: {
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
          ]
        }
      });

      this.setupEventHandlers();
      await this.client.initialize();
    } catch (error) {
      console.error('WhatsApp initialization failed:', error);
      throw error;
    }
  }

  setupEventHandlers() {
    this.client.on('qr', (qr) => {
      console.log('WhatsApp QR Code:');
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      console.log('WhatsApp Client is ready!');
      this.isReady = true;
    });

    this.client.on('authenticated', () => {
      console.log('WhatsApp Client authenticated');
    });

    this.client.on('auth_failure', (msg) => {
      console.error('WhatsApp authentication failed:', msg);
    });

    this.client.on('disconnected', (reason) => {
      console.log('WhatsApp Client disconnected:', reason);
      this.isReady = false;
    });

    this.client.on('message', async (message) => {
      await this.handleIncomingMessage(message);
    });
  }

  async handleIncomingMessage(message) {
    try {
      const contact = await message.getContact();
      const chat = await message.getChat();
      
      // Log incoming message for analytics
      console.log(`Message from ${contact.number}: ${message.body}`);
      
      // Handle specific message types or keywords
      if (message.body.toLowerCase().includes('membership')) {
        await this.sendMembershipInfo(message.from);
      } else if (message.body.toLowerCase().includes('status')) {
        await this.sendOrderStatus(message.from);
      }
    } catch (error) {
      console.error('Error handling incoming message:', error);
    }
  }

  async sendMessage(phoneNumber, message, options = {}) {
    if (!this.isReady) {
      throw new Error('WhatsApp client is not ready');
    }

    try {
      const formattedNumber = this.formatPhoneNumber(phoneNumber);
      const chatId = `${formattedNumber}@c.us`;
      
      const sentMessage = await this.client.sendMessage(chatId, message, options);
      
      // Log successful message
      console.log(`Message sent to ${phoneNumber}: ${message.substring(0, 50)}...`);
      
      return sentMessage;
    } catch (error) {
      console.error(`Failed to send message to ${phoneNumber}:`, error);
      throw error;
    }
  }

  async sendMediaMessage(phoneNumber, mediaPath, caption = '') {
    if (!this.isReady) {
      throw new Error('WhatsApp client is not ready');
    }

    try {
      const media = MessageMedia.fromFilePath(mediaPath);
      const formattedNumber = this.formatPhoneNumber(phoneNumber);
      const chatId = `${formattedNumber}@c.us`;
      
      const sentMessage = await this.client.sendMessage(chatId, media, { caption });
      
      console.log(`Media message sent to ${phoneNumber}`);
      return sentMessage;
    } catch (error) {
      console.error(`Failed to send media to ${phoneNumber}:`, error);
      throw error;
    }
  }

  // Membership-specific messaging functions
  async sendMembershipWelcome(phoneNumber, membershipData) {
    const message = `🎉 Welcome to Tuhme Premium Membership!

Hello ${membershipData.name},

Your membership is now active! Here's what you get:

✨ Premium Benefits:
• Priority personal shopping
• Same-day delivery guaranteed
• Exclusive store access
• 24/7 concierge support
• Special member pricing

📅 Membership Details:
• Plan: ${membershipData.plan}
• Monthly Fee: $${membershipData.monthlyFee}
• Next Billing: ${membershipData.nextBilling}

🛍️ Start Shopping:
Send us screenshots of items you want, and we'll handle the rest!

Questions? Just reply to this message.

Welcome to luxury shopping made simple! 💎`;

    return await this.sendMessage(phoneNumber, message);
  }

  async sendPaymentConfirmation(phoneNumber, paymentData) {
    const message = `✅ Payment Confirmed

Hi ${paymentData.customerName},

Your payment has been successfully processed:

💳 Payment Details:
• Amount: $${paymentData.amount}
• Date: ${paymentData.date}
• Method: ${paymentData.method}
• Transaction ID: ${paymentData.transactionId}

${paymentData.type === 'membership' ? 
  `🌟 Your Tuhme membership is now active!` : 
  `📦 Your order is being processed.`}

Thank you for choosing Tuhme! 🖤`;

    return await this.sendMessage(phoneNumber, message);
  }

  async sendSubscriptionRenewal(phoneNumber, renewalData) {
    const message = `🔄 Membership Renewal Successful

Hi ${renewalData.customerName},

Your Tuhme Premium membership has been renewed:

📅 Renewal Details:
• Next billing date: ${renewalData.nextBillingDate}
• Amount charged: $${renewalData.amount}
• Payment method: ${renewalData.paymentMethod}

Continue enjoying:
• Priority personal shopping
• Same-day delivery
• Exclusive access
• 24/7 support

Thank you for staying with Tuhme! ✨`;

    return await this.sendMessage(phoneNumber, message);
  }

  async sendExpiryWarning(phoneNumber, expiryData) {
    const message = `⚠️ Membership Expiring Soon

Hi ${expiryData.customerName},

Your Tuhme Premium membership expires in ${expiryData.daysLeft} days.

🗓️ Expiry Date: ${expiryData.expiryDate}
💳 Auto-renewal: ${expiryData.autoRenewal ? 'Enabled' : 'Disabled'}

${expiryData.autoRenewal ? 
  'Your membership will auto-renew. No action needed!' : 
  'To continue enjoying premium benefits, please renew your membership.'}

Renew now: ${process.env.VITE_APP_URL}/membership

Don't lose access to:
• Priority shopping
• Same-day delivery
• Exclusive perks

Questions? Reply to this message. 💎`;

    return await this.sendMessage(phoneNumber, message);
  }

  async sendOrderUpdate(phoneNumber, orderData) {
    const statusEmojis = {
      'pending': '⏳',
      'confirmed': '✅',
      'shopping': '🛍️',
      'en_route': '🚗',
      'delivered': '📦',
      'completed': '🎉'
    };

    const message = `${statusEmojis[orderData.status]} Order Update

Order #${orderData.orderId}

Status: ${orderData.status.toUpperCase()}
${orderData.message}

${orderData.estimatedDelivery ? 
  `🕒 Estimated delivery: ${orderData.estimatedDelivery}` : ''}

${orderData.trackingUrl ? 
  `📱 Track: ${orderData.trackingUrl}` : ''}

Thank you for choosing Tuhme! 🖤`;

    return await this.sendMessage(phoneNumber, message);
  }

  async sendMembershipInfo(phoneNumber) {
    const message = `💎 Tuhme Premium Membership

Transform your shopping experience:

🌟 Premium Benefits:
• Priority personal shopping
• Same-day delivery guarantee
• Exclusive store partnerships
• 24/7 concierge support
• Member-only pricing
• No delivery fees

💰 Pricing:
• Monthly: $49.99/month
• Annual: $499.99/year (Save 17%)

🚀 How it works:
1. Send screenshots of desired items
2. We shop & deliver same day
3. Try on at home (15 minutes)
4. Pay for what you keep

Join now: ${process.env.VITE_APP_URL}/membership

Questions? Just reply! ✨`;

    return await this.sendMessage(phoneNumber, message);
  }

  async sendOrderStatus(phoneNumber) {
    // This would typically query the database for recent orders
    const message = `📦 Order Status

To check your order status, please provide your order number or check your dashboard:

🌐 Dashboard: ${process.env.VITE_APP_URL}/dashboard

Or reply with your order number (e.g., "TH001234").

Need help? Our support team is ready to assist! 💬`;

    return await this.sendMessage(phoneNumber, message);
  }

  formatPhoneNumber(phoneNumber) {
    // Remove all non-numeric characters
    let cleaned = phoneNumber.replace(/\D/g, '');
    
    // Add country code if not present
    if (!cleaned.startsWith('1') && cleaned.length === 10) {
      cleaned = '1' + cleaned;
    }
    
    return cleaned;
  }

  async isPhoneNumberValid(phoneNumber) {
    try {
      const formattedNumber = this.formatPhoneNumber(phoneNumber);
      const chatId = `${formattedNumber}@c.us`;
      const isRegistered = await this.client.isRegisteredUser(chatId);
      return isRegistered;
    } catch (error) {
      console.error('Error validating phone number:', error);
      return false;
    }
  }

  async getClientInfo() {
    if (!this.isReady) {
      return null;
    }
    
    try {
      const info = this.client.info;
      return {
        wid: info.wid,
        pushname: info.pushname,
        platform: info.platform,
        ready: this.isReady
      };
    } catch (error) {
      console.error('Error getting client info:', error);
      return null;
    }
  }

  async destroy() {
    try {
      if (this.client) {
        await this.client.destroy();
        this.isReady = false;
        console.log('WhatsApp client destroyed');
      }
    } catch (error) {
      console.error('Error destroying WhatsApp client:', error);
    }
  }
}

// Export singleton instance
export default new WhatsAppService();