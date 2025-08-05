import { useModal } from '../contexts/ModalContext';
import tuhmeLogo from '../assets/tuhme.png';
import TuhmeIcon from './TuhmeIcon';

const Footer = () => {

  const socialLinks = [
    { icon: <TuhmeIcon type="delivery" size={20} />, label: 'WhatsApp', href: 'https://wa.me/16465889916' },
    { icon: <TuhmeIcon type="secure" size={20} />, label: 'Email', href: 'mailto:support@tuhme.com' },
    { icon: <TuhmeIcon type="event" size={20} />, label: 'Instagram', href: '#instagram' },
    { icon: <TuhmeIcon type="professional" size={20} />, label: 'Twitter', href: '#twitter' }
  ];

  return (
    <footer className="luxury-section" style={{
      backgroundImage: `
        linear-gradient(135deg, var(--theme-primary)e0 0%, var(--theme-secondary)e0 100%),
        url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')
      `,
      backgroundBlendMode: 'overlay, normal',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      borderTop: '1px solid var(--theme-accent)'
    }}>
      <div className="container">
        <div className="footer-content" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <img src={tuhmeLogo} alt="TUHME" style={{
              height: '48px',
              filter: 'brightness(0) invert(1)',
              marginBottom: 'var(--space-4)'
            }} />
          </div>
          <h3 style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
            fontSize: 'var(--text-xl)',
            fontWeight: '700',
            color: 'var(--theme-accent)',
            margin: '0 0 var(--space-4) 0'
          }}>
            We'll Pay For It, And Bring The Store To You
          </h3>
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif',
            fontSize: 'var(--text-lg)',
            lineHeight: '1.6',
            color: 'var(--button-secondary-text)',
            opacity: '0.9',
            margin: '0 0 var(--space-8) 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Skip the hassle of shopping in-store. We bring your favorite items 
            directly to your door in Manhattan and Brooklyn, so you can try 
            everything on in comfort and pay for only what you keep.
          </p>
          
          <div className="social-links" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 'var(--space-4)', 
            marginBottom: 'var(--space-8)'
          }}>
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                className="social-link"
                target={social.href.startsWith('http') ? '_blank' : '_self'}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: 'var(--button-secondary-text)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <span className="social-icon">{social.icon}</span>
                <span className="social-label" style={{ fontSize: 'var(--text-sm)' }}>{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom" style={{ 
          textAlign: 'center', 
          paddingTop: 'var(--space-6)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          marginTop: 'var(--space-6)'
        }}>
          <div className="footer-info" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-4)',
            flexWrap: 'wrap'
          }}>
            <div className="service-area" style={{ color: 'var(--button-secondary-text)', fontSize: 'var(--text-sm)' }}>
              <span className="info-label" style={{ opacity: '0.7' }}>Service Area:</span>{' '}
              <span className="info-value" style={{ fontWeight: '500' }}>Manhattan & Brooklyn, NYC</span>
            </div>
            <div className="business-hours" style={{ color: 'var(--button-secondary-text)', fontSize: 'var(--text-sm)' }}>
              <span className="info-label" style={{ opacity: '0.7' }}>Hours:</span>{' '}
              <span className="info-value" style={{ fontWeight: '500' }}>Mon-Sun 9AM-9PM</span>
            </div>
            <div className="contact-info" style={{ color: 'var(--button-secondary-text)', fontSize: 'var(--text-sm)' }}>
              <span className="info-label" style={{ opacity: '0.7' }}>Contact:</span>{' '}
              <span className="info-value" style={{ fontWeight: '500' }}>support@tuhme.com</span>
            </div>
          </div>

          <div className="footer-legal" style={{ 
            color: 'var(--button-secondary-text)', 
            fontSize: 'var(--text-sm)',
            opacity: '0.8'
          }}>
            <p style={{ margin: '0 0 var(--space-2) 0' }}>&copy; 2024 TUHME. All rights reserved.</p>
            <p style={{ margin: '0' }}>Licensed luxury fashion delivery service in New York City.</p>
          </div>
        </div>
      </div>
      </footer>
    );
};

export default Footer;