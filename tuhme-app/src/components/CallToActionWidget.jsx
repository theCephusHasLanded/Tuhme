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
          background: transparent;
          color: var(--primary-text);
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
          color: var(--accent-primary);
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

        /* Responsive Design */
        @media (max-width: 768px) {
          .cta-widget {
            padding: var(--space-xl) 0;
          }

          .cta-container {
            padding: 0 var(--space-md);
          }

          .cta-title {
            font-size: var(--text-2xl);
          }

          .cta-subtitle {
            font-size: var(--text-base);
          }

          .cta-actions {
            flex-direction: column;
            gap: var(--space-md);
          }

          .cta-primary-button {
            padding: var(--space-md) var(--space-xl);
            font-size: var(--text-sm);
          }

          .cta-features {
            flex-direction: column;
            gap: var(--space-md);
          }
        }

        @media (max-width: 480px) {
          .cta-primary-button {
            padding: var(--space-sm) var(--space-lg);
            font-size: var(--text-xs);
            width: 100%;
            max-width: 300px;
          }

          .button-content {
            gap: var(--space-xs);
          }
        }
      `}</style>
    </div>
  );
};

export default CallToActionWidget;