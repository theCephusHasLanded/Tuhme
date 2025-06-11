import { useState, useEffect } from 'react';
import { useModal } from '../contexts/ModalContext';
import ThemeToggle from './ThemeToggle';
import NavigationModals from './NavigationModals';
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
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => handleNavClick('home')}>
          <img src={tuhmeLogo} alt="TUHME" className="nav-logo-image" />
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              <span className="nav-item-text">{item.label}</span>
              <div className="nav-item-underline"></div>
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button 
            className="savi-button"
            onClick={onOpenSavi}
            title="Ask SAVI (AI Assistant)"
          >
            <span className="savi-icon">S</span>
          </button>

          <button 
            className="feedback-button"
            onClick={onOpenFeedback}
            title="Send Feedback"
          >
            <span className="feedback-icon">💬</span>
          </button>

          <ThemeToggle />
          
          <button 
            className="membership-button"
            onClick={() => openModal('membership')}
          >
            <span className="button-text">Join Premium</span>
            <div className="button-shine"></div>
          </button>
          
          <button 
            className="express-button"
            onClick={() => onNavigate('express-order')}
          >
            <span className="button-text">Start Express Order</span>
            <div className="button-shine"></div>
          </button>
        </div>

        <button 
          className="mobile-menu-toggle"
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