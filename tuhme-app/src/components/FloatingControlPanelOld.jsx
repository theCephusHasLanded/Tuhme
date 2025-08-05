import React, { useState, useEffect } from 'react';
import { useModal } from '../contexts/ModalContext';
import ThemeSelector from './ThemeSelector';
import NavigationModals from './NavigationModals';

const FloatingControlPanel = ({ onNavigate, currentSection, onOpenSavi, onOpenFeedback, onMatrixToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const { openModal } = useModal();

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠', type: 'navigate' },
    { id: 'service-overview', label: 'Shop Any Store', icon: '🛍️', type: 'navigate' },
    { id: 'how-it-works', label: 'How Tuhme Works', icon: '⚡', type: 'navigate' },
    { id: 'pricing', label: 'Pricing', icon: '💰', type: 'navigate' },
    { id: 'delivery-info', label: 'Delivery Info', icon: '🚚', type: 'navigate' },
    { id: 'gallery', label: 'Testimonials', icon: '⭐', type: 'navigate' },
    { id: 'contact', label: 'Contact', icon: '📧', type: 'navigate' },
    { id: 'about', label: 'About Tuhme', icon: '🏢', type: 'modal' },
    { id: 'mission', label: 'Mission Statement', icon: '🎯', type: 'modal' },
    { id: 'hiring', label: 'Careers', icon: '💼', type: 'modal' },
    { id: 'express-orders', label: 'Express Orders', icon: '⚡', type: 'modal' },
    { id: 'tuhme-now', label: 'Tuhme Now', icon: '🚀', type: 'modal' },
    { id: 'partner', label: 'Partner With Us', icon: '🤝', type: 'modal' },
    { id: 'faq', label: 'FAQ', icon: '❓', type: 'modal' },
    { id: 'track', label: 'Track Order', icon: '📦', type: 'modal' },
    { id: 'feedback', label: 'Send Feedback', icon: '💬', type: 'modal' },
    { id: 'whatsapp', label: 'WhatsApp Support', icon: '📱', type: 'modal' },
    { id: 'privacy', label: 'Privacy Policy', icon: '🔒', type: 'modal' },
    { id: 'terms', label: 'Terms & Conditions', icon: '📄', type: 'modal' },
    { id: 'cookies', label: 'Cookie Policy', icon: '🍪', type: 'modal' },
    { id: 'refunds', label: 'Refund Policy', icon: '💰', type: 'modal' }
  ];

  const actionItems = [
    { id: 'savi', label: 'Ask SAVI', icon: '🤖', action: onOpenSavi, color: '#667eea' },
    { id: 'feedback', label: 'Feedback', icon: '💬', action: onOpenFeedback, color: '#f093fb' },
    { id: 'matrix', label: '3D Matrix', icon: '🌌', action: onMatrixToggle, color: '#4facfe' },
  ];

  useEffect(() => {
    let scrollTimer = null;
    let keyPressTimer = null;

    const handleScroll = () => {
      if (scrollTimer) return;
      scrollTimer = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
        scrollTimer = null;
      }, 16); // Throttle to ~60fps
    };

    const handleKeyPress = (e) => {
      if (keyPressTimer) return;
      
      // Toggle control panel with Ctrl + Space or Cmd + Space
      if ((e.ctrlKey || e.metaKey) && e.code === 'Space') {
        e.preventDefault();
        keyPressTimer = setTimeout(() => {
          setIsOpen(prev => !prev);
          keyPressTimer = null;
        }, 100);
        return;
      }
      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    // Passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyPress);
      if (scrollTimer) clearTimeout(scrollTimer);
      if (keyPressTimer) clearTimeout(keyPressTimer);
    };
  }, []);

  // Handle body scroll lock when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (item) => {
    if (item.type === 'modal') {
      setActiveModal(item.id);
    } else {
      onNavigate(item.id);
    }
    setIsOpen(false);
  };

  const closeModal = () => setActiveModal(null);

  return (
    <>
      {/* Floating Control Button */}
      <button 
        className={`floating-control-trigger ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Control Panel (Ctrl+Space)"
        aria-label="Open control panel"
      >
        <div className="control-icon">
          <span className="ctrl-text">CTRL</span>
          <div className="control-lines">
            <span className={`line line-1 ${isOpen ? 'open' : ''}`}></span>
            <span className={`line line-2 ${isOpen ? 'open' : ''}`}></span>
            <span className={`line line-3 ${isOpen ? 'open' : ''}`}></span>
          </div>
        </div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="control-panel-backdrop" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Control Panel */}
      <div className={`floating-control-panel ${isOpen ? 'open' : ''}`}>
        <div className="control-panel-header">
          <h3 className="panel-title">Navigation Hub</h3>
          <p className="panel-subtitle">Quick access to all sections</p>
          <div className="keyboard-hint">
            <kbd>Ctrl</kbd> + <kbd>Space</kbd> to toggle
          </div>
        </div>

        <div className="control-panel-content">
          {/* Navigation Section */}
          <div className="panel-section">
            <h4 className="section-title">Navigate</h4>
            <div className="nav-grid">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`nav-card ${currentSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                >
                  <div className="nav-icon">{item.icon}</div>
                  <span className="nav-label">{item.label}</span>
                  {currentSection === item.id && (
                    <div className="active-indicator"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Actions Section */}
          <div className="panel-section">
            <h4 className="section-title">Actions</h4>
            <div className="action-grid">
              {actionItems.map(item => (
                <button
                  key={item.id}
                  className="action-card"
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  style={{ '--accent-color': item.color }}
                >
                  <div className="action-icon">{item.icon}</div>
                  <span className="action-label">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Section */}
          <div className="panel-section">
            <h4 className="section-title">Appearance</h4>
            <div className="theme-section">
              <ThemeSelector />
            </div>
          </div>
        </div>

        <div className="control-panel-footer">
          <button 
            className="close-panel-btn"
            onClick={() => setIsOpen(false)}
          >
            Close Panel
          </button>
        </div>
      </div>

      {/* Modals */}
      <NavigationModals 
        activeModal={activeModal} 
        onClose={closeModal} 
      />

      <style jsx>{`
        .floating-control-trigger {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          width: 60px;
          height: 60px;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          cursor: pointer;
          z-index: 9999;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 10px 25px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .floating-control-trigger:hover {
          transform: scale(1.05);
          background: rgba(0, 0, 0, 0.9);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.4),
            0 0 30px rgba(255, 255, 255, 0.1);
        }

        .floating-control-trigger.active {
          background: var(--color-primary-600, #d4af37);
          border-color: var(--color-primary-600, #d4af37);
          transform: scale(1.1) rotate(90deg);
        }

        .floating-control-trigger.scrolled {
          top: 1rem;
          width: 50px;
          height: 50px;
        }

        .control-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .ctrl-text {
          font-size: 10px;
          font-weight: 700;
          color: white;
          letter-spacing: 0.5px;
          opacity: 0.9;
        }

        .control-lines {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .line {
          width: 16px;
          height: 2px;
          background: white;
          border-radius: 1px;
          transition: all 0.3s ease;
          opacity: 0.8;
        }

        .line.open.line-1 {
          transform: rotate(45deg) translate(3px, 3px);
        }

        .line.open.line-2 {
          opacity: 0;
          transform: translateX(10px);
        }

        .line.open.line-3 {
          transform: rotate(-45deg) translate(3px, -3px);
        }

        .control-panel-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          z-index: 9998;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .floating-control-panel {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 90vw;
          max-width: 800px;
          max-height: 85vh;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          z-index: 9999;
          transform: translate(-50%, -50%) scale(0.8);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .floating-control-panel.open {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }

        .control-panel-header {
          padding: 2rem 2rem 1rem 2rem;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .panel-title {
          font-family: var(--font-family-primary);
          font-size: 1.5rem;
          font-weight: 300;
          color: white;
          margin: 0 0 0.5rem 0;
          letter-spacing: 0.1em;
        }

        .panel-subtitle {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 1rem 0;
        }

        .keyboard-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .keyboard-hint kbd {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
        }

        .control-panel-content {
          padding: 1.5rem 2rem;
          max-height: 60vh;
          overflow-y: auto;
        }

        .panel-section {
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .nav-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 0.75rem;
        }

        .nav-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .nav-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .nav-card.active {
          background: rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }

        .nav-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        .nav-label {
          font-size: 0.875rem;
          color: white;
          font-weight: 500;
        }

        .active-indicator {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: var(--color-primary-600);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--color-primary-600);
        }

        .action-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.75rem;
        }

        .action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .action-card:hover {
          background: var(--accent-color, rgba(255, 255, 255, 0.1));
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .action-icon {
          font-size: 1.25rem;
          line-height: 1;
        }

        .action-label {
          font-size: 0.875rem;
          color: white;
          font-weight: 500;
        }

        .theme-section {
          display: flex;
          justify-content: center;
        }

        .control-panel-footer {
          padding: 1rem 2rem 2rem 2rem;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .close-panel-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .close-panel-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .floating-control-panel {
            width: 95vw;
            max-height: 90vh;
          }

          .control-panel-header {
            padding: 1.5rem 1rem 1rem 1rem;
          }

          .control-panel-content {
            padding: 1rem;
          }

          .nav-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.5rem;
          }

          .nav-card {
            padding: 0.75rem;
          }

          .action-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }

          .floating-control-trigger {
            width: 50px;
            height: 50px;
            top: 1rem;
            right: 1rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .floating-control-trigger,
          .floating-control-panel,
          .nav-card,
          .action-card {
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingControlPanel;
