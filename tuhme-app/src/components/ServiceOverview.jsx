import TuhmeIcon from './TuhmeIcon';

const ServiceOverview = () => {
  return (
    <section className="service-overview luxury-section">
      <div className="container">
        <div className="service-intro luxury-section-header">
          <h2 className="luxury-title">Shop From Any Store, Without The Stress</h2>
          <p className="luxury-subtitle">
            Whether it's that exclusive boutique you've been eyeing or a prestigious department store, 
            we bring the entire shopping experience to your doorstep. No crowds, no pressure, 
            no carrying bags - just pure convenience and sophistication.
          </p>
        </div>

        <div className="service-features">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon"><TuhmeIcon type="shopping" size={40} /></div>
              <h3>Any Local Store</h3>
              <p>
                From luxury boutiques to department stores, if it's in Manhattan or Brooklyn, 
                we can shop it for you. Even stores not on our partner list.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><TuhmeIcon type="delivery" size={40} /></div>
              <h3>Screenshot & Send</h3>
              <p>
                Simply take screenshots of items you want from websites, Instagram, 
                or any social media and send them to us via WhatsApp.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><TuhmeIcon type="home" size={40} /></div>
              <h3>Home Try-On</h3>
              <p>
                Our shopper brings items directly to you. Try everything on in the 
                comfort of your own space with perfect lighting and your full wardrobe.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><TuhmeIcon type="payment" size={40} /></div>
              <h3>Pay For Keeps Only</h3>
              <p>
                Love it? Keep it and pay with our secure Square reader. Don't love it? 
                No problem - we'll take it right back to the store.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><TuhmeIcon type="express" size={40} /></div>
              <h3>Same-Day Service</h3>
              <p>
                Order before 12 PM and receive your items the same day. Need it faster? 
                Express service available for urgent fashion emergencies.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><TuhmeIcon type="secure" size={40} /></div>
              <h3>Secure & Safe</h3>
              <p>
                Contactless delivery options, secure payment processing, and verified 
                professional shoppers you can trust with your fashion choices.
              </p>
            </div>
          </div>
        </div>

        <div className="lifestyle-section">
          <div className="lifestyle-content">
            <h3>Perfect For Busy Professionals</h3>
            <div className="lifestyle-scenarios">
              <div className="scenario">
                <span className="scenario-icon"><TuhmeIcon type="professional" size={36} /></span>
                <div className="scenario-text">
                  <h4>Last-Minute Events</h4>
                  <p>Need an outfit for tonight's dinner? We've got you covered.</p>
                </div>
              </div>
              <div className="scenario">
                <span className="scenario-icon"><TuhmeIcon type="fit" size={36} /></span>
                <div className="scenario-text">
                  <h4>Perfect Fit Guarantee</h4>
                  <p>Try before you buy ensures every purchase is exactly right.</p>
                </div>
              </div>
              <div className="scenario">
                <span className="scenario-icon"><TuhmeIcon type="time" size={36} /></span>
                <div className="scenario-text">
                  <h4>Time Is Precious</h4>
                  <p>Skip the travel, parking, and crowds. We bring the store to you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;