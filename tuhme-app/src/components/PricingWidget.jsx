import TuhmeIcon from './TuhmeIcon';

const PricingWidget = ({ variant = "default" }) => {

  const pricingTiers = [
    {
      id: 'starter',
      name: 'Starter',
      itemRange: '3–5 items',
      pricePerItem: '$9.99',
      totalRange: '$29.97 - $49.95',
      features: [
        'Perfect for single purchases',
        '10-minute try-on session',
        'Same-day delivery available',
        'Pay only for what you keep',
        'Professional shopping service',
        'Secure Square payment'
      ],
      popular: false,
      icon: 'shopping'
    },
    {
      id: 'popular',
      name: 'Popular',
      itemRange: '5–10 items',
      pricePerItem: '$7.99',
      totalRange: '$39.95 - $79.90',
      features: [
        'Great for outfit planning',
        '15-minute try-on session',
        'Same-day delivery available',
        'Pay only for what you keep',
        'Professional shopping service',
        'Secure Square payment',
        'Mix & match opportunities'
      ],
      popular: true,
      icon: 'professional'
    },
    {
      id: 'premium',
      name: 'Premium',
      itemRange: '10–15 items',
      pricePerItem: '$5.99',
      totalRange: '$59.90 - $89.85',
      features: [
        'Perfect for wardrobe refresh',
        '15-minute try-on session',
        'Same-day delivery available',
        'Pay only for what you keep',
        'Professional shopping service',
        'Secure Square payment',
        'Complete styling session',
        'Maximum savings per item'
      ],
      popular: false,
      icon: 'secure'
    }
  ];

  const generateWhatsAppLink = (tier) => {
    const message = encodeURIComponent(
      `Hi! I'd like to start a ${tier.name} order (${tier.itemRange}). I have screenshots of items I want to try on.`
    );
    return `https://wa.me/16465889916?text=${message}`;
  };

  return (
    <div className={`pricing-widget ${variant}`}>
      <div className="pricing-container">
        <div className="pricing-header">
          <h2 className="pricing-title">Simple, Transparent Pricing</h2>
          <p className="pricing-subtitle">
            Choose the package that fits your shopping needs. Our shopper waits 15 minutes while you try everything on.
          </p>
        </div>

        <div className="pricing-cards">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.id} 
              className={`pricing-card ${tier.popular ? 'featured' : ''}`}
            >
              {tier.popular && (
                <div className="popular-badge">
                  <span>Most Popular</span>
                </div>
              )}
              
              <div className="card-header">
                <div className="tier-icon">
                  <TuhmeIcon type={tier.icon} size={28} />
                </div>
                <h3 className="tier-name">{tier.name}</h3>
                <div className="item-range">{tier.itemRange}</div>
              </div>

              <div className="pricing-section">
                <div className="price-display">
                  <span className="price">{tier.pricePerItem}</span>
                  <span className="price-unit">per item</span>
                </div>
                <div className="total-range">
                  Total: {tier.totalRange}
                </div>
              </div>

              <div className="features-section">
                {tier.features.map((feature, index) => (
                  <div key={index} className="feature-row">
                    <div className="feature-check">
                      <TuhmeIcon type="secure" size={12} />
                    </div>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>

              <a 
                href={generateWhatsAppLink(tier)}
                target="_blank"
                rel="noopener noreferrer"
                className={`pricing-cta-button ${tier.popular ? 'featured' : ''}`}
              >
                <span className="cta-text">Order Now</span>
                <TuhmeIcon type="delivery" size={16} />
                <div className="button-shine"></div>
              </a>

              <div className="card-glow"></div>
            </div>
          ))}
        </div>

        <div className="pricing-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>
      </div>
    </div>
  );
};

export default PricingWidget;