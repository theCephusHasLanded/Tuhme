import { useModal } from '../contexts/ModalContext';
import tuhmeLogo from '../assets/tuhme.png';
import TuhmeIcon from './TuhmeIcon';

const Footer = () => {
  const { openModal } = useModal();

  const footerLinks = {
    company: [
      { label: 'About Tuhme', href: '#about' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Mission Statement', href: '#mission' },
      { label: 'Careers', href: '#hiring' }
    ],
    services: [
      { label: 'Express Orders', href: '#express-order' },
      { label: 'Tuhme Now', href: '#tuhme-now' },
      { label: 'Luxury Items', href: '#luxury-items' },
      { label: 'Partner With Us', href: '#partner' }
    ],
    support: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Track Order', href: '#track' },
      { label: 'Send Feedback', href: 'mailto:support@tuhme.com' },
      { label: 'WhatsApp Support', href: 'https://wa.me/16465889916' }
    ],
    legal: [
      { label: 'Privacy Policy', action: () => openModal('privacy') },
      { label: 'Terms and Conditions', action: () => openModal('terms') },
      { label: 'Cookie Policy', action: () => openModal('cookies') },
      { label: 'Refund Policy', href: '#refunds' }
    ]
  };

  const socialLinks = [
    { icon: <TuhmeIcon type="delivery" size={20} />, label: 'WhatsApp', href: 'https://wa.me/16465889916' },
    { icon: <TuhmeIcon type="secure" size={20} />, label: 'Email', href: 'mailto:support@tuhme.com' },
    { icon: <TuhmeIcon type="event" size={20} />, label: 'Instagram', href: '#instagram' },
    { icon: <TuhmeIcon type="professional" size={20} />, label: 'Twitter', href: '#twitter' }
  ];

  return (
    <footer className="liquid-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={tuhmeLogo} alt="TUHME" className="footer-logo-image" />
            </div>
            <p className="footer-tagline">
              We'll Pay For It, And Bring The Store To You
            </p>
            <p className="footer-description">
              Skip the hassle of shopping in-store. We bring your favorite items 
              directly to your door in Manhattan and Brooklyn, so you can try 
              everything on in comfort and pay for only what you keep.
            </p>
            
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="social-link"
                  target={social.href.startsWith('http') ? '_blank' : '_self'}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-label">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

            <div className="footer-links">
              <div className="link-column">
                <h4>Company</h4>
                <ul>
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="link-column">
                <h4>Services</h4>
                <ul>
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="link-column">
                <h4>Support</h4>
                <ul>
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      {link.action ? (
                        <button onClick={link.action} className="footer-link-button">
                          {link.label}
                        </button>
                      ) : (
                        <a 
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : '_self'}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="link-column">
                <h4>Legal</h4>
                <ul>
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      {link.action ? (
                        <button onClick={link.action} className="footer-link-button">
                          {link.label}
                        </button>
                      ) : (
                        <a href={link.href}>{link.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-info">
              <div className="service-area">
                <span className="info-label">Service Area:</span>
                <span className="info-value">Manhattan & Brooklyn, NYC</span>
              </div>
              <div className="business-hours">
                <span className="info-label">Hours:</span>
                <span className="info-value">Mon-Sun 9AM-9PM</span>
              </div>
              <div className="contact-info">
                <span className="info-label">Contact:</span>
                <span className="info-value">support@tuhme.com</span>
              </div>
            </div>

            <div className="footer-legal">
              <div className="legal-links">
                <button onClick={() => openModal('privacy')} className="footer-link-button">
                  Privacy Policy
                </button>
                <span className="separator">•</span>
                <button onClick={() => openModal('terms')} className="footer-link-button">
                  Terms of Service
                </button>
                <span className="separator">•</span>
                <button onClick={() => openModal('cookies')} className="footer-link-button">
                  Cookie Policy
                </button>
              </div>
              <p>&copy; 2024 TUHME. All rights reserved.</p>
              <p>Licensed luxury fashion delivery service in New York City.</p>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;