
import TuhmeIcon from './TuhmeIcon';
import { useState, useEffect } from 'react';

const Hero = ({ onStartExpressOrder }) => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Get current theme from CSS custom properties
  const [currentPalette, setCurrentPalette] = useState({
    primary: '#1a1a1a',
    secondary: '#2a2a2a', 
    accent: '#d4af37',
    name: 'Default'
  });

  useEffect(() => {
    const updatePalette = () => {
      const root = document.documentElement;
      const primary = getComputedStyle(root).getPropertyValue('--theme-primary') || '#1a1a1a';
      const secondary = getComputedStyle(root).getPropertyValue('--theme-secondary') || '#2a2a2a';
      const accent = getComputedStyle(root).getPropertyValue('--theme-accent') || '#d4af37';
      
      setCurrentPalette({ primary, secondary, accent, name: 'Current Theme' });
    };

    updatePalette();
    
    // Listen for theme changes
    const observer = new MutationObserver(updatePalette);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme', 'style'] 
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const backgroundStyle = {
    background: `
      radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
        ${currentPalette.accent}15 0%, 
        ${currentPalette.primary}95 50%, 
        ${currentPalette.secondary}98 100%),
      linear-gradient(135deg, 
        ${currentPalette.primary} 0%, 
        ${currentPalette.secondary} 100%)
    `,
  };

  return (
    <header className="hero-luxury" style={backgroundStyle}>
      <div className="luxury-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              '--delay': `${i * 0.3}s`,
              '--accent-color': currentPalette.accent,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`
            }}
          />
        ))}
      </div>
      
      <div className="floating-elements">
        <div 
          className="floating-ring"
          style={{ '--accent-color': currentPalette.accent }}
        ></div>
        <div 
          className="floating-diamond"
          style={{ '--accent-color': currentPalette.accent }}
        ></div>
        <div 
          className="floating-cube"
          style={{ '--accent-color': currentPalette.accent }}
        ></div>
      </div>
      
      <div className="hero-content-luxury">
        <div className="palette-indicator">
          <span className="palette-name">{currentPalette.name}</span>
          <div className="time-indicator">{String(currentHour).padStart(2, '0')}:00</div>
        </div>

        <div className="brand-section-luxury">
          <h1 className="brand-name-luxury">TUHME</h1>
          <div className="brand-line" style={{ background: currentPalette.accent }}></div>
          <p className="brand-essence">Curated Luxury • Delivered</p>
        </div>
        
        <div className="hero-main-luxury">
          <h2 className="hero-title-luxury">
            <span 
              className="title-line accent-text hero-main-title" 
              style={{ 
                color: currentPalette.accent,
                '--current-accent': currentPalette.accent 
              }}
            >
              We'll Pay For It, And Bring The Store To You
            </span>
          </h2>
          
          <div className="hero-description-luxury">
            <p className="description-text">
              Experience luxury shopping reimagined. Our personal shoppers curate from Manhattan's finest boutiques, 
              bringing selections directly to your home for private viewing.
            </p>
            <div className="luxury-promise">
              <div className="promise-item">
                <span className="promise-icon" style={{ color: currentPalette.accent }}>◆</span>
                <span>Zero upfront payment</span>
              </div>
              <div className="promise-item">
                <span className="promise-icon" style={{ color: currentPalette.accent }}>◆</span>
                <span>Private 15-minute sessions</span>
              </div>
              <div className="promise-item">
                <span className="promise-icon" style={{ color: currentPalette.accent }}>◆</span>
                <span>Return what doesn't fit</span>
              </div>
            </div>
          </div>
          
          <div className="cta-section-luxury">
            <button 
              className="primary-cta-luxury"
              onClick={onStartExpressOrder}
              style={{ 
                '--accent-color': currentPalette.accent,
                '--primary-color': currentPalette.primary 
              }}
            >
              <span className="cta-text">Begin Your Experience</span>
              <div className="cta-glow" style={{ background: currentPalette.accent }}></div>
            </button>
            
            <button 
              className="secondary-cta-luxury"
              onClick={() => {
                const element = document.getElementById('how-it-works');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ borderColor: currentPalette.accent, color: currentPalette.accent }}
            >
              <span>Discover the Process</span>
            </button>
          </div>

          <div className="availability-indicator">
            <div className="availability-dot" style={{ background: currentPalette.accent }}></div>
            <span>Available in Manhattan & Brooklyn</span>
          </div>
          
          <div className="track-order-section">
            <p className="track-order-label">Already have an order?</p>
            <div className="track-order-form">
              <input 
                type="tel" 
                placeholder="Enter your phone number"
                className="phone-input"
                id="track-phone"
              />
              <button 
                className="track-button"
                onClick={() => {
                  const phone = document.getElementById('track-phone').value;
                  if (phone.trim()) {
                    window.dispatchEvent(new CustomEvent('trackOrder', { detail: { phone } }));
                  }
                }}
              >
                Track Order
              </button>
            </div>
          </div>
        </div>
        

        <div className="trust-indicators">
          <div className="indicator">
            <span className="trust-number">Same Day</span>
            <span className="trust-label">Delivery Available</span>
          </div>
          <div className="indicator">
            <span className="trust-number">15 Min</span>
            <span className="trust-label">Try On Time</span>
          </div>
          <div className="indicator">
            <span className="trust-number">100%</span>
            <span className="trust-label">Satisfaction</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;