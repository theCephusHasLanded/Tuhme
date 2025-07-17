import { useState } from 'react';
import { useModal } from '../contexts/ModalContext';
import tuhmeLogo from '../assets/tuhme.png';
import TuhmeIcon from './TuhmeIcon';
import { IconBuilding, IconSparkles, IconMessageCircle, IconScale } from '@tabler/icons-react';

const Footer = () => {
  const { openModal } = useModal();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(null);

  const footerSections = {
    company: {
      title: 'Company',
      icon: <IconBuilding size={16} />,
      items: [
        { label: 'About Tuhme', action: () => setShowInfoModal('about') },
        { label: 'How It Works', action: () => setShowInfoModal('howItWorks') },
        { label: 'Mission Statement', action: () => setShowInfoModal('mission') },
        { label: 'Careers', action: () => setShowInfoModal('careers') }
      ]
    },
    services: {
      title: 'Services',
      icon: <IconSparkles size={16} />,
      items: [
        { label: 'Express Orders', action: () => setShowInfoModal('expressOrders') },
        { label: 'Tuhme Now', action: () => setShowInfoModal('tuhmeNow') },
        { label: 'Luxury Items', action: () => setShowInfoModal('luxuryItems') },
        { label: 'Partner With Us', action: () => setShowInfoModal('partner') }
      ]
    },
    support: {
      title: 'Support',
      icon: <IconMessageCircle size={16} />,
      items: [
        { label: 'FAQ', action: () => setShowInfoModal('faq') },
        { label: 'Contact Us', action: () => setShowInfoModal('contact') },
        { label: 'Send Feedback', href: 'mailto:support@tuhme.com' },
        { label: 'WhatsApp Support', href: 'https://wa.me/16465889916' }
      ]
    },
    legal: {
      title: 'Legal',
      icon: <IconScale size={16} />,
      items: [
        { label: 'Privacy Policy', action: () => openModal('privacy') },
        { label: 'Terms and Conditions', action: () => openModal('terms') },
        { label: 'Cookie Policy', action: () => openModal('cookies') },
        { label: 'Refund Policy', action: () => setShowInfoModal('refund') }
      ]
    }
  };

  const handleDropdownToggle = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const handleModalClose = () => {
    setShowInfoModal(null);
  };

  const getModalContent = (type) => {
    const content = {
      about: {
        title: 'About TUHME',
        content: 'TUHME revolutionizes luxury shopping by bringing the store experience to your doorstep. Founded in NYC, we specialize in curated personal shopping delivery across Manhattan and Brooklyn, offering personalized shopping experiences without the traditional retail hassles.'
      },
      howItWorks: {
        title: 'How It Works',
        content: '1. Browse & Select: Choose items from your favorite luxury stores\n2. Personal Shopper: We assign a dedicated shopper to collect your items\n3. Delivery & Try-On: We bring everything to you for a private 15-minute session\n4. Keep What You Love: Pay only for items you decide to keep'
      },
      mission: {
        title: 'Our Mission',
        content: 'To democratize luxury shopping by eliminating barriers between customers and their desired fashion pieces. We believe everyone deserves access to luxury items with the convenience of home try-ons and the confidence of only paying for what they truly love.'
      },
      careers: {
        title: 'Careers at TUHME',
        content: 'Join our team of luxury fashion enthusiasts! We\'re always looking for personal shoppers, customer service representatives, and logistics coordinators. Email careers@tuhme.com to learn about current opportunities.'
      },
      expressOrders: {
        title: 'Express Orders',
        content: 'Need something fast? Our Express Orders service delivers luxury items within 2-4 hours across Manhattan and Brooklyn. Perfect for last-minute events, special occasions, or when you simply can\'t wait to try on that perfect piece.'
      },
      tuhmeNow: {
        title: 'TUHME Now',
        content: 'Our instant shopping service for immediate fashion needs. Available 7 days a week, TUHME Now connects you with personal shoppers who can source and deliver items from luxury retailers within hours.'
      },
      luxuryItems: {
        title: 'Luxury Items',
        content: 'We specialize in high-end fashion from premium brands including Gucci, Prada, Louis Vuitton, Chanel, and many more. From designer handbags to couture dresses, we bring the luxury shopping experience directly to you.'
      },
      partner: {
        title: 'Partner With Us',
        content: 'Luxury retailers: Join our network and expand your reach to customers who prefer home try-ons. Personal shoppers: Apply to become part of our curated team. Contact partnerships@tuhme.com to explore collaboration opportunities.'
      },
      faq: {
        title: 'Frequently Asked Questions',
        content: 'Q: How does pricing work?\nA: You only pay for items you keep, plus a small service fee.\n\nQ: What areas do you serve?\nA: Currently Manhattan and Brooklyn, NYC.\n\nQ: How long is the try-on session?\nA: 15 minutes of private time with your personal shopper.'
      },
      contact: {
        title: 'Contact Us',
        content: 'Email: support@tuhme.com\nWhatsApp: Contact us via WhatsApp\nService Hours: Monday-Sunday 9AM-9PM\nService Area: Manhattan & Brooklyn, NYC\n\nFor partnerships: partnerships@tuhme.com\nFor careers: careers@tuhme.com'
      },
      refund: {
        title: 'Refund Policy',
        content: 'Items you don\'t keep during your try-on session are automatically excluded from your final bill. For items you do keep, returns are accepted within 7 days in original condition. Service fees are non-refundable. Full refund policy available upon request.'
      }
    };
    return content[type] || { title: 'Information', content: 'Content not available.' };
  };

  return (
    <footer className="compact-footer liquid-glass-footer">
      <div className="container">
        <div className="footer-content">
          {/* Main Footer Section */}
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo liquid-glass-icon">
                <img src={tuhmeLogo} alt="TUHME" className="footer-logo-image" />
              </div>
              <p className="footer-tagline glowing-tagline">
                We'll Pay For It, And Bring The Store To You
              </p>
            </div>

            {/* Compact Navigation Dropdowns */}
            <div className="footer-nav-compact">
              {Object.entries(footerSections).map(([key, section]) => (
                <div key={key} className="nav-dropdown">
                  <button
                    className="dropdown-trigger liquid-glass-button"
                    onClick={() => handleDropdownToggle(key)}
                    aria-expanded={openDropdown === key}
                  >
                    <span className="dropdown-icon">{section.icon}</span>
                    <span className="dropdown-title">{section.title}</span>
                    <span className={`dropdown-arrow ${openDropdown === key ? 'open' : ''}`}>⌄</span>
                  </button>

                  {openDropdown === key && (
                    <div className="dropdown-menu liquid-glass-card">
                      {section.items.map((item, index) => (
                        <div key={index} className="dropdown-item">
                          {item.action ? (
                            <button onClick={item.action} className="dropdown-link liquid-glass-button">
                              {item.label}
                            </button>
                          ) : (
                            <a
                              href={item.href}
                              className="dropdown-link liquid-glass-button"
                              target={item.href?.startsWith('http') ? '_blank' : '_self'}
                              rel={item.href?.startsWith('http') ? 'noopener noreferrer' : ''}
                            >
                              {item.label}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Contact */}
            <div className="footer-contact">
              <a href="https://wa.me/16465889916" className="contact-whatsapp liquid-glass-button primary liquid-animate-float" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">💬</span>
                <span>WhatsApp</span>
              </a>
              <a href="mailto:support@tuhme.com" className="contact-email liquid-glass-button">
                <span className="contact-icon">✉️</span>
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-info">
              <span>Manhattan & Brooklyn • Mon-Sun 9AM-9PM</span>
            </div>
            <div className="footer-legal">
              <span>&copy; 2025 TUHME. All rights reserved.</span>
              <span className="payment-powered">Subscription services powered by Stripe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Information Modal */}
      {showInfoModal && (
        <div className="info-modal-overlay" onClick={handleModalClose}>
          <div className="info-modal liquid-glass-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{getModalContent(showInfoModal).title}</h3>
              <button onClick={handleModalClose} className="modal-close liquid-glass-button">&times;</button>
            </div>
            <div className="modal-body">
              <p>{getModalContent(showInfoModal).content}</p>
            </div>
            <div className="modal-footer">
              <button onClick={handleModalClose} className="modal-ok-btn liquid-glass-button primary">Got it</button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
