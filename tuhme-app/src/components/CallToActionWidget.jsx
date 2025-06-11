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
    </div>
  );
};

export default CallToActionWidget;