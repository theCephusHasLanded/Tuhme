import { db } from '../firebase/config.js';
import { collection, doc, addDoc, updateDoc, getDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import stripeService from './stripeService.js';
import whatsappService from './whatsappService.js';
import { v4 as uuidv4 } from 'uuid';

class MembershipService {
  constructor() {
    this.membershipsCollection = 'memberships';
    this.paymentsCollection = 'payments';
    this.customersCollection = 'customers';
  }

  // Customer Management
  async createCustomer(customerData) {
    try {
      // Validate required fields
      this.validateCustomerData(customerData);

      // Create Stripe customer
      const stripeCustomer = await stripeService.createCustomer({
        email: customerData.email,
        name: customerData.name,
        phone: customerData.phone,
        userId: customerData.userId || uuidv4()
      });

      // Save customer to Firebase
      const customerDoc = {
        userId: customerData.userId || uuidv4(),
        email: customerData.email,
        name: customerData.name,
        phone: customerData.phone,
        stripeCustomerId: stripeCustomer.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true,
        membershipStatus: 'none', // none, trial, active, cancelled, expired
        preferences: customerData.preferences || {},
        metadata: {
          source: 'tuhme_app',
          referralCode: customerData.referralCode || null
        }
      };

      const docRef = await addDoc(collection(db, this.customersCollection), customerDoc);
      
      console.log('Customer created successfully:', docRef.id);
      
      return {
        firebaseId: docRef.id,
        stripeCustomerId: stripeCustomer.id,
        customer: customerDoc
      };
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error(`Failed to create customer: ${error.message}`);
    }
  }

  async getCustomer(firebaseId) {
    try {
      const docRef = doc(db, this.customersCollection, firebaseId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Customer not found');
      }
      
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } catch (error) {
      console.error('Error getting customer:', error);
      throw error;
    }
  }

  async getCustomerByStripeId(stripeCustomerId) {
    try {
      const q = query(
        collection(db, this.customersCollection),
        where('stripeCustomerId', '==', stripeCustomerId)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Customer not found');
      }
      
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      console.error('Error getting customer by Stripe ID:', error);
      throw error;
    }
  }

  async updateCustomer(firebaseId, updateData) {
    try {
      const docRef = doc(db, this.customersCollection, firebaseId);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      
      console.log('Customer updated successfully:', firebaseId);
      return await this.getCustomer(firebaseId);
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  }

  // Membership Management
  async createMembership(customerId, planType = 'monthly', paymentMethodId = null) {
    try {
      // Get customer data
      const customer = await this.getCustomer(customerId);
      
      // Create Stripe subscription
      const subscription = await stripeService.createSubscription(
        customer.stripeCustomerId,
        planType,
        paymentMethodId
      );

      // Save membership to Firebase
      const membershipDoc = {
        customerId: customerId,
        stripeCustomerId: customer.stripeCustomerId,
        stripeSubscriptionId: subscription.id,
        planType: planType,
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        metadata: {
          createdBy: 'tuhme_app',
          originalPlan: planType
        }
      };

      const docRef = await addDoc(collection(db, this.membershipsCollection), membershipDoc);

      // Update customer membership status
      await this.updateCustomer(customerId, {
        membershipStatus: subscription.status,
        activeMembershipId: docRef.id
      });

      // Send welcome message via WhatsApp
      if (customer.phone && subscription.status === 'active') {
        const plan = stripeService.getMembershipPlan(planType);
        await whatsappService.sendMembershipWelcome(customer.phone, {
          name: customer.name,
          plan: plan.name,
          monthlyFee: plan.amount / 100,
          nextBilling: membershipDoc.currentPeriodEnd.toLocaleDateString()
        });
      }

      console.log('Membership created successfully:', docRef.id);
      
      return {
        membershipId: docRef.id,
        subscription: subscription,
        membership: membershipDoc
      };
    } catch (error) {
      console.error('Error creating membership:', error);
      throw error;
    }
  }

  async getMembership(membershipId) {
    try {
      const docRef = doc(db, this.membershipsCollection, membershipId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Membership not found');
      }
      
      const membership = {
        id: docSnap.id,
        ...docSnap.data()
      };

      // Get latest Stripe subscription data
      if (membership.stripeSubscriptionId) {
        try {
          const stripeSubscription = await stripeService.getSubscription(membership.stripeSubscriptionId);
          membership.stripeData = stripeSubscription;
        } catch (error) {
          console.warn('Could not fetch Stripe subscription data:', error);
        }
      }

      return membership;
    } catch (error) {
      console.error('Error getting membership:', error);
      throw error;
    }
  }

  async getCustomerMemberships(customerId) {
    try {
      const q = query(
        collection(db, this.membershipsCollection),
        where('customerId', '==', customerId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const memberships = [];
      
      querySnapshot.forEach((doc) => {
        memberships.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return memberships;
    } catch (error) {
      console.error('Error getting customer memberships:', error);
      throw error;
    }
  }

  async updateMembership(membershipId, updateData) {
    try {
      const docRef = doc(db, this.membershipsCollection, membershipId);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      
      console.log('Membership updated successfully:', membershipId);
      return await this.getMembership(membershipId);
    } catch (error) {
      console.error('Error updating membership:', error);
      throw error;
    }
  }

  async cancelMembership(membershipId, cancelAtPeriodEnd = true) {
    try {
      const membership = await this.getMembership(membershipId);
      
      // Cancel Stripe subscription
      const cancelledSubscription = await stripeService.cancelSubscription(
        membership.stripeSubscriptionId,
        cancelAtPeriodEnd
      );

      // Update membership in Firebase
      await this.updateMembership(membershipId, {
        status: cancelledSubscription.status,
        cancelAtPeriodEnd: cancelledSubscription.cancel_at_period_end,
        cancelledAt: serverTimestamp(),
        cancelReason: 'customer_request'
      });

      // Update customer status
      const customer = await this.getCustomer(membership.customerId);
      await this.updateCustomer(membership.customerId, {
        membershipStatus: cancelAtPeriodEnd ? 'ending' : 'cancelled'
      });

      console.log('Membership cancelled successfully:', membershipId);
      
      return {
        membershipId: membershipId,
        subscription: cancelledSubscription
      };
    } catch (error) {
      console.error('Error cancelling membership:', error);
      throw error;
    }
  }

  async reactivateMembership(membershipId) {
    try {
      const membership = await this.getMembership(membershipId);
      
      // Reactivate Stripe subscription
      const reactivatedSubscription = await stripeService.reactivateSubscription(
        membership.stripeSubscriptionId
      );

      // Update membership in Firebase
      await this.updateMembership(membershipId, {
        status: reactivatedSubscription.status,
        cancelAtPeriodEnd: false,
        reactivatedAt: serverTimestamp()
      });

      // Update customer status
      await this.updateCustomer(membership.customerId, {
        membershipStatus: 'active'
      });

      console.log('Membership reactivated successfully:', membershipId);
      
      return {
        membershipId: membershipId,
        subscription: reactivatedSubscription
      };
    } catch (error) {
      console.error('Error reactivating membership:', error);
      throw error;
    }
  }

  // Payment Management
  async recordPayment(paymentData) {
    try {
      const paymentDoc = {
        customerId: paymentData.customerId,
        stripeCustomerId: paymentData.stripeCustomerId,
        membershipId: paymentData.membershipId || null,
        stripePaymentIntentId: paymentData.stripePaymentIntentId || null,
        stripeInvoiceId: paymentData.stripeInvoiceId || null,
        amount: paymentData.amount,
        currency: paymentData.currency || 'usd',
        status: paymentData.status,
        type: paymentData.type, // 'membership', 'order', 'one_time'
        description: paymentData.description || '',
        paidAt: paymentData.paidAt || serverTimestamp(),
        createdAt: serverTimestamp(),
        metadata: paymentData.metadata || {}
      };

      const docRef = await addDoc(collection(db, this.paymentsCollection), paymentDoc);
      
      console.log('Payment recorded successfully:', docRef.id);
      return {
        paymentId: docRef.id,
        payment: paymentDoc
      };
    } catch (error) {
      console.error('Error recording payment:', error);
      throw error;
    }
  }

  async getCustomerPayments(customerId, limit = 10) {
    try {
      const q = query(
        collection(db, this.paymentsCollection),
        where('customerId', '==', customerId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const payments = [];
      
      querySnapshot.forEach((doc) => {
        payments.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return payments.slice(0, limit);
    } catch (error) {
      console.error('Error getting customer payments:', error);
      throw error;
    }
  }

  // Webhook Event Handlers
  async handleStripeWebhook(event) {
    try {
      console.log(`Processing Stripe webhook: ${event.type}`);

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
        
        default:
          console.log(`Unhandled webhook event: ${event.type}`);
          return { received: true };
      }
    } catch (error) {
      console.error('Error handling Stripe webhook:', error);
      throw error;
    }
  }

  async handleSubscriptionCreated(subscription) {
    try {
      // Find customer by Stripe ID
      const customer = await this.getCustomerByStripeId(subscription.customer);
      
      // Update or create membership record
      await this.syncMembershipFromStripe(customer.id, subscription);
      
      return { processed: true };
    } catch (error) {
      console.error('Error handling subscription created:', error);
      throw error;
    }
  }

  async handleSubscriptionUpdated(subscription) {
    try {
      const customer = await this.getCustomerByStripeId(subscription.customer);
      await this.syncMembershipFromStripe(customer.id, subscription);
      
      return { processed: true };
    } catch (error) {
      console.error('Error handling subscription updated:', error);
      throw error;
    }
  }

  async handleSubscriptionDeleted(subscription) {
    try {
      const customer = await this.getCustomerByStripeId(subscription.customer);
      
      // Find membership by subscription ID
      const memberships = await this.getCustomerMemberships(customer.id);
      const membership = memberships.find(m => m.stripeSubscriptionId === subscription.id);
      
      if (membership) {
        await this.updateMembership(membership.id, {
          status: 'cancelled',
          cancelledAt: serverTimestamp()
        });
        
        await this.updateCustomer(customer.id, {
          membershipStatus: 'cancelled'
        });
      }
      
      return { processed: true };
    } catch (error) {
      console.error('Error handling subscription deleted:', error);
      throw error;
    }
  }

  async handlePaymentSucceeded(invoice) {
    try {
      const customer = await this.getCustomerByStripeId(invoice.customer);
      
      // Record payment
      await this.recordPayment({
        customerId: customer.id,
        stripeCustomerId: invoice.customer,
        stripeInvoiceId: invoice.id,
        amount: invoice.amount_paid / 100,
        currency: invoice.currency,
        status: 'succeeded',
        type: invoice.subscription ? 'membership' : 'one_time',
        description: invoice.description || 'Tuhme payment',
        paidAt: new Date(invoice.status_transitions.paid_at * 1000)
      });

      // Send WhatsApp confirmation
      if (customer.phone) {
        await whatsappService.sendPaymentConfirmation(customer.phone, {
          customerName: customer.name,
          amount: invoice.amount_paid / 100,
          date: new Date(invoice.status_transitions.paid_at * 1000).toLocaleDateString(),
          method: 'Credit Card',
          transactionId: invoice.id,
          type: invoice.subscription ? 'membership' : 'order'
        });
      }

      // If this is a renewal, send renewal message
      if (invoice.subscription && invoice.billing_reason === 'subscription_cycle') {
        const subscription = await stripeService.getSubscription(invoice.subscription);
        await whatsappService.sendSubscriptionRenewal(customer.phone, {
          customerName: customer.name,
          nextBillingDate: new Date(subscription.current_period_end * 1000).toLocaleDateString(),
          amount: invoice.amount_paid / 100,
          paymentMethod: 'Credit Card'
        });
      }
      
      return { processed: true };
    } catch (error) {
      console.error('Error handling payment succeeded:', error);
      throw error;
    }
  }

  async handlePaymentFailed(invoice) {
    try {
      const customer = await this.getCustomerByStripeId(invoice.customer);
      
      // Record failed payment
      await this.recordPayment({
        customerId: customer.id,
        stripeCustomerId: invoice.customer,
        stripeInvoiceId: invoice.id,
        amount: invoice.amount_due / 100,
        currency: invoice.currency,
        status: 'failed',
        type: invoice.subscription ? 'membership' : 'one_time',
        description: 'Failed payment attempt'
      });

      // Send payment failure notification
      if (customer.phone) {
        const message = `❌ Payment Failed

Hi ${customer.name},

Your payment could not be processed:

💳 Amount: $${(invoice.amount_due / 100).toFixed(2)}
📅 Date: ${new Date().toLocaleDateString()}
🆔 Invoice: ${invoice.id}

Please update your payment method to continue your membership:
${process.env.VITE_APP_URL}/account/billing

Need help? Reply to this message. 💬`;

        await whatsappService.sendMessage(customer.phone, message);
      }
      
      return { processed: true };
    } catch (error) {
      console.error('Error handling payment failed:', error);
      throw error;
    }
  }

  // Utility Methods
  async syncMembershipFromStripe(customerId, stripeSubscription) {
    try {
      // Find existing membership
      const memberships = await this.getCustomerMemberships(customerId);
      const existingMembership = memberships.find(m => 
        m.stripeSubscriptionId === stripeSubscription.id
      );

      const membershipData = {
        stripeSubscriptionId: stripeSubscription.id,
        status: stripeSubscription.status,
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
        updatedAt: serverTimestamp()
      };

      if (existingMembership) {
        await this.updateMembership(existingMembership.id, membershipData);
      } else {
        await addDoc(collection(db, this.membershipsCollection), {
          customerId: customerId,
          ...membershipData,
          createdAt: serverTimestamp()
        });
      }

      // Update customer status
      await this.updateCustomer(customerId, {
        membershipStatus: stripeSubscription.status
      });

      return membershipData;
    } catch (error) {
      console.error('Error syncing membership from Stripe:', error);
      throw error;
    }
  }

  validateCustomerData(customerData) {
    const required = ['email', 'name', 'phone'];
    const missing = required.filter(field => !customerData[field]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerData.email)) {
      throw new Error('Invalid email format');
    }

    // Validate phone format
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(customerData.phone)) {
      throw new Error('Invalid phone format');
    }
  }

  // Scheduled Tasks (call these from cron jobs)
  async checkExpiringMemberships() {
    try {
      const expiryThreshold = new Date();
      expiryThreshold.setDate(expiryThreshold.getDate() + 3); // 3 days before expiry

      const q = query(
        collection(db, this.membershipsCollection),
        where('status', '==', 'active'),
        where('currentPeriodEnd', '<=', expiryThreshold),
        where('cancelAtPeriodEnd', '==', true)
      );

      const querySnapshot = await getDocs(q);
      const notifications = [];

      for (const doc of querySnapshot.docs) {
        const membership = { id: doc.id, ...doc.data() };
        const customer = await this.getCustomer(membership.customerId);

        if (customer.phone) {
          const daysLeft = Math.ceil(
            (membership.currentPeriodEnd.toDate() - new Date()) / (1000 * 60 * 60 * 24)
          );

          await whatsappService.sendExpiryWarning(customer.phone, {
            customerName: customer.name,
            daysLeft: daysLeft,
            expiryDate: membership.currentPeriodEnd.toDate().toLocaleDateString(),
            autoRenewal: !membership.cancelAtPeriodEnd
          });

          notifications.push({
            customerId: customer.id,
            membershipId: membership.id,
            daysLeft: daysLeft
          });
        }
      }

      console.log(`Sent ${notifications.length} expiry warnings`);
      return notifications;
    } catch (error) {
      console.error('Error checking expiring memberships:', error);
      throw error;
    }
  }

  async getMembershipStats() {
    try {
      const memberships = await getDocs(collection(db, this.membershipsCollection));
      const stats = {
        total: 0,
        active: 0,
        cancelled: 0,
        trial: 0,
        revenue: 0
      };

      memberships.forEach((doc) => {
        const membership = doc.data();
        stats.total++;
        
        if (membership.status === 'active') stats.active++;
        else if (membership.status === 'canceled') stats.cancelled++;
        else if (membership.status === 'trialing') stats.trial++;
      });

      return stats;
    } catch (error) {
      console.error('Error getting membership stats:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new MembershipService();