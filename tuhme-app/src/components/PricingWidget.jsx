import TuhmeIcon from './TuhmeIcon';
import useHourlyTheme from '../hooks/useHourlyTheme';

const PricingWidget = ({ variant = "default" }) => {
  const { currentPalette } = useHourlyTheme();

  const pricingTiers = [
    {
      id: 'essential',
      name: 'Essential',
      itemRange: '3–5 items',
      maxItems: 5,
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
      id: 'preferred',
      name: 'Preferred',
      itemRange: '5–10 items',
      maxItems: 10,
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
      id: 'elite',
      name: 'Elite',
      itemRange: '10–15 items',
      maxItems: 15,
      pricePerItem: '$5.99',
      totalRange: '$59.90 - $89.85',
      features: [
        'Perfect for wardrobe refresh',
        'Extended 20-minute try-on session',
        'Priority same-day delivery',
        'Personal shopper consultation',
        'Advanced styling experience',
        'Complete wardrobe planning',
        'Maximum savings per item',
        'VIP customer support'
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
    <section className="luxury-section" style={{
      backgroundImage: `
        linear-gradient(135deg, var(--theme-primary)f0 0%, var(--theme-secondary)f0 100%),
        url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')
      `,
      backgroundBlendMode: 'overlay, normal',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">
            Choose the package that fits your shopping needs. Our shopper waits 15 minutes while you try everything on.
          </p>
        </div>

        <div className="luxury-grid luxury-grid-3">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.id} 
              className={`luxury-pricing-card ${tier.popular ? 'featured' : ''}`}
            >
              {tier.popular && (
                <div className="popular-badge">
                  <span>Most Popular</span>
                </div>
              )}
              
              <div className="luxury-pricing-header">
                <div className="luxury-feature-icon" style={{ margin: '0 auto var(--space-3) auto' }}>
                  <TuhmeIcon type={tier.icon} size={24} />
                </div>
                <h3 className="luxury-pricing-title">{tier.name}</h3>
                <div style={{ 
                  fontSize: 'var(--text-sm)', 
                  color: 'var(--theme-accent)', 
                  fontWeight: '500',
                  marginBottom: 'var(--space-4)'
                }}>{tier.itemRange}</div>
              </div>

              <div className="luxury-pricing-section">
                <div className="luxury-pricing-price">{tier.pricePerItem}</div>
                <div className="luxury-pricing-period">per item</div>
                <div style={{ 
                  fontSize: 'var(--text-sm)', 
                  color: 'var(--button-secondary-text)', 
                  opacity: '0.7',
                  marginTop: 'var(--space-2)'
                }}>
                  Total: {tier.totalRange}
                </div>
              </div>

              <div style={{ margin: 'var(--space-6) 0' }}>
                {tier.features.map((feature, index) => (
                  <div key={index} className="luxury-feature" style={{ padding: 'var(--space-2) 0', justifyContent: 'flex-start' }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      background: 'var(--theme-accent)',
                      borderRadius: '50%',
                      color: 'var(--button-primary-text)',
                      fontSize: '12px',
                      flexShrink: 0,
                      marginRight: 'var(--space-3)'
                    }}>
                      ✓
                    </div>
                    <span style={{ 
                      fontSize: 'var(--text-sm)', 
                      color: 'var(--button-secondary-text)',
                      lineHeight: '1.5'
                    }}>{feature}</span>
                  </div>
                ))}
              </div>

              <a 
                href={generateWhatsAppLink(tier)}
                target="_blank"
                rel="noopener noreferrer"
                className={`luxury-button ${tier.popular ? 'luxury-button-primary' : 'luxury-button-secondary'}`}
                style={{ width: '100%', marginTop: 'auto' }}
              >
                <span>Order Now</span>
                <TuhmeIcon type="delivery" size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingWidget;