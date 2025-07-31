import TuhmeIcon from './TuhmeIcon';

const ServiceOverview = () => {
  return (
    <section className="luxury-section">
      <div className="container">
        <div className="service-intro">
          <h2 className="section-title">Shop From Any Store</h2>
          <p className="section-subtitle">
            Whether it's that exclusive boutique you've been eyeing or a prestigious department store, 
            we bring the entire shopping experience to your doorstep. Pure convenience and sophistication 
            delivered right to your door.
          </p>
        </div>

        <div className="service-features">
          <div className="luxury-grid luxury-grid-3">
            <div className="luxury-card">
              <div className="luxury-feature-icon"><TuhmeIcon type="shopping" size={24} /></div>
              <h3 className="luxury-card-title">Any Local Store</h3>
              <p className="luxury-card-description">
                From luxury boutiques to department stores, if it's in Manhattan or Brooklyn, 
                we can shop it for you. Even stores not on our partner list.
              </p>
            </div>

            <div className="luxury-card">
              <div className="luxury-feature-icon"><TuhmeIcon type="delivery" size={24} /></div>
              <h3 className="luxury-card-title">Screenshot & Send</h3>
              <p className="luxury-card-description">
                Simply take screenshots of items you want from websites, Instagram, 
                or any social media and send them to us via WhatsApp.
              </p>
            </div>

            <div className="luxury-card">
              <div className="luxury-feature-icon"><TuhmeIcon type="home" size={24} /></div>
              <h3 className="luxury-card-title">Home Try-On</h3>
              <p className="luxury-card-description">
                Our shopper brings items directly to you. Try everything on in the 
                comfort of your own space with perfect lighting and your full wardrobe.
              </p>
            </div>

            <div className="luxury-card">
              <div className="luxury-feature-icon"><TuhmeIcon type="payment" size={24} /></div>
              <h3 className="luxury-card-title">Pay For Keeps Only</h3>
              <p className="luxury-card-description">
                Love it? Keep it and pay with our secure Square reader. Don't love it? 
                No problem - we'll take it right back to the store.
              </p>
            </div>

            <div className="luxury-card">
              <div className="luxury-feature-icon"><TuhmeIcon type="express" size={24} /></div>
              <h3 className="luxury-card-title">Same-Day Service</h3>
              <p className="luxury-card-description">
                Order before 12 PM and receive your items the same day. Need it faster? 
                Express service available for urgent fashion emergencies.
              </p>
            </div>

            <div className="luxury-card">
              <div className="luxury-feature-icon"><TuhmeIcon type="secure" size={24} /></div>
              <h3 className="luxury-card-title">Secure & Safe</h3>
              <p className="luxury-card-description">
                Contactless delivery options, secure payment processing, and verified 
                professional shoppers you can trust with your fashion choices.
              </p>
            </div>
          </div>
        </div>

        <div className="lifestyle-section" style={{ marginTop: 'var(--space-16)' }}>
          <h3 className="section-title" style={{ fontSize: 'var(--text-2xl)', textAlign: 'center' }}>Perfect For Busy Professionals</h3>
          <div className="luxury-grid luxury-grid-3">
            <div className="luxury-feature luxury-animate-fade">
              <div className="luxury-feature-icon"><TuhmeIcon type="professional" size={24} /></div>
              <div className="luxury-feature-content">
                <h3>Last-Minute Events</h3>
                <p>Need an outfit for tonight's dinner? We've got you covered.</p>
              </div>
            </div>
            <div className="luxury-feature luxury-animate-fade">
              <div className="luxury-feature-icon"><TuhmeIcon type="fit" size={24} /></div>
              <div className="luxury-feature-content">
                <h3>Perfect Fit Guarantee</h3>
                <p>Try before you buy ensures every purchase is exactly right.</p>
              </div>
            </div>
            <div className="luxury-feature luxury-animate-fade">
              <div className="luxury-feature-icon"><TuhmeIcon type="time" size={24} /></div>
              <div className="luxury-feature-content">
                <h3>Time Is Precious</h3>
                <p>Skip the travel, parking, and crowds. We bring the store to you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;