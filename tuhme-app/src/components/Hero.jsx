
import TuhmeIcon from './TuhmeIcon';
import useHourlyImage from '../hooks/useHourlyImage';

const Hero = ({ onStartExpressOrder }) => {
  const { 
    currentImage, 
    getOptimizedImageUrl 
  } = useHourlyImage({
    category: 'luxury fashion',
    onImageChange: (image) => {
      console.log('Hero background changed:', image.alt_description);
    }
  });

  const backgroundStyle = {
    backgroundImage: currentImage 
      ? `url(${getOptimizedImageUrl('hero')})`
      : 'linear-gradient(135deg, var(--color-neutral-900) 0%, var(--color-neutral-800) 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <header className="hero" style={backgroundStyle}>
      <div className="hero-backdrop">
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <div className="logo-section">
          <h1 className="brand-name tuhme-logo">TUHME</h1>
          <p className="brand-tagline">Luxury Personal Shopping</p>
        </div>
        
        <div className="hero-main">
          <h2 className="hero-title">
            We'll Pay For It, And Bring The Store To You
          </h2>
          <p className="hero-subtitle">
            Shop from any luxury store in Manhattan & Brooklyn without leaving home. We handle the shopping, you handle the styling. Try on items in comfort, pay for only what you keep.
          </p>
          
          <div className="service-highlights">
            <div className="highlight">
              <div className="highlight-icon"><TuhmeIcon type="shopping" size={32} /></div>
              <div className="highlight-text">
                <h3>Shop Any Luxury Store</h3>
                <p>Access to premium boutiques and department stores across Manhattan</p>
              </div>
            </div>
            <div className="highlight">
              <div className="highlight-icon"><TuhmeIcon type="home" size={32} /></div>
              <div className="highlight-text">
                <h3>Private Try-On Experience</h3>
                <p>15-minute fitting sessions in the comfort of your home</p>
              </div>
            </div>
            <div className="highlight">
              <div className="highlight-icon"><TuhmeIcon type="payment" size={32} /></div>
              <div className="highlight-text">
                <h3>Pay For What You Keep</h3>
                <p>Only pay for items you decide to keep, we handle the rest</p>
              </div>
            </div>
          </div>
          
          <div className="hero-cta">
            <button 
              className="primary-cta"
              onClick={onStartExpressOrder}
            >
              Start Express Order
            </button>
            <button 
              className="secondary-cta"
              onClick={() => {
                const element = document.getElementById('how-it-works');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See How It Works
            </button>
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