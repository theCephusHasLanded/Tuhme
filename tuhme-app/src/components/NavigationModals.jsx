import TuhmeIcon from './TuhmeIcon';

const NavigationModals = ({ activeModal, onClose }) => {

  const openCalendar = () => {
    window.open('https://calendly.com/tuhme-luxury', '_blank');
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/16465889916', '_blank');
  };

  const closeModal = () => {
    if (onClose) onClose();
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

  // New modals for all footer sections
  const AboutModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content about-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="professional" size={40} />
          <h2>About TUHME</h2>
        </div>

        <div className="modal-body">
          <div className="about-content">
            <h3>Revolutionizing Luxury Shopping</h3>
            <p>
              TUHME is New York City's premier luxury shopping concierge service. We bring the boutique 
              experience directly to your doorstep, allowing you to shop from Manhattan and Brooklyn's 
              finest stores without leaving your home.
            </p>
            
            <div className="about-story">
              <h4>Our Story</h4>
              <p>
                Founded with the vision of making luxury accessible and convenient, TUHME bridges the gap 
                between high-end retail and modern lifestyle demands. We understand that your time is valuable, 
                and shopping should be an experience, not a chore.
              </p>
            </div>

            <div className="about-values">
              <div className="value">
                <TuhmeIcon type="delivery" size={24} />
                <h4>Convenience First</h4>
                <p>Shop from anywhere, anytime</p>
              </div>
              
              <div className="value">
                <TuhmeIcon type="secure" size={24} />
                <h4>Authenticity Guaranteed</h4>
                <p>Only verified luxury retailers</p>
              </div>
              
              <div className="value">
                <TuhmeIcon type="professional" size={24} />
                <h4>Personal Service</h4>
                <p>Dedicated shopping assistants</p>
              </div>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CareersModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content careers-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="professional" size={40} />
          <h2>Careers at TUHME</h2>
        </div>

        <div className="modal-body">
          <div className="careers-content">
            <h3>Join Our Growing Team</h3>
            <p>
              We're looking for passionate individuals who share our vision of revolutionizing 
              luxury retail. Join us in creating exceptional experiences for discerning customers.
            </p>
            
            <div className="open-positions">
              <h4>Open Positions</h4>
              <div className="position">
                <h5>Personal Shopping Assistant</h5>
                <p>Full-time • Manhattan & Brooklyn</p>
                <p>Help customers discover and purchase luxury items with personalized service.</p>
              </div>
              
              <div className="position">
                <h5>Delivery Specialist</h5>
                <p>Full-time • NYC Metro Area</p>
                <p>Provide white-glove delivery service for high-end fashion and accessories.</p>
              </div>
              
              <div className="position">
                <h5>Customer Experience Manager</h5>
                <p>Full-time • Remote/Hybrid</p>
                <p>Lead customer service operations and ensure exceptional client satisfaction.</p>
              </div>
            </div>

            <div className="benefits">
              <h4>Why Work With Us</h4>
              <ul>
                <li>Competitive salary and benefits</li>
                <li>Employee shopping discounts</li>
                <li>Flexible scheduling</li>
                <li>Professional development opportunities</li>
                <li>Dynamic, fast-growing company culture</li>
              </ul>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
            <button className="modal-action-btn primary" onClick={() => {
              window.open('mailto:careers@tuhme.com?subject=Career Inquiry', '_blank');
              closeModal();
            }}>
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ExpressOrdersModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content express-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="delivery" size={40} />
          <h2>Express Orders</h2>
        </div>

        <div className="modal-body">
          <div className="express-content">
            <h3>Fast-Track Your Luxury Shopping</h3>
            <p>
              Need something urgently? Our Express Orders service gets you luxury items 
              within hours, not days. Perfect for last-minute events, gifts, or when you 
              just can't wait.
            </p>
            
            <div className="express-tiers">
              <div className="tier">
                <h4>Express (4-6 hours)</h4>
                <p>Standard express delivery for most items</p>
                <span className="price">$25 delivery fee</span>
              </div>
              
              <div className="tier premium">
                <h4>Rush (1-2 hours)</h4>
                <p>Priority handling for urgent needs</p>
                <span className="price">$45 delivery fee</span>
              </div>
            </div>

            <div className="express-process">
              <h4>How It Works</h4>
              <div className="steps">
                <div className="step">
                  <span className="step-number">1</span>
                  <p>Send us screenshots or item details via WhatsApp</p>
                </div>
                <div className="step">
                  <span className="step-number">2</span>
                  <p>We locate and verify availability immediately</p>
                </div>
                <div className="step">
                  <span className="step-number">3</span>
                  <p>Professional pickup and express delivery</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
            <button className="modal-action-btn primary" onClick={() => {
              openWhatsApp();
              closeModal();
            }}>
              Start Express Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const FAQModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content faq-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="secure" size={40} />
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="modal-body">
          <div className="faq-content">
            <div className="faq-item">
              <h4>How does TUHME work?</h4>
              <p>Simply send us screenshots of items you want via WhatsApp. We'll find them, purchase them, and deliver them to you for a try-on session. You only pay for what you keep.</p>
            </div>
            
            <div className="faq-item">
              <h4>What areas do you serve?</h4>
              <p>We currently serve Manhattan and Brooklyn, with plans to expand throughout NYC and beyond.</p>
            </div>
            
            <div className="faq-item">
              <h4>How much does delivery cost?</h4>
              <p>Standard delivery is $15. Express (4-6 hours) is $25. Rush (1-2 hours) is $45.</p>
            </div>
            
            <div className="faq-item">
              <h4>What if items don't fit?</h4>
              <p>No problem! Our shopper waits while you try everything on. Return anything that doesn't work, and we'll take it back to the store.</p>
            </div>
            
            <div className="faq-item">
              <h4>How do I pay?</h4>
              <p>We accept all major credit cards via our secure Square Reader. Payment is processed only for items you decide to keep.</p>
            </div>
            
            <div className="faq-item">
              <h4>Are the items authentic?</h4>
              <p>Absolutely. We only work with authorized retailers and verified boutiques to ensure 100% authenticity.</p>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
            <button className="modal-action-btn primary" onClick={() => {
              openWhatsApp();
              closeModal();
            }}>
              Ask a Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content contact-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="professional" size={40} />
          <h2>Contact Us</h2>
        </div>

        <div className="modal-body">
          <div className="contact-content">
            <div className="contact-methods">
              <div className="contact-method">
                <TuhmeIcon type="delivery" size={24} />
                <h4>WhatsApp</h4>
                <p>For orders and quick questions</p>
                <button className="contact-btn" onClick={openWhatsApp}>
                  Message Us: +1 (646) 588-9916
                </button>
              </div>
              
              <div className="contact-method">
                <TuhmeIcon type="secure" size={24} />
                <h4>Email</h4>
                <p>For support and inquiries</p>
                <button className="contact-btn" onClick={() => window.open('mailto:support@tuhme.com', '_blank')}>
                  support@tuhme.com
                </button>
              </div>
              
              <div className="contact-method">
                <TuhmeIcon type="time" size={24} />
                <h4>Schedule Call</h4>
                <p>Book a consultation</p>
                <button className="contact-btn" onClick={openCalendar}>
                  Book Appointment
                </button>
              </div>
            </div>

            <div className="contact-info">
              <h4>Service Information</h4>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Service Area:</strong>
                  <span>Manhattan & Brooklyn, NYC</span>
                </div>
                <div className="info-item">
                  <strong>Hours:</strong>
                  <span>Monday - Sunday, 9AM - 9PM</span>
                </div>
                <div className="info-item">
                  <strong>Response Time:</strong>
                  <span>Within 15 minutes during business hours</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TrackOrderModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content track-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="delivery" size={40} />
          <h2>Track Your Order</h2>
        </div>

        <div className="modal-body">
          <div className="track-content">
            <p>Enter your phone number to track your current TUHME order in real-time.</p>
            
            <div className="track-form">
              <input 
                type="tel" 
                placeholder="Enter your phone number"
                className="track-input"
              />
              <button className="track-btn" onClick={() => {
                // Trigger track order functionality
                closeModal();
              }}>
                Track Order
              </button>
            </div>

            <div className="track-info">
              <h4>Order Status Updates</h4>
              <ul>
                <li><strong>Confirmed:</strong> We've received your order</li>
                <li><strong>Shopping:</strong> We're locating your items</li>
                <li><strong>Picked Up:</strong> Items collected from store</li>
                <li><strong>En Route:</strong> On the way to you</li>
                <li><strong>Delivered:</strong> Ready for try-on session</li>
              </ul>
            </div>

            <div className="track-support">
              <p>Need help with your order? Contact us directly:</p>
              <button className="support-btn" onClick={openWhatsApp}>
                WhatsApp Support
              </button>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const FeedbackModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content feedback-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="professional" size={40} />
          <h2>Send Feedback</h2>
        </div>

        <div className="modal-body">
          <div className="feedback-content">
            <p>We value your feedback! Help us improve our service by sharing your experience.</p>
            
            <div className="feedback-options">
              <button className="feedback-option" onClick={() => {
                window.open('mailto:feedback@tuhme.com?subject=Service Feedback', '_blank');
                closeModal();
              }}>
                <TuhmeIcon type="secure" size={24} />
                <span>Email Feedback</span>
              </button>
              
              <button className="feedback-option" onClick={() => {
                openWhatsApp();
                closeModal();
              }}>
                <TuhmeIcon type="delivery" size={24} />
                <span>WhatsApp Feedback</span>
              </button>
              
              <button className="feedback-option" onClick={() => {
                openCalendar();
                closeModal();
              }}>
                <TuhmeIcon type="time" size={24} />
                <span>Schedule Feedback Call</span>
              </button>
            </div>

            <div className="feedback-types">
              <h4>What would you like to share?</h4>
              <ul>
                <li>Service experience</li>
                <li>Product suggestions</li>
                <li>Feature requests</li>
                <li>Delivery feedback</li>
                <li>General suggestions</li>
              </ul>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const WhatsAppSupportModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content whatsapp-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="delivery" size={40} />
          <h2>WhatsApp Support</h2>
        </div>

        <div className="modal-body">
          <div className="whatsapp-content">
            <h3>Get Instant Support via WhatsApp</h3>
            <p>
              Our WhatsApp support is the fastest way to get help with orders, 
              ask questions, or start your luxury shopping experience.
            </p>
            
            <div className="whatsapp-features">
              <div className="feature">
                <TuhmeIcon type="time" size={24} />
                <h4>Instant Responses</h4>
                <p>Get answers within minutes during business hours</p>
              </div>
              
              <div className="feature">
                <TuhmeIcon type="professional" size={24} />
                <h4>Personal Assistant</h4>
                <p>Dedicated shopping assistant for your orders</p>
              </div>
              
              <div className="feature">
                <TuhmeIcon type="secure" size={24} />
                <h4>Secure Communication</h4>
                <p>Safe and private messaging for all interactions</p>
              </div>
            </div>

            <div className="whatsapp-cta">
              <button className="whatsapp-btn" onClick={() => {
                openWhatsApp();
                closeModal();
              }}>
                <TuhmeIcon type="delivery" size={20} />
                Start WhatsApp Chat
              </button>
              <p className="phone-number">+1 (646) 588-9916</p>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PrivacyModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content privacy-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="secure" size={40} />
          <h2>Privacy Policy</h2>
        </div>

        <div className="modal-body">
          <div className="legal-content">
            <div className="legal-section">
              <h4>Information We Collect</h4>
              <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
            </div>
            
            <div className="legal-section">
              <h4>How We Use Your Information</h4>
              <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
            </div>
            
            <div className="legal-section">
              <h4>Information Sharing</h4>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
            </div>
            
            <div className="legal-section">
              <h4>Data Security</h4>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </div>
            
            <div className="legal-section">
              <h4>Contact Us</h4>
              <p>If you have questions about this Privacy Policy, please contact us at privacy@tuhme.com</p>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TermsModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content terms-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="secure" size={40} />
          <h2>Terms and Conditions</h2>
        </div>

        <div className="modal-body">
          <div className="legal-content">
            <div className="legal-section">
              <h4>Service Agreement</h4>
              <p>By using TUHME's services, you agree to these terms and conditions. Our service connects you with luxury retailers in NYC.</p>
            </div>
            
            <div className="legal-section">
              <h4>Payment Terms</h4>
              <p>Payment is processed only for items you decide to keep. Delivery fees are non-refundable once service is completed.</p>
            </div>
            
            <div className="legal-section">
              <h4>Delivery and Returns</h4>
              <p>We provide try-on sessions where you can return unwanted items immediately. Our shopper will wait during your try-on period.</p>
            </div>
            
            <div className="legal-section">
              <h4>Liability</h4>
              <p>TUHME is not liable for items damaged after successful delivery and acceptance during the try-on session.</p>
            </div>
            
            <div className="legal-section">
              <h4>Service Area</h4>
              <p>Our services are currently available in Manhattan and Brooklyn, NYC. Service area subject to change.</p>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CookiesModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content cookies-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="secure" size={40} />
          <h2>Cookie Policy</h2>
        </div>

        <div className="modal-body">
          <div className="legal-content">
            <div className="legal-section">
              <h4>What Are Cookies</h4>
              <p>Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience.</p>
            </div>
            
            <div className="legal-section">
              <h4>Types of Cookies We Use</h4>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our site</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
              </ul>
            </div>
            
            <div className="legal-section">
              <h4>Managing Cookies</h4>
              <p>You can control and delete cookies through your browser settings. Note that disabling cookies may affect site functionality.</p>
            </div>
            
            <div className="legal-section">
              <h4>Third-Party Cookies</h4>
              <p>We may use third-party services that set their own cookies for analytics and functionality purposes.</p>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const RefundModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content refund-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="secure" size={40} />
          <h2>Refund Policy</h2>
        </div>

        <div className="modal-body">
          <div className="legal-content">
            <div className="legal-section">
              <h4>Try Before You Buy</h4>
              <p>Our unique service model allows you to try items before purchasing. You only pay for what you decide to keep during the try-on session.</p>
            </div>
            
            <div className="legal-section">
              <h4>Delivery Fee Policy</h4>
              <p>Delivery fees are non-refundable once our service has been completed, regardless of whether you keep any items.</p>
            </div>
            
            <div className="legal-section">
              <h4>Item Returns</h4>
              <p>Items can be returned immediately during your try-on session. Once our shopper leaves with your final selections, sales are final.</p>
            </div>
            
            <div className="legal-section">
              <h4>Damaged Items</h4>
              <p>If items arrive damaged or defective, we'll facilitate returns with the original retailer and refund your payment.</p>
            </div>
            
            <div className="legal-section">
              <h4>Exceptional Circumstances</h4>
              <p>Refunds may be considered on a case-by-case basis for exceptional circumstances. Contact our support team to discuss.</p>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn secondary" onClick={closeModal}>
              Close
            </button>
            <button className="modal-action-btn primary" onClick={() => {
              openWhatsApp();
              closeModal();
            }}>
              Contact Support
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
      {activeModal === 'tuhme-now' && <TuhmeNowModal />}
      {activeModal === 'about' && <AboutModal />}
      {activeModal === 'hiring' && <CareersModal />}
      {activeModal === 'express-orders' && <ExpressOrdersModal />}
      {activeModal === 'faq' && <FAQModal />}
      {activeModal === 'contact' && <ContactModal />}
      {activeModal === 'track' && <TrackOrderModal />}
      {activeModal === 'feedback' && <FeedbackModal />}
      {activeModal === 'whatsapp' && <WhatsAppSupportModal />}
      {activeModal === 'privacy' && <PrivacyModal />}
      {activeModal === 'terms' && <TermsModal />}
      {activeModal === 'cookies' && <CookiesModal />}
      {activeModal === 'refunds' && <RefundModal />}
    </>
  );
};

export default NavigationModals;