import TuhmeIcon from './TuhmeIcon';
import CallToActionWidget from './CallToActionWidget';
import BenefitsWidget from './BenefitsWidget';
import CompactStoreSearch from './CompactStoreSearch';
import HorizontalStoreCarousel from './HorizontalStoreCarousel';

const HowItWorks = () => {
  const getIconComponent = (iconType) => {
    return <TuhmeIcon type={iconType} size={32} />;
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
    <section className="how-it-works luxury-section">
      <div className="container">
        <div className="luxury-section-header">
          <h2 className="luxury-title">How Tuhme Works</h2>
          <p className="luxury-subtitle">
            From discovery to doorstep delivery in 7 simple steps
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.number} className="step-card">
              <div className="step-background-number">{step.number}</div>
              <div className="step-corner-icon">{getIconComponent(step.icon)}</div>
              
              <div className="step-content">
                <h3>{step.title}</h3>
                <p className="step-description">{step.description}</p>
                <span className="step-details">{step.details}</span>
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

        {/* Store Search and Carousel */}
        <CompactStoreSearch />
        <HorizontalStoreCarousel />

        <CallToActionWidget />

        <BenefitsWidget showBackground={true} />
      </div>
    </section>
  );
};

export default HowItWorks;