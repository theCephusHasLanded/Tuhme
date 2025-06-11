import { useState } from 'react';
import TuhmeIcon from './TuhmeIcon';
import GetInTouchModal from './GetInTouchModal';

const ContactWidget = ({ variant = "default" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={`contact-widget ${variant}`}>
        <div className="contact-container">
          <div className="contact-header">
            <h2 className="contact-title">Ready to Get Started?</h2>
            <p className="contact-subtitle">
              Have questions about our service? Want to partner with us? We'd love to hear from you.
            </p>
          </div>

          <div className="contact-actions">
            <button 
              className="contact-primary-button"
              onClick={() => setIsModalOpen(true)}
            >
              <TuhmeIcon type="professional" size={20} />
              <span>Get In Touch</span>
              <div className="button-shine"></div>
            </button>

            <div className="contact-quick-links">
              <a 
                href="https://wa.me/16465889916" 
                target="_blank" 
                rel="noopener noreferrer"
                className="quick-link whatsapp"
              >
                <TuhmeIcon type="delivery" size={18} />
                <span>WhatsApp</span>
              </a>
              <a 
                href="mailto:hello@tuhme.com"
                className="quick-link email"
              >
                <TuhmeIcon type="secure" size={18} />
                <span>Email</span>
              </a>
            </div>
          </div>

          <div className="contact-background">
            <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>
          </div>
        </div>
      </div>

      <GetInTouchModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ContactWidget;