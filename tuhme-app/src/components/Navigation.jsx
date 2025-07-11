import { useState, useEffect } from 'react';
import { useModal } from '../contexts/ModalContext';
import NavigationModals from './NavigationModals';
import ThemeToggle from './ThemeToggle';
import tuhmeLogo from '../assets/tuhme.png';

const Navigation = ({ onNavigate, currentSection, onOpenSavi, onOpenFeedback }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const { openModal } = useModal();

  const navItems = [
    { id: 'home', label: 'Home', type: 'navigate' },
    { id: 'how-it-works', label: 'How Tuhme Works', type: 'navigate' },
    { id: 'mission', label: 'Mission Statement', type: 'modal' },
    { id: 'partner', label: 'Partner With Us', type: 'modal' },
    { id: 'luxury-items', label: 'Luxury Items', type: 'modal' },
    { id: 'hiring', label: "We're Hiring!", type: 'navigate' },
    { id: 'tuhme-now', label: 'Tuhme Now', type: 'modal' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item) => {
    if (item.type === 'modal') {
      setActiveModal(item.id);
    } else {
      onNavigate(item.id);
    }
    setIsMenuOpen(false);
  };

  const closeModal = () => setActiveModal(null);

  return (
    <nav className={`navigation liquid-glass-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo liquid-glass-icon" onClick={() => handleNavClick('home')}>
          <img src={tuhmeLogo} alt="TUHME" className="nav-logo-image" />
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item liquid-glass-nav-item ${currentSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              <span className="nav-item-text">{item.label}</span>
              <div className="nav-item-underline"></div>
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button 
            className="nav-icon-button flyer-button"
            onClick={() => {
              localStorage.removeItem('tuhme-daily-flyer-shown');
              openModal('dailySalesFlyer');
            }}
            title="Daily Sales Flyer"
          >
            <div className="icon-container">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
                <path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="9" r="1" fill="currentColor" opacity="0.6"/>
                <circle cx="15" cy="9" r="1" fill="currentColor" opacity="0.6"/>
                <circle cx="12" cy="15" r="1" fill="currentColor" opacity="0.6"/>
              </svg>
              <div className="icon-glow"></div>
            </div>
          </button>

          <button 
            className="nav-icon-button savi-button liquid-animate-glow"
            onClick={onOpenSavi}
            title="Ask SAVI (AI Assistant)"
          >
            <div className="icon-container">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
                <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.8"/>
                <path d="M12 6v2M12 16v2M6 12h2M16 12h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
              </svg>
              <div className="icon-glow"></div>
            </div>
          </button>

          <button 
            className="nav-icon-button feedback-button"
            onClick={onOpenFeedback}
            title="Send Feedback"
          >
            <div className="icon-container">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
                <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.5-.8 2.8-2 3.5v1.5h-4v-1.5c-1.2-.7-2-2-2-3.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="10" cy="10" r="0.5" fill="currentColor" opacity="0.7"/>
                <circle cx="14" cy="10" r="0.5" fill="currentColor" opacity="0.7"/>
              </svg>
              <div className="icon-glow"></div>
            </div>
          </button>

          <button 
            className="nav-icon-button theme-button"
            title="Toggle theme"
          >
            <div className="icon-container">
              <ThemeToggle />
              <div className="icon-glow"></div>
            </div>
          </button>
          
          <button 
            className="nav-text-button membership-button"
            onClick={() => openModal('membership')}
          >
            <span className="button-text">Join Premium</span>
            <div className="button-glow"></div>
          </button>
          
          <button 
            className="nav-text-button express-button primary-accent"
            onClick={() => onNavigate('express-order')}
          >
            <span className="button-text">Start Express Order</span>
            <div className="button-glow"></div>
          </button>
        </div>

        <button 
          className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <NavigationModals activeModal={activeModal} closeModal={closeModal} />
    </nav>
  );
};

export default Navigation;