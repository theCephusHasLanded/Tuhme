import { useState } from 'react';
import TuhmeIcon from './TuhmeIcon';

const CallToActionWidget = ({ 
  title = "Ready to Skip the Shopping Hassle?",
  subtitle = "Start your first order now or see our pricing options",
  showPricing = true,
  variant = "default" // default, express, compact
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const generateWhatsAppLink = () => {
    const message = encodeURIComponent(
      "Hi! I'd like to start a Tuhme order. I have screenshots of items I want to try on."
    );
    return `https://wa.me/16465889916?text=${message}`;
  };

  const handlePricingClick = () => {
    const element = document.getElementById('pricing');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`cta-widget ${variant}`}>
      <div className="cta-container">
        <div className="cta-content">
          <div className="cta-header">
            <h3 className="cta-title">{title}</h3>
            <p className="cta-subtitle">{subtitle}</p>
          </div>

          <div className="cta-actions">
            <a 
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary-button"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="button-content">
                <TuhmeIcon type="delivery" size={20} />
                <span className="button-text">Send Screenshots via WhatsApp</span>
              </div>
              <div className="button-shine"></div>
            </a>

            {showPricing && (
              <button 
                className="cta-secondary-button"
                onClick={handlePricingClick}
              >
                <span className="button-text">View Pricing</span>
                <TuhmeIcon type="shopping" size={16} />
              </button>
            )}
          </div>

          <div className="cta-features">
            <div className="feature-item">
              <div className="feature-icon">
                <TuhmeIcon type="time" size={16} />
              </div>
              <span>Same-day delivery</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <TuhmeIcon type="secure" size={16} />
              </div>
              <span>Try before you buy</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <TuhmeIcon type="professional" size={16} />
              </div>
              <span>No risk returns</span>
            </div>
          </div>
        </div>

        <div className="cta-background-effect">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>
      </div>

      <style jsx="true">{`
        .cta-widget {
          margin: var(--space-3xl) 0;
          padding: var(--space-2xl) 0;
        }

        .cta-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-lg);
        }

        .cta-content {
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .cta-header {
          margin-bottom: var(--space-2xl);
        }

        .cta-title {
          font-family: var(--font-family-primary);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--primary-text);
          margin: 0 0 var(--space-md) 0;
          line-height: 1.2;
        }

        .cta-subtitle {
          font-family: var(--font-family-secondary);
          font-size: var(--text-lg);
          color: var(--secondary-text);
          margin: 0;
          line-height: 1.5;
        }

        .cta-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: var(--space-lg);
          margin-bottom: var(--space-2xl);
        }

        /* Enhanced WhatsApp Button with Black Text and Glow */
        .cta-primary-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-lg) var(--space-2xl);
          background: var(--accent-primary);
          color: #ffffff; /* White text for dark buttons */
          text-decoration: none;
          border-radius: 12px;
          font-family: var(--font-family-secondary);
          font-size: var(--text-base);
          font-weight: 700;
          transition: all var(--transition-normal);
          overflow: hidden;
          border: 2px solid var(--accent-primary);
          box-shadow: 
            0 4px 15px rgba(212, 175, 55, 0.3),
            0 0 20px rgba(212, 175, 55, 0.2);
        }

        .cta-primary-button:hover {
          transform: translateY(-2px);
          background: var(--accent-secondary);
          border-color: var(--accent-secondary);
          box-shadow: 
            0 8px 25px rgba(212, 175, 55, 0.4),
            0 0 30px rgba(212, 175, 55, 0.3);
        }

        .button-content {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          position: relative;
          z-index: 2;
        }

        .button-text {
          color: #ffffff !important; /* White text for dark buttons */
          font-weight: 700;
          text-shadow: 
            0 0 10px rgba(255, 255, 255, 0.3),
            0 0 20px rgba(255, 255, 255, 0.2),
            0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .cta-primary-button:hover .button-text {
          text-shadow: 
            0 0 15px rgba(255, 255, 255, 0.4),
            0 0 25px rgba(255, 255, 255, 0.3),
            0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .button-shine {
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

        .cta-primary-button:hover .button-shine {
          left: 100%;
        }

        .cta-secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          padding: var(--space-md) var(--space-xl);
          background: rgba(255, 255, 255, 0.9);
          color: #000000 !important;
          border: 2px solid var(--border-medium);
          border-radius: 8px;
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .cta-secondary-button:hover {
          border-color: var(--accent-primary);
          color: #000000 !important;
          background: rgba(255, 255, 255, 1);
          transform: translateY(-1px);
        }

        .cta-features {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-xl);
          margin-top: var(--space-xl);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          color: var(--secondary-text);
        }

        .feature-icon {
          color: var(--accent-primary);
        }

        .cta-background-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .gradient-orb {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.1;
        }

        .orb-1 {
          top: 20%;
          left: 10%;
          background: var(--accent-primary);
        }

        .orb-2 {
          bottom: 20%;
          right: 10%;
          background: var(--accent-secondary);
        }

        /* Enhanced Responsive Design - Mobile First Approach */
        @media (max-width: 480px) {
          .cta-widget {
            padding: 1rem 0;
            margin: 2rem 0;
          }

          .cta-container {
            padding: 0 1rem;
          }

          .cta-title {
            font-size: clamp(1.25rem, 4vw, 1.5rem);
            line-height: 1.3;
            margin-bottom: 0.75rem;
          }

          .cta-subtitle {
            font-size: clamp(0.875rem, 3vw, 1rem);
            line-height: 1.4;
            margin-bottom: 1.5rem;
          }

          .cta-actions {
            flex-direction: column;
            gap: 0.75rem;
            width: 100%;
          }

          .cta-primary-button {
            width: 100%;
            padding: 0.875rem 1rem;
            font-size: 0.875rem;
            min-height: 48px;
            border-radius: 8px;
          }

          .cta-secondary-button {
            width: 100%;
            padding: 0.75rem 1rem;
            font-size: 0.8125rem;
            min-height: 44px;
          }

          .button-content {
            gap: 0.5rem;
            justify-content: center;
          }

          .cta-features {
            flex-direction: column;
            gap: 0.75rem;
            margin-top: 1.5rem;
          }

          .feature-item {
            justify-content: center;
            font-size: 0.8125rem;
          }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          .cta-widget {
            padding: 1.5rem 0;
            margin: 2.5rem 0;
          }

          .cta-container {
            padding: 0 1.5rem;
          }

          .cta-title {
            font-size: clamp(1.5rem, 3.5vw, 2rem);
            line-height: 1.25;
          }

          .cta-subtitle {
            font-size: clamp(1rem, 2.5vw, 1.125rem);
          }

          .cta-actions {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
          }

          .cta-primary-button {
            flex: 1;
            min-width: 250px;
            max-width: 320px;
            padding: 1rem 1.5rem;
            font-size: 0.9375rem;
          }

          .cta-secondary-button {
            flex: 0 0 auto;
            padding: 0.875rem 1.25rem;
            font-size: 0.875rem;
          }

          .cta-features {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .cta-widget {
            padding: 2rem 0;
            margin: 3rem 0;
          }

          .cta-container {
            padding: 0 2rem;
          }

          .cta-title {
            font-size: clamp(2rem, 2.5vw, 2.25rem);
          }

          .cta-subtitle {
            font-size: clamp(1.125rem, 1.5vw, 1.25rem);
          }

          .cta-actions {
            gap: 1.25rem;
          }

          .cta-primary-button {
            padding: 1.125rem 2rem;
            font-size: 1rem;
          }
        }

        /* High-resolution displays */
        @media (min-width: 1025px) {
          .cta-widget {
            padding: 2.5rem 0;
            margin: 4rem 0;
          }

          .cta-container {
            max-width: 1200px;
            padding: 0 2rem;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .cta-primary-button,
          .cta-secondary-button {
            min-height: 48px;
            font-size: 1rem;
          }

          .cta-primary-button:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
          }

          .cta-secondary-button:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
          }
        }

        /* Landscape orientation fixes for mobile */
        @media (max-width: 768px) and (orientation: landscape) {
          .cta-widget {
            padding: 1rem 0;
          }

          .cta-actions {
            flex-direction: row;
            gap: 1rem;
          }

          .cta-primary-button,
          .cta-secondary-button {
            flex: 1;
          }

          .cta-features {
            flex-direction: row;
            justify-content: center;
            gap: 1rem;
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .cta-primary-button,
          .cta-secondary-button {
            transition: none;
          }

          .button-shine {
            display: none;
          }

          .gradient-orb {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default CallToActionWidget;