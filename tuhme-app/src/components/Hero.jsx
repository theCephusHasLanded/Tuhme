
import TuhmeIcon from './TuhmeIcon';
import { useState, useEffect } from 'react';

const Hero = ({ onStartExpressOrder }) => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Luxury color palettes that change hourly
  const luxuryPalettes = [
    { primary: '#0a0a0a', secondary: '#1a1a1a', accent: '#d4af37', name: 'Midnight Gold' },
    { primary: '#1a0f1a', secondary: '#2a1a2a', accent: '#e6c2a6', name: 'Champagne Dusk' },
    { primary: '#0f1419', secondary: '#1a2129', accent: '#8b9dc3', name: 'Sapphire Night' },
    { primary: '#191414', secondary: '#2a2125', accent: '#dda15e', name: 'Cognac Dream' },
    { primary: '#0d1421', secondary: '#1a2332', accent: '#a8dadc', name: 'Tiffany Dawn' },
    { primary: '#1a1a0f', secondary: '#2a2a1a', accent: '#f1faee', name: 'Pearl Morning' },
    { primary: '#1a0f14', secondary: '#2a1a25', accent: '#ffb3ba', name: 'Rose Aurora' },
    { primary: '#0f1a14', secondary: '#1a2a25', accent: '#c7f9cc', name: 'Emerald Mist' },
    { primary: '#14141a', secondary: '#25252a', accent: '#bde0ff', name: 'Crystal Blue' },
    { primary: '#1a140f', secondary: '#2a251a', accent: '#ffd23f', name: 'Saffron Luxury' },
    { primary: '#141a1a', secondary: '#252a2a', accent: '#a663cc', name: 'Amethyst Elite' },
    { primary: '#1a1914', secondary: '#2a2925', accent: '#ff6b35', name: 'Amber Prestige' },
    { primary: '#0f141a', secondary: '#1a252a', accent: '#4ecdc4', name: 'Turquoise Calm' },
    { primary: '#1a0f0f', secondary: '#2a1a1a', accent: '#ff9a8b', name: 'Coral Sunset' },
    { primary: '#14141a', secondary: '#25252a', accent: '#f8f32b', name: 'Citrine Bright' },
    { primary: '#1a1a14', secondary: '#2a2a25', accent: '#95e1d3', name: 'Mint Elegance' },
    { primary: '#191014', secondary: '#2a1a25', accent: '#f38ba8', name: 'Peony Blush' },
    { primary: '#141a19', secondary: '#252a29', accent: '#74c0fc', name: 'Azure Luxury' },
    { primary: '#1a1414', secondary: '#2a2525', accent: '#ffd43b', name: 'Topaz Glow' },
    { primary: '#0f1a1a', secondary: '#1a2a2a', accent: '#b197fc', name: 'Lavender Dusk' },
    { primary: '#1a190f', secondary: '#2a291a', accent: '#69db7c', name: 'Jade Prosperity' },
    { primary: '#1a0f19', secondary: '#2a1a29', accent: '#ffa8a8', name: 'Blush Elegance' },
    { primary: '#0f1a0f', secondary: '#1a2a1a', accent: '#82c91e', name: 'Peridot Fresh' },
    { primary: '#1a1a1a', secondary: '#2a2a2a', accent: '#d4af37', name: 'Classic Gold' }
  ];

  const currentPalette = luxuryPalettes[currentHour % luxuryPalettes.length];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
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
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              '--delay': `${i * 0.5}s`,
              '--accent-color': currentPalette.accent
            }}
          />
        ))}
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
            <span className="title-line">We Pay,</span>
            <span className="title-line">You Preview,</span>
            <span className="title-line accent-text" style={{ color: currentPalette.accent }}>
              Keep What You Love
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