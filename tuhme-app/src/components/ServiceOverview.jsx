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

      <style jsx="true">{`
        .service-overview {
          padding: var(--space-3xl) 0;
          background: var(--primary-bg);
          margin: var(--space-2xl) 0;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-lg);
        }

        .service-intro {
          text-align: center;
          margin-bottom: var(--space-3xl);
          padding: var(--space-2xl) 0;
        }

        .luxury-title {
          font-family: var(--font-family-primary);
          font-size: var(--text-4xl);
          font-weight: 700;
          color: var(--primary-text);
          margin: 0 0 var(--space-xl) 0;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .luxury-subtitle {
          font-family: var(--font-family-secondary);
          font-size: var(--text-lg);
          color: var(--tertiary-text);
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.7;
          padding: 0 var(--space-lg);
        }

        .service-features {
          margin-bottom: var(--space-3xl);
          padding: var(--space-2xl) 0;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--space-2xl);
          margin-bottom: var(--space-3xl);
        }

        .feature-card {
          background: var(--tertiary-bg);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          padding: var(--space-2xl);
          transition: all var(--transition-normal);
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .feature-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-4px);
          box-shadow: var(--shadow-strong);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: var(--accent-primary)15;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-md);
          color: var(--accent-primary);
        }

        .feature-card h3 {
          font-family: var(--font-family-primary);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--primary-text);
          margin: 0 0 var(--space-md) 0;
          line-height: 1.3;
        }

        .feature-card p {
          font-family: var(--font-family-secondary);
          font-size: var(--text-base);
          color: var(--secondary-text);
          line-height: 1.6;
          margin: 0;
        }

        .lifestyle-section {
          background: var(--secondary-bg);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: var(--space-3xl);
          margin-top: var(--space-3xl);
        }

        .lifestyle-content h3 {
          font-family: var(--font-family-primary);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--primary-text);
          text-align: center;
          margin: 0 0 var(--space-2xl) 0;
          line-height: 1.2;
        }

        .lifestyle-scenarios {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-2xl);
        }

        .scenario {
          display: flex;
          align-items: flex-start;
          gap: var(--space-lg);
          padding: var(--space-xl);
          background: var(--tertiary-bg);
          border: 1px solid var(--border-light);
          border-radius: 12px;
          transition: all var(--transition-normal);
        }

        .scenario:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }

        .scenario-icon {
          width: 48px;
          height: 48px;
          background: var(--accent-primary)20;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--accent-primary);
        }

        .scenario-text {
          flex: 1;
        }

        .scenario-text h4 {
          font-family: var(--font-family-primary);
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--primary-text);
          margin: 0 0 var(--space-sm) 0;
          line-height: 1.3;
        }

        .scenario-text p {
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          color: var(--secondary-text);
          line-height: 1.5;
          margin: 0;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .service-overview {
            padding: var(--space-2xl) 0;
            margin: var(--space-xl) 0;
          }

          .container {
            padding: 0 var(--space-md);
          }

          .service-intro {
            padding: var(--space-xl) 0;
            margin-bottom: var(--space-2xl);
          }

          .luxury-title {
            font-size: var(--text-3xl);
          }

          .luxury-subtitle {
            font-size: var(--text-base);
            padding: 0 var(--space-sm);
          }

          .feature-grid {
            grid-template-columns: 1fr;
            gap: var(--space-xl);
          }

          .feature-card {
            padding: var(--space-xl);
          }

          .lifestyle-section {
            padding: var(--space-2xl);
          }

          .lifestyle-content h3 {
            font-size: var(--text-2xl);
            margin-bottom: var(--space-xl);
          }

          .lifestyle-scenarios {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }

          .scenario {
            padding: var(--space-lg);
          }
        }

        @media (max-width: 480px) {
          .service-overview {
            padding: var(--space-xl) 0;
          }

          .container {
            padding: 0 var(--space-sm);
          }

          .feature-card {
            padding: var(--space-lg);
            gap: var(--space-md);
          }

          .feature-icon {
            width: 48px;
            height: 48px;
          }

          .lifestyle-section {
            padding: var(--space-xl);
          }

          .scenario {
            flex-direction: column;
            text-align: center;
            gap: var(--space-md);
            padding: var(--space-md);
          }

          .scenario-icon {
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};

export default ServiceOverview;