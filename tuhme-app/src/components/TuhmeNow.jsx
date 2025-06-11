import TuhmeIcon from './TuhmeIcon';

const TuhmeNow = () => {
  const processSteps = [
    { icon: 'payment', title: 'Pay $49.99 monthly subscription fee', desc: 'Simple monthly billing with no hidden costs' },
    { icon: 'unlimited', title: 'Place unlimited orders with 50% off per-item fees', desc: 'Shop as much as you want with significant savings' },
    { icon: 'professional', title: 'Enjoy priority service and extended try-on time', desc: 'Get VIP treatment and more time to decide' },
    { icon: 'secure', title: 'Pause or cancel anytime', desc: 'Full control over your subscription' }
  ];

  const idealFor = [
    { icon: 'shopping', title: 'Fashion Enthusiasts', desc: 'People who love trying new styles regularly' },
    { icon: 'professional', title: 'Busy Professionals', desc: 'Those who value time and convenience' },
    { icon: 'event', title: 'Social Butterflies', desc: 'Always need new outfits for events' },
    { icon: 'home', title: 'Comfort Shoppers', desc: 'Prefer trying clothes at home' }
  ];
  const generateWhatsAppLink = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in the Tuhme Now subscription service ($49.99/month). Can you tell me more about how to get started?"
    );
    return `https://wa.me/16465889916?text=${message}`;
  };

  return (
    <section className="tuhme-now">
      <div className="container">
        <div className="tuhme-now-content">
          <div className="subscription-header">
            <div className="subscription-badge">Subscription Service</div>
            <h2>Tuhme Now</h2>
            <div className="price-display">
              <span className="price">$49.99</span>
              <span className="period">/month</span>
            </div>
            <p className="subscription-tagline">
              Unlimited shopping freedom with exclusive benefits
            </p>
          </div>

          <div className="subscription-grid">
            <div className="benefits-section">
              <h3>Subscription Benefits</h3>
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon"><TuhmeIcon type="unlimited" size={32} /></div>
                  <div className="benefit-content">
                    <h4>Unlimited Orders</h4>
                    <p>Shop as many times as you want throughout the month with no order limits</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon"><TuhmeIcon type="payment" size={32} /></div>
                  <div className="benefit-content">
                    <h4>50% Off Per Item</h4>
                    <p>Pay only 50% of our regular per-item fees on every order you place</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon"><TuhmeIcon type="time" size={32} /></div>
                  <div className="benefit-content">
                    <h4>Extended Try-On Time</h4>
                    <p>Take 15-20 minutes instead of the standard 15 minutes to try everything on</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon"><TuhmeIcon type="fit" size={32} /></div>
                  <div className="benefit-content">
                    <h4>Priority Service</h4>
                    <p>Jump to the front of the queue with priority scheduling and faster response times</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon"><TuhmeIcon type="time" size={32} /></div>
                  <div className="benefit-content">
                    <h4>Flexible Management</h4>
                    <p>Pause or cancel your subscription anytime with no cancellation fees</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon"><TuhmeIcon type="professional" size={32} /></div>
                  <div className="benefit-content">
                    <h4>Dedicated Shopper</h4>
                    <p>Get assigned a personal shopper who learns your style preferences over time</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pricing-comparison">
              <h3>Compare Savings</h3>
              <div className="comparison-table">
                <div className="comparison-header">
                  <div className="plan-column">Plan</div>
                  <div className="regular-column">Regular Pricing</div>
                  <div className="now-column">Tuhme Now</div>
                </div>

                <div className="comparison-row">
                  <div className="plan-column">
                    <strong>Starter (3-5 items)</strong>
                  </div>
                  <div className="regular-column">
                    $9.99/item<br/>
                    <span className="total">$29.97-$49.95</span>
                  </div>
                  <div className="now-column highlight">
                    $4.99/item<br/>
                    <span className="total">$14.97-$24.95</span>
                  </div>
                </div>

                <div className="comparison-row">
                  <div className="plan-column">
                    <strong>Popular (5-10 items)</strong>
                  </div>
                  <div className="regular-column">
                    $7.99/item<br/>
                    <span className="total">$39.95-$79.90</span>
                  </div>
                  <div className="now-column highlight">
                    $3.99/item<br/>
                    <span className="total">$19.95-$39.95</span>
                  </div>
                </div>

                <div className="comparison-row">
                  <div className="plan-column">
                    <strong>Premium (10-15 items)</strong>
                  </div>
                  <div className="regular-column">
                    $5.99/item<br/>
                    <span className="total">$59.90-$89.85</span>
                  </div>
                  <div className="now-column highlight">
                    $2.99/item<br/>
                    <span className="total">$29.95-$44.85</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="subscription-details">
            <div className="detail-cards">
              <div className="detail-card">
                <h4>How It Works</h4>
                <div className="process-steps">
                  {processSteps.map((step, index) => (
                    <div key={index} className="process-step">
                      <div className="step-icon">
                        <TuhmeIcon type={step.icon} size={20} />
                      </div>
                      <div className="step-content">
                        <h5>{step.title}</h5>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-card">
                <h4>Perfect For</h4>
                <div className="ideal-for-grid">
                  {idealFor.map((item, index) => (
                    <div key={index} className="ideal-item">
                      <div className="ideal-icon">
                        <TuhmeIcon type={item.icon} size={20} />
                      </div>
                      <div className="ideal-content">
                        <h5>{item.title}</h5>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-card">
                <h4>Subscription Terms</h4>
                <div className="terms-grid">
                  <div className="term-item">
                    <TuhmeIcon type="time" size={16} />
                    <span>Monthly billing cycle</span>
                  </div>
                  <div className="term-item">
                    <TuhmeIcon type="secure" size={16} />
                    <span>Cancel anytime before next billing date</span>
                  </div>
                  <div className="term-item">
                    <TuhmeIcon type="time" size={16} />
                    <span>Pause subscription for up to 3 months</span>
                  </div>
                  <div className="term-item">
                    <TuhmeIcon type="professional" size={16} />
                    <span>All regular terms and conditions apply</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="subscription-cta">
            <div className="cta-content">
              <h3>Ready to Save on Every Order?</h3>
              <p>Join Tuhme Now and start enjoying unlimited shopping with exclusive benefits</p>
              <div className="cta-buttons">
                <a 
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="subscribe-button"
                >
                  Subscribe to Tuhme Now
                </a>
                <button 
                  className="learn-more-button"
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TuhmeNow;