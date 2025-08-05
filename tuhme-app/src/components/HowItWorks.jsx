import TuhmeIcon from './TuhmeIcon';
import CallToActionWidget from './CallToActionWidget';
import BenefitsWidget from './BenefitsWidget';


const HowItWorks = () => {
  const getIconComponent = (iconType) => {
    return <TuhmeIcon type={iconType} size={24} />;
  };

  const steps = [
    {
      number: 1,
      title: "Shop at your favorite local store or boutique",
      description: "Browse online or visit stores virtually through their websites, Instagram, or any platform you prefer.",
      icon: "shopping",
      details: "Manhattan & Brooklyn stores available"
    },
    {
      number: 2,
      title: "Take screenshots of desired items",
      description: "Capture images of anything that catches your eye - from product pages, social media, or store websites.",
      icon: "delivery",
      details: "Any source works: websites, Instagram, Pinterest"
    },
    {
      number: 3,
      title: "Send screenshots via WhatsApp",
      description: "Forward your screenshots to our dedicated WhatsApp number with any specific preferences or notes.",
      icon: "delivery",
      details: "Instant messaging for quick communication"
    },
    {
      number: 4,
      title: "Customer service contacts you",
      description: "Our team reaches out within minutes to confirm availability, sizes, and any special requests you might have.",
      icon: "professional",
      details: "Personal shopper assigned to your order"
    },
    {
      number: 5,
      title: "Tuhme shopper delivers items to your location",
      description: "Your dedicated shopper collects the items and brings them directly to your door within hours.",
      icon: "delivery",
      details: "Same-day delivery available"
    },
    {
      number: 6,
      title: "Try on items; return any you don't want",
      description: "Take 15 minutes to try everything on in your own space. Our shopper waits while you decide.",
      icon: "shopping",
      details: "No pressure, perfect lighting, your mirrors"
    },
    {
      number: 7,
      title: "Pay for what you keep using Square Reader",
      description: "Secure payment for only the items you love. Returns go back to the store immediately.",
      icon: "secure",
      details: "Contactless payment, instant returns"
    }
  ];


  return (
    <section className="luxury-section" style={{
      backgroundImage: `
        linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%),
        url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')
      `,
      backgroundBlendMode: 'overlay, normal',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">How Tuhme Works</h2>
          <p className="section-subtitle">
            From discovery to doorstep delivery in 7 simple steps
          </p>
        </div>

        <div className="luxury-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
          {steps.map((step, index) => (
            <div key={step.number} className="luxury-card luxury-animate-fade" style={{ textAlign: 'center' }}>
              <div className="luxury-feature-icon" style={{ margin: '0 auto var(--space-4) auto', fontSize: '2rem', fontWeight: 'var(--weight-bold)' }}>
                {step.number}
              </div>
              
              <div className="step-content">
                <h3 className="luxury-card-title">{step.title}</h3>
                <p className="luxury-card-description">{step.description}</p>
                <span style={{ 
                  fontSize: 'var(--text-sm)', 
                  color: 'var(--theme-accent)', 
                  fontWeight: 'var(--weight-medium)',
                  display: 'block',
                  marginTop: 'var(--space-3)'
                }}>{step.details}</span>
              </div>

              {index < steps.length - 1 && (
                <div className="step-connector">
                  <div className="connector-line"></div>
                  <div className="connector-arrow">→</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <CallToActionWidget />

        <BenefitsWidget showBackground={true} />
      </div>
    </section>
  );
};

export default HowItWorks;