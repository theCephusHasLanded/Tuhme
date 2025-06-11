import { useState, useEffect } from 'react';
import { useModal } from '../contexts/ModalContext';

const MembershipModal = () => {
  const { modals, closeModal } = useModal();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: info, 2: plan, 3: payment

  const membershipPlans = {
    monthly: {
      name: 'Premium Monthly',
      price: 49.99,
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
      name: 'Premium Annual',
      price: 499.99,
      interval: 'year',
      savings: 'Save 17%',
      features: [
        'All monthly benefits',
        'Save $100 vs monthly',
        'Priority customer support',
        'Exclusive annual events',
        'Early access to features'
      ]
    }
  };

  const handleInputChange = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value
    });
  };

  const validateStep1 = () => {
    const { name, email, phone } = customerData;
    if (!name || !email || !phone) {
      setError('Please fill in all fields');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid phone number');
      return false;
    }

    setError('');
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Create customer
      const customerResponse = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      });

      if (!customerResponse.ok) {
        throw new Error('Failed to create customer');
      }

      const customer = await customerResponse.json();

      // Create membership
      const membershipResponse = await fetch('/api/memberships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerId: customer.firebaseId,
          planType: selectedPlan
        })
      });

      if (!membershipResponse.ok) {
        throw new Error('Failed to create membership');
      }

      const membership = await membershipResponse.json();

      // Redirect to Stripe Checkout or handle payment
      if (membership.subscription.latest_invoice?.payment_intent?.client_secret) {
        // Handle Stripe payment intent
        window.location.href = `${window.location.origin}/payment?client_secret=${membership.subscription.latest_invoice.payment_intent.client_secret}`;
      }

    } catch (error) {
      console.error('Membership creation error:', error);
      setError(error.message || 'Failed to create membership. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetModal = () => {
    setStep(1);
    setSelectedPlan('monthly');
    setCustomerData({ name: '', email: '', phone: '' });
    setError('');
    setIsLoading(false);
  };

  useEffect(() => {
    if (!modals.membership) {
      resetModal();
    }
  }, [modals.membership]);

  if (!modals.membership) return null;

  return (
    <div className="modal-overlay" onClick={() => closeModal('membership')}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Join Tuhme Premium</h2>
          <button className="modal-close" onClick={() => closeModal('membership')}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {/* Progress Indicator */}
          <div className="membership-progress">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <span>Your Info</span>
            </div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span>Choose Plan</span>
            </div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span>Payment</span>
            </div>
          </div>

          {error && (
            <div className="error-message membership-error">
              {error}
            </div>
          )}

          {/* Step 1: Customer Information */}
          {step === 1 && (
            <div className="membership-step">
              <div className="step-header">
                <h3>Tell us about yourself</h3>
                <p>We'll use this information to create your premium membership account.</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={customerData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                  <small>We'll use WhatsApp to communicate about your orders</small>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Plan Selection */}
          {step === 2 && (
            <div className="membership-step">
              <div className="step-header">
                <h3>Choose your plan</h3>
                <p>Select the membership plan that works best for you.</p>
              </div>

              <div className="plans-grid">
                {Object.entries(membershipPlans).map(([planKey, plan]) => (
                  <div
                    key={planKey}
                    className={`plan-card ${selectedPlan === planKey ? 'selected' : ''} ${planKey === 'annual' ? 'featured' : ''}`}
                    onClick={() => setSelectedPlan(planKey)}
                  >
                    {planKey === 'annual' && <div className="plan-badge">Best Value</div>}
                    
                    <div className="plan-header">
                      <h4>{plan.name}</h4>
                      {plan.savings && <span className="plan-savings">{plan.savings}</span>}
                    </div>

                    <div className="plan-price">
                      <span className="price">${plan.price}</span>
                      <span className="interval">/{plan.interval}</span>
                    </div>

                    <ul className="plan-features">
                      {plan.features.map((feature, index) => (
                        <li key={index}>
                          <span className="feature-check">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="plan-selector">
                      <div className={`radio-button ${selectedPlan === planKey ? 'selected' : ''}`}>
                        {selectedPlan === planKey && <div className="radio-dot"></div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="membership-step">
              <div className="step-header">
                <h3>Complete your membership</h3>
                <p>You'll be redirected to our secure payment processor to complete your subscription.</p>
              </div>

              <div className="payment-summary">
                <div className="summary-card">
                  <h4>Order Summary</h4>
                  
                  <div className="summary-item">
                    <span>Plan:</span>
                    <span>{membershipPlans[selectedPlan].name}</span>
                  </div>
                  
                  <div className="summary-item">
                    <span>Price:</span>
                    <span>${membershipPlans[selectedPlan].price}/{membershipPlans[selectedPlan].interval}</span>
                  </div>
                  
                  <div className="summary-item">
                    <span>Customer:</span>
                    <span>{customerData.name}</span>
                  </div>
                  
                  <div className="summary-item">
                    <span>Email:</span>
                    <span>{customerData.email}</span>
                  </div>
                  
                  <div className="summary-item">
                    <span>Phone:</span>
                    <span>{customerData.phone}</span>
                  </div>

                  <div className="summary-total">
                    <span>Total:</span>
                    <span>${membershipPlans[selectedPlan].price}</span>
                  </div>
                </div>

                <div className="payment-info">
                  <div className="info-item">
                    <div className="info-icon">🔒</div>
                    <div>
                      <h5>Secure Payment</h5>
                      <p>Your payment is processed securely by Stripe</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">📱</div>
                    <div>
                      <h5>Instant Activation</h5>
                      <p>Your membership activates immediately after payment</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">🔄</div>
                    <div>
                      <h5>Cancel Anytime</h5>
                      <p>No long-term commitments, cancel whenever you want</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="membership-actions">
            {step > 1 && (
              <button
                type="button"
                className="btn-secondary"
                onClick={handleBack}
                disabled={isLoading}
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                className="btn-primary"
                onClick={handleNext}
                disabled={isLoading}
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={handleSubscribe}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Processing...
                  </>
                ) : (
                  'Complete Membership'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipModal;