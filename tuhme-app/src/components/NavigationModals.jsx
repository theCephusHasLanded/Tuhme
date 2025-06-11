import TuhmeIcon from './TuhmeIcon';

const NavigationModals = ({ activeModal, closeModal }) => {

  const openCalendar = () => {
    window.open('https://calendly.com/tuhme-luxury', '_blank');
  };

  const MissionModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content mission-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="professional" size={40} />
          <h2>Our Mission</h2>
        </div>

        <div className="modal-body">
          <div className="mission-statement">
            <h3>Revolutionizing Luxury Shopping</h3>
            <p>
              At TUHME, we believe luxury shopping should be effortless, personal, and accessible. 
              Our mission is to bridge the gap between high-end fashion and modern convenience, 
              delivering curated luxury experiences directly to your doorstep.
            </p>
            
            <div className="mission-pillars">
              <div className="pillar">
                <TuhmeIcon type="delivery" size={24} />
                <h4>Instant Access</h4>
                <p>Same-day delivery of luxury items from premium retailers</p>
              </div>
              
              <div className="pillar">
                <TuhmeIcon type="professional" size={24} />
                <h4>Personal Curation</h4>
                <p>Expert stylists who understand your unique taste and preferences</p>
              </div>
              
              <div className="pillar">
                <TuhmeIcon type="secure" size={24} />
                <h4>Trust & Quality</h4>
                <p>Verified authentic items from authorized luxury retailers</p>
              </div>
            </div>

            <div className="mission-vision">
              <h4>Our Vision</h4>
              <p>
                To become the world's premier luxury concierge service, making high-end fashion 
                accessible to discerning customers who value quality, style, and convenience.
              </p>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
            <button className="modal-action-btn primary" onClick={() => {
              window.open('https://calendly.com/tuhme-luxury', '_blank');
              closeModal();
            }}>
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PartnerModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content partner-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="shopping" size={40} />
          <h2>Partner With Us</h2>
        </div>

        <div className="modal-body">
          <div className="partner-content">
            <h3>Join the TUHME Network</h3>
            <p>
              We're looking for luxury retailers, boutiques, and fashion brands to join our 
              exclusive network. Partner with us to reach discerning customers who value 
              quality and convenience.
            </p>

            <div className="partner-benefits">
              <div className="benefit">
                <TuhmeIcon type="delivery" size={24} />
                <h4>Increased Reach</h4>
                <p>Access to our premium customer base</p>
              </div>
              
              <div className="benefit">
                <TuhmeIcon type="time" size={24} />
                <h4>Same-Day Sales</h4>
                <p>Convert browsers to buyers with instant delivery</p>
              </div>
              
              <div className="benefit">
                <TuhmeIcon type="professional" size={24} />
                <h4>White-Glove Service</h4>
                <p>We handle the logistics, you focus on your products</p>
              </div>
            </div>

            <div className="partner-types">
              <h4>Partner Categories</h4>
              <ul>
                <li>Luxury Department Stores (Bergdorf Goodman, Saks, etc.)</li>
                <li>High-End Boutiques</li>
                <li>Designer Brand Stores</li>
                <li>Specialty Luxury Retailers</li>
                <li>Authorized Dealers</li>
              </ul>
            </div>

            <div className="partner-cta">
              <button className="luxury-button" onClick={openCalendar}>
                <TuhmeIcon type="time" size={20} />
                Schedule Partnership Meeting
              </button>
              <p className="cta-subtitle">Let's discuss how we can grow together</p>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
            <button className="modal-action-btn primary" onClick={() => {
              openCalendar();
              closeModal();
            }}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const LuxuryModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content luxury-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="professional" size={40} />
          <h2>Luxury Items & Concierge</h2>
        </div>

        <div className="modal-body">
          <div className="luxury-content">
            <h3>Curated Luxury Collection</h3>
            <p>
              Discover an exclusive selection of luxury items from the world's most prestigious brands. 
              Our concierge service ensures you get exactly what you're looking for.
            </p>

            <div className="luxury-categories">
              <div className="category">
                <TuhmeIcon type="shopping" size={24} />
                <h4>Designer Fashion</h4>
                <p>Gucci, Prada, Louis Vuitton, Fendi</p>
              </div>
              
              <div className="category">
                <TuhmeIcon type="professional" size={24} />
                <h4>Jewelry & Watches</h4>
                <p>Tiffany & Co., Cartier, Rolex</p>
              </div>
              
              <div className="category">
                <TuhmeIcon type="delivery" size={24} />
                <h4>Accessories</h4>
                <p>Handbags, Shoes, Sunglasses</p>
              </div>
              
              <div className="category">
                <TuhmeIcon type="secure" size={24} />
                <h4>Limited Editions</h4>
                <p>Rare finds and exclusive releases</p>
              </div>
            </div>

            <div className="concierge-services">
              <h4>Personal Concierge Services</h4>
              <ul>
                <li>Personal Shopping Consultation</li>
                <li>Size & Fit Verification</li>
                <li>Authentication Guarantee</li>
                <li>Gift Wrapping & Presentation</li>
                <li>Special Occasion Styling</li>
                <li>Wardrobe Planning</li>
              </ul>
            </div>

            <div className="luxury-cta">
              <button className="luxury-button" onClick={openCalendar}>
                <TuhmeIcon type="time" size={20} />
                Book Luxury Consultation
              </button>
              <p className="cta-subtitle">
                Schedule a personalized session with our luxury specialists
              </p>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
            <button className="modal-action-btn primary" onClick={() => {
              openCalendar();
              closeModal();
            }}>
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TuhmeNowModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content tuhme-now-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="delivery" size={40} />
          <h2>TUHME Now</h2>
        </div>

        <div className="modal-body">
          <div className="tuhme-now-content">
            <h3>Ultra-Fast Luxury Delivery</h3>
            <p>
              Need something now? TUHME Now is our premium same-day delivery service 
              for urgent luxury shopping needs.
            </p>

            <div className="now-features">
              <div className="feature">
                <TuhmeIcon type="time" size={24} />
                <h4>2-Hour Delivery</h4>
                <p>Get your luxury items in as fast as 2 hours</p>
              </div>
              
              <div className="feature">
                <TuhmeIcon type="delivery" size={24} />
                <h4>Real-Time Tracking</h4>
                <p>Follow your order from store to door</p>
              </div>
              
              <div className="feature">
                <TuhmeIcon type="professional" size={24} />
                <h4>White Glove Service</h4>
                <p>Professional presentation and handling</p>
              </div>
            </div>

            <div className="now-process">
              <h4>How It Works</h4>
              <div className="process-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <p>Screenshot or describe what you need</p>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <p>We locate and verify the item</p>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <p>Professional pickup and delivery</p>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <p>Enjoy your luxury purchase</p>
                </div>
              </div>
            </div>

            <div className="now-pricing">
              <h4>Pricing</h4>
              <div className="pricing-tier">
                <strong>TUHME Now Premium</strong>
                <p>2-hour delivery: $35 + item cost</p>
              </div>
              <div className="pricing-tier">
                <strong>TUHME Now Standard</strong>
                <p>Same-day delivery: $25 + item cost</p>
              </div>
            </div>

            <div className="now-cta">
              <button className="luxury-button express-order-btn">
                <TuhmeIcon type="delivery" size={20} />
                Start TUHME Now Order
              </button>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
            <button className="modal-action-btn primary" onClick={() => {
              // Navigate to express order flow
              closeModal();
            }}>
              Start Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {activeModal === 'mission' && <MissionModal />}
      {activeModal === 'partner' && <PartnerModal />}
      {activeModal === 'luxury-items' && <LuxuryModal />}
      {activeModal === 'tuhme-now' && <TuhmeNowModal />}
    </>
  );
};

export default NavigationModals;