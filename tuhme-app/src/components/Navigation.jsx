import { useState, useEffect } from 'react';
import { useModal } from '../contexts/ModalContext';
import NavigationModals from './NavigationModals';
import ThemeToggle from './ThemeToggle';
import tuhmeLogo from '../assets/tuhme.png';

const Navigation = ({ onNavigate, currentSection, onOpenSavi, onOpenFeedback }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

    const handleClickOutside = (event) => {
      if (!event.target.closest('.luxury-dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
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

        <div className="nav-actions luxury-nav-redesign">
          {/* SAVI AI Assistant */}
          <button 
            className="luxury-nav-btn savi-button"
            onClick={onOpenSavi}
            title="Ask SAVI (AI Assistant)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
              <circle cx="12" cy="12" r="1" fill="currentColor"/>
            </svg>
          </button>

          {/* Store Finder */}
          <button 
            className="luxury-nav-btn store-button"
            onClick={() => openModal('storeFinder')}
            title="Find Stores"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle className="luxury-nav-btn theme-button" />
          
          {/* Menu Dropdown */}
          <div className="luxury-dropdown-container">
            <button 
              className="luxury-nav-btn dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              title="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="1" fill="currentColor"/>
                <circle cx="19" cy="12" r="1" fill="currentColor"/>
                <circle cx="5" cy="12" r="1" fill="currentColor"/>
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="luxury-dropdown-menu">
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    localStorage.removeItem('tuhme-daily-flyer-shown');
                    openModal('dailySalesFlyer');
                    setIsDropdownOpen(false);
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 8h8M8 12h5M8 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>Daily Sales Flyer</span>
                </button>
                
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    openModal('membership');
                    setIsDropdownOpen(false);
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.2"/>
                  </svg>
                  <span>Premium Membership</span>
                </button>
                
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    onOpenFeedback();
                    setIsDropdownOpen(false);
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="9" cy="10" r="1" fill="currentColor"/>
                    <circle cx="15" cy="10" r="1" fill="currentColor"/>
                  </svg>
                  <span>Contact & Support</span>
                </button>
                
                <div className="dropdown-divider"></div>
                
                <button 
                  className="dropdown-item express-item"
                  onClick={() => {
                    onNavigate('express-order');
                    setIsDropdownOpen(false);
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                    <polygon points="10,8 16,12 10,16" fill="currentColor"/>
                  </svg>
                  <span>Start Express Order</span>
                </button>
              </div>
            )}
          </div>
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