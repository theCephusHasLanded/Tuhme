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
        'Secure payment via Square'
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
        'Secure payment via Square',
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
        'Secure payment via Square',
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
    <div className={`pricing-widget ${variant}`} id="pricing">
      <div className="pricing-container">
        <div className="pricing-header">
          <span className="pricing-badge">TRANSPARENT PRICING</span>
          <h2 className="pricing-title">Choose Your Shopping Experience</h2>
          <p className="pricing-subtitle">
            Simple per-item pricing with no hidden fees. Our shopper waits while you try everything on in comfort.
          </p>
        </div>

        <div className="pricing-train">
          {pricingTiers.map((tier, index) => (
            <div 
              key={tier.id} 
              className={`pricing-car ${tier.popular ? 'featured' : ''}`}
            >
              {tier.popular && (
                <div className="featured-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                  </svg>
                </div>
              )}

              <div className="car-content">
                <div className="car-visual">
                  <div className="tier-icon">
                    <TuhmeIcon type={tier.icon} size={40} />
                  </div>
                  <h3 className="tier-name">{tier.name}</h3>
                  <div className="item-range">{tier.itemRange}</div>
                </div>

                <div className="pricing-display">
                  <div className="price-section">
                    <span className="price">{tier.pricePerItem}</span>
                    <span className="price-unit">per item</span>
                  </div>
                  <div className="total-range">
                    Total: {tier.totalRange}
                  </div>
                </div>

                <div className="features-list">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="feature-item">
                      <div className="feature-check">✓</div>
                      <span className="feature-text">{feature}</span>
                    </div>
                  ))}
                </div>

                <a 
                  href={generateWhatsAppLink(tier)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tier-action-button"
                >
                  <span className="button-text">Order Now</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17l10-10M17 7H7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>

              <div className="car-glow"></div>
            </div>
          ))}
        </div>

        {/* Premium Memberships Section */}
        <div className="premium-memberships-section">
          <div className="premium-header">
            <div className="premium-badge">
              <TuhmeIcon type="secure" size={16} />
              <span>PREMIUM MEMBERSHIPS</span>
            </div>
            <h3 className="premium-title">Unlock Exclusive Savings & Benefits</h3>
            <p className="premium-subtitle">
              Join our premium membership for reduced per-item fees, priority scheduling, and exclusive access to luxury drops.
            </p>
          </div>

          <div className="premium-tiers">
            <div className="premium-tier">
              <div className="tier-header">
                <h4 className="tier-title">VIP Monthly</h4>
                <div className="tier-price">
                  <span className="price">$29</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <div className="tier-benefits">
                <div className="benefit-item">
                  <TuhmeIcon type="check" size={16} />
                  <span>30% off all service fees</span>
                </div>
                <div className="benefit-item">
                  <TuhmeIcon type="check" size={16} />
                  <span>Priority shopper assignment</span>
                </div>
                <div className="benefit-item">
                  <TuhmeIcon type="check" size={16} />
                  <span>Extended 20-minute try-on sessions</span>
                </div>
                <div className="benefit-item">
                  <TuhmeIcon type="check" size={16} />
                  <span>Free same-day delivery (normally $15)</span>
                </div>
              </div>
              <button className="premium-cta-btn monthly-btn" disabled>
                <TuhmeIcon type="secure" size={16} />
                <span>Coming Soon - Stripe Integration</span>
              </button>
            </div>

            <div className="premium-tier featured-tier">
              <div className="tier-badge">MOST POPULAR</div>
              <div className="tier-header">
                <h4 className="tier-title">VIP Annual</h4>
                <div className="tier-price">
                  <span className="price">$299</span>
                  <span className="period">/year</span>
                  <span className="savings">Save $49</span>
                </div>
              </div>
              <div className="tier-benefits">
                <div className="benefit-item">
                  <TuhmeIcon type="check" size={16} />
                  <span>All Monthly VIP benefits</span>
                </div>
                <div className="benefit-item">
                  <TuhmeIcon type="check" size={16} />
                  <span>50% off all service fees</span>
                </div>
                <div className="benefit-item">
                  <TuhmeIcon type="check" size={16} />
                  <span>Exclusive access to luxury drops</span>
                </div>
                <div className="benefit-item">
                  <TuhmeIcon type="check" size={16} />
                  <span>Personal stylist consultations</span>
                </div>
                <div className="benefit-item">
                  <TuhmeIcon type="check" size={16} />
                  <span>Concierge white-glove service</span>
                </div>
              </div>
              <button className="premium-cta-btn annual-btn" disabled>
                <TuhmeIcon type="secure" size={16} />
                <span>Coming Soon - Stripe Integration</span>
              </button>
            </div>
          </div>

          <div className="premium-footer">
            <div className="security-note">
              <TuhmeIcon type="secure" size={20} />
              <div className="security-text">
                <strong>Secure payments powered by Stripe</strong>
                <p>Your payment information is encrypted and never stored on our servers</p>
              </div>
            </div>
            <div className="api-status">
              <div className="status-indicator"></div>
              <span>API Integration: Coming Soon</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .pricing-widget {
          padding: var(--space-3xl) 0;
          background: var(--primary-bg);
          position: relative;
          overflow: hidden;
        }

        .pricing-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-lg);
          position: relative;
          z-index: 2;
        }

        /* Header Section - Train Style */
        .pricing-header {
          text-align: center;
          margin-bottom: var(--space-3xl);
          padding: var(--space-2xl) 0;
        }

        .pricing-badge {
          display: inline-block;
          padding: var(--space-xs) var(--space-md);
          background: var(--accent-primary);
          color: var(--primary-bg);
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 20px;
          margin-bottom: var(--space-sm);
        }

        .pricing-title {
          font-family: var(--font-family-primary);
          font-size: var(--text-4xl);
          font-weight: 700;
          color: var(--primary-text);
          margin: 0 0 var(--space-xl) 0;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .pricing-subtitle {
          font-family: var(--font-family-secondary);
          font-size: var(--text-lg);
          color: var(--tertiary-text);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Horizontal Train Layout */
        .pricing-train {
          display: flex;
          flex-direction: row;
          gap: var(--space-lg);
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          padding: var(--space-xl) 0;
          justify-content: center;
          align-items: stretch;
        }

        /* Train Car Style Pricing Cards */
        .pricing-car {
          background: var(--tertiary-bg);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: var(--space-2xl);
          transition: all var(--transition-normal);
          position: relative;
          overflow: hidden;
          backdrop-filter: var(--blur-subtle);
          box-shadow: var(--shadow-medium);
          opacity: 1;
          transform: translateY(0);
          animation: slideInDown 0.6s ease-out forwards;
          flex: 1;
          min-height: 600px;
          display: flex;
          flex-direction: column;
        }

        .pricing-car:nth-child(1) { animation-delay: 0.1s; }
        .pricing-car:nth-child(2) { animation-delay: 0.3s; }
        .pricing-car:nth-child(3) { animation-delay: 0.5s; }

        @keyframes slideInDown {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pricing-car:hover {
          border-color: var(--border-medium);
          transform: translateY(-8px) scale(1.02);
          box-shadow: 
            var(--shadow-strong),
            0 0 40px rgba(212, 175, 55, 0.15);
          animation: none; /* Remove conflicting animation on hover */
        }

        .pricing-car:not(:hover) {
          animation: cardFloatIdle 4s ease-in-out infinite;
        }

        @keyframes cardFloatIdle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.01); }
        }

        .pricing-car.featured {
          border-color: var(--accent-primary)50;
          background: linear-gradient(135deg, var(--tertiary-bg), var(--accent-primary)08);
          transform: scale(1.02);
        }

        .pricing-car.featured:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .featured-badge {
          position: absolute;
          top: -16px;
          right: var(--space-lg);
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: var(--primary-bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 
            0 8px 16px rgba(212, 175, 55, 0.3),
            0 0 20px rgba(212, 175, 55, 0.2);
          z-index: 20;
          cursor: pointer;
          transition: all var(--transition-normal);
          animation: starPulse 2s ease-in-out infinite;
          border: 2px solid var(--primary-bg);
        }

        .featured-badge:hover {
          transform: scale(1.1) rotate(15deg);
          box-shadow: 
            0 12px 24px rgba(212, 175, 55, 0.4),
            0 0 30px rgba(212, 175, 55, 0.3);
          animation: starSpin 0.6s ease-in-out;
        }

        @keyframes starPulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 
              0 8px 16px rgba(212, 175, 55, 0.3),
              0 0 20px rgba(212, 175, 55, 0.2);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 
              0 10px 20px rgba(212, 175, 55, 0.4),
              0 0 25px rgba(212, 175, 55, 0.3);
          }
        }

        @keyframes starSpin {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(180deg); }
          100% { transform: scale(1.1) rotate(360deg); }
        }

        .car-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          position: relative;
          z-index: 2;
        }

        /* Visual Section */
        .car-visual {
          text-align: center;
          padding: var(--space-lg) 0;
          border-bottom: 1px solid var(--border-light);
        }

        .tier-icon {
          width: 80px;
          height: 80px;
          background: var(--accent-primary)15;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--space-md);
          color: var(--accent-primary);
          transition: all var(--transition-normal);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .tier-icon::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: var(--accent-primary)30;
          border-radius: 50%;
          transition: all 0.4s ease;
          transform: translate(-50%, -50%);
        }

        .pricing-car:hover .tier-icon {
          transform: scale(1.15) rotate(5deg);
          background: var(--accent-primary)25;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
          animation: iconBounce 0.6s ease-in-out;
        }

        .pricing-car:hover .tier-icon::before {
          width: 100%;
          height: 100%;
        }

        @keyframes iconBounce {
          0%, 100% { transform: scale(1.15) rotate(5deg); }
          50% { transform: scale(1.25) rotate(-2deg); }
        }

        .tier-name {
          font-family: var(--font-family-primary);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--primary-text);
          margin: 0 0 var(--space-sm) 0;
          line-height: 1.2;
        }

        .item-range {
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          color: var(--accent-primary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Pricing Display */
        .pricing-display {
          text-align: center;
          padding: var(--space-lg) 0;
          border-bottom: 1px solid var(--border-light);
        }

        .price-section {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-sm);
        }

        .price {
          font-family: var(--font-family-primary);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--accent-primary);
          line-height: 1;
          transition: all var(--transition-normal);
          position: relative;
          display: inline-block;
        }

        .pricing-car:hover .price {
          transform: scale(1.1);
          text-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
          animation: priceGlow 1.5s ease-in-out infinite alternate;
        }

        @keyframes priceGlow {
          0% { 
            text-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
            transform: scale(1.1);
          }
          100% { 
            text-shadow: 0 0 25px rgba(212, 175, 55, 0.6);
            transform: scale(1.12);
          }
        }

        .price-unit {
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          color: var(--secondary-text);
          font-weight: 500;
        }

        .total-range {
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          color: var(--tertiary-text);
          font-style: italic;
        }

        /* Features List */
        .features-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          padding: var(--space-md) 0;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: var(--space-sm);
          opacity: 0;
          transform: translateX(-20px);
          animation: featureSlideIn 0.4s ease-out forwards;
          transition: all var(--transition-fast);
        }

        .feature-item:nth-child(1) { animation-delay: 0.1s; }
        .feature-item:nth-child(2) { animation-delay: 0.2s; }
        .feature-item:nth-child(3) { animation-delay: 0.3s; }
        .feature-item:nth-child(4) { animation-delay: 0.4s; }
        .feature-item:nth-child(5) { animation-delay: 0.5s; }
        .feature-item:nth-child(6) { animation-delay: 0.6s; }
        .feature-item:nth-child(7) { animation-delay: 0.7s; }
        .feature-item:nth-child(8) { animation-delay: 0.8s; }

        .pricing-car:hover .feature-item {
          transform: translateX(5px);
        }

        @keyframes featureSlideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .feature-check {
          width: 20px;
          height: 20px;
          background: var(--accent-primary)20;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          color: var(--accent-primary);
          flex-shrink: 0;
          margin-top: 2px;
          transition: all var(--transition-normal);
          position: relative;
        }

        .pricing-car:hover .feature-check {
          background: var(--accent-primary)40;
          transform: scale(1.1);
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        }

        .feature-item:hover .feature-check {
          animation: checkBounce 0.6s ease;
        }

        @keyframes checkBounce {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(1.3) rotate(10deg); }
        }

        .feature-text {
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          color: var(--secondary-text);
          line-height: 1.5;
        }

        /* Action Button */
        .tier-action-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-md) var(--space-lg);
          background: var(--btn-primary-bg);
          color: var(--btn-primary-text);
          text-decoration: none;
          border-radius: 12px;
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          font-weight: 600;
          transition: all var(--transition-normal);
          margin-top: auto;
          box-shadow: var(--shadow-medium);
          position: relative;
          overflow: hidden;
        }

        .tier-action-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.6s ease;
        }

        .tier-action-button:hover {
          background: var(--btn-primary-hover-bg);
          color: var(--btn-primary-hover-text);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 
            var(--shadow-strong),
            0 0 20px rgba(212, 175, 55, 0.3);
          animation: buttonPulse 0.3s ease;
        }

        .tier-action-button:hover::before {
          left: 100%;
        }

        @keyframes buttonPulse {
          0% { transform: translateY(-3px) scale(1.05); }
          50% { transform: translateY(-5px) scale(1.08); }
          100% { transform: translateY(-3px) scale(1.05); }
        }

        .button-text {
          font-weight: 700;
          color: inherit;
        }

        /* Car Glow Effect */
        .car-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, var(--accent-primary)08 0%, transparent 70%);
          opacity: 0;
          transition: opacity var(--transition-normal);
          border-radius: 20px;
          pointer-events: none;
        }

        .pricing-car:hover .car-glow {
          opacity: 1;
        }

        .pricing-car.featured .car-glow {
          opacity: 0.5;
        }

        /* Bottom Note */
        .pricing-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-md);
          margin-top: var(--space-3xl);
          padding: var(--space-xl);
          background: var(--secondary-bg);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          text-align: center;
        }

        .note-icon {
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        .pricing-note p {
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          color: var(--secondary-text);
          margin: 0;
          line-height: 1.5;
        }

        /* Tablet Layout */
        @media (max-width: 1024px) and (min-width: 769px) {
          .pricing-train {
            gap: var(--space-md);
            max-width: 900px;
          }

          .pricing-car {
            padding: var(--space-xl);
            min-height: 550px;
          }

          .tier-name {
            font-size: var(--text-xl);
          }

          .price {
            font-size: var(--text-2xl);
          }
        }

        /* Enhanced Mobile Responsive - Keep side by side */
        @media (max-width: 768px) {
          .pricing-widget {
            padding: var(--space-2xl) 0;
          }

          .pricing-container {
            padding: 0 var(--space-sm);
          }

          .pricing-title {
            font-size: var(--text-2xl);
          }

          .pricing-subtitle {
            font-size: var(--text-sm);
          }

          .pricing-train {
            flex-direction: row; /* Keep side by side */
            gap: var(--space-sm);
            max-width: 100%;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding: var(--space-md) var(--space-xs);
          }

          .pricing-car {
            padding: var(--space-lg);
            min-height: 500px;
            min-width: 280px;
            flex: 0 0 280px; /* Fixed width for side by side */
            scroll-snap-align: center;
          }

          .pricing-car.featured {
            transform: none;
          }

          .pricing-car.featured:hover {
            transform: translateY(-4px);
          }

          .tier-icon {
            width: 50px;
            height: 50px;
          }

          .tier-name {
            font-size: var(--text-lg);
          }

          .price {
            font-size: var(--text-xl);
          }

          .pricing-note {
            flex-direction: column;
            text-align: center;
            gap: var(--space-sm);
          }
        }

        @media (max-width: 480px) {
          .pricing-container {
            padding: 0 var(--space-sm);
          }

          .pricing-car {
            padding: var(--space-lg);
          }

          .car-visual {
            padding: var(--space-md) 0;
          }

          .pricing-display {
            padding: var(--space-md) 0;
          }

          .tier-action-button {
            padding: var(--space-sm) var(--space-md);
            font-size: var(--text-xs);
          }
        }

        /* Premium Memberships Section */
        .premium-memberships-section {
          margin-top: var(--space-3xl);
          padding: var(--space-3xl) var(--space-xl);
          background: linear-gradient(135deg, rgba(var(--global-accent-rgb), 0.02) 0%, transparent 100%);
          border: 1px solid rgba(var(--global-accent-rgb), 0.1);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
        }

        .premium-memberships-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 25% 25%, rgba(var(--global-accent-rgb), 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .premium-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
          position: relative;
          z-index: 2;
        }

        .premium-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-xs) var(--space-md);
          background: rgba(var(--global-accent-rgb), 0.1);
          color: rgba(var(--global-accent-rgb), 1);
          border: 1px solid rgba(var(--global-accent-rgb), 0.2);
          border-radius: 20px;
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: var(--space-md);
        }

        .premium-title {
          font-family: var(--font-family-primary);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--primary-text);
          margin: 0 0 var(--space-sm) 0;
        }

        .premium-subtitle {
          font-family: var(--font-family-secondary);
          font-size: var(--text-base);
          color: var(--secondary-text);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .premium-tiers {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-xl);
          margin-bottom: var(--space-2xl);
          position: relative;
          z-index: 2;
        }

        .premium-tier {
          background: var(--tertiary-bg);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          padding: var(--space-xl);
          position: relative;
          transition: all var(--transition-normal);
        }

        .premium-tier:hover {
          transform: translateY(-4px);
          box-shadow: 
            var(--shadow-strong),
            0 0 30px rgba(var(--global-accent-rgb), 0.15);
          border-color: rgba(var(--global-accent-rgb), 0.3);
        }

        .featured-tier {
          border-color: rgba(var(--global-accent-rgb), 0.4);
          background: linear-gradient(135deg, var(--tertiary-bg) 0%, rgba(var(--global-accent-rgb), 0.03) 100%);
          transform: scale(1.02);
        }

        .tier-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, rgba(var(--global-accent-rgb), 1) 0%, rgba(var(--global-accent-rgb), 0.8) 100%);
          color: var(--primary-bg);
          padding: var(--space-xs) var(--space-md);
          border-radius: 12px;
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .tier-header {
          text-align: center;
          margin-bottom: var(--space-lg);
          padding-bottom: var(--space-lg);
          border-bottom: 1px solid var(--border-light);
        }

        .tier-title {
          font-family: var(--font-family-primary);
          font-size: var(--text-xl);
          font-weight: 600;
          color: var(--primary-text);
          margin: 0 0 var(--space-md) 0;
        }

        .tier-price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: var(--space-xs);
          margin-bottom: var(--space-sm);
        }

        .tier-price .price {
          font-family: var(--font-family-primary);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: rgba(var(--global-accent-rgb), 1);
        }

        .tier-price .period {
          font-size: var(--text-sm);
          color: var(--secondary-text);
        }

        .savings {
          background: rgba(var(--global-accent-rgb), 0.1);
          color: rgba(var(--global-accent-rgb), 1);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: var(--text-xs);
          font-weight: 600;
        }

        .tier-benefits {
          margin-bottom: var(--space-xl);
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-sm);
          font-size: var(--text-sm);
          color: var(--secondary-text);
        }

        .benefit-item svg {
          color: rgba(var(--global-accent-rgb), 1);
          flex-shrink: 0;
        }

        .premium-cta-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          padding: var(--space-md) var(--space-lg);
          background: rgba(var(--global-accent-rgb), 0.1);
          color: var(--secondary-text);
          border: 1px solid rgba(var(--global-accent-rgb), 0.2);
          border-radius: 12px;
          font-size: var(--text-sm);
          font-weight: 600;
          cursor: not-allowed;
          transition: all var(--transition-normal);
          position: relative;
          overflow: hidden;
        }

        .premium-cta-btn:disabled {
          opacity: 0.7;
        }

        .premium-cta-btn:not(:disabled) {
          background: rgba(var(--global-accent-rgb), 1);
          color: var(--primary-bg);
          cursor: pointer;
        }

        .premium-cta-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(var(--global-accent-rgb), 0.4);
        }

        .premium-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-xl);
          border-top: 1px solid var(--border-light);
          position: relative;
          z-index: 2;
        }

        .security-note {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .security-text strong {
          color: var(--primary-text);
          font-size: var(--text-sm);
          font-weight: 600;
        }

        .security-text p {
          color: var(--tertiary-text);
          font-size: var(--text-xs);
          margin: 0;
        }

        .api-status {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          font-size: var(--text-xs);
          color: var(--tertiary-text);
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          background: #f59e0b;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Mobile Responsiveness for Premium Section */
        @media (max-width: 768px) {
          .premium-memberships-section {
            padding: var(--space-xl) var(--space-md);
            margin-top: var(--space-2xl);
          }

          .premium-tiers {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }

          .featured-tier {
            transform: none;
          }

          .premium-footer {
            flex-direction: column;
            gap: var(--space-md);
            text-align: center;
          }

          .security-note {
            flex-direction: column;
            text-align: center;
            gap: var(--space-sm);
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .pricing-car,
          .tier-icon,
          .tier-action-button,
          .car-glow,
          .premium-tier,
          .status-indicator {
            transition: none;
            animation: none;
          }

          .pricing-car:hover,
          .pricing-car.featured,
          .premium-tier:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default PricingWidget;