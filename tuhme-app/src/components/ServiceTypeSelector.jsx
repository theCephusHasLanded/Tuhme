import { useState } from 'react';

const ServiceTypeSelector = ({ onNext, onDataUpdate, data }) => {
  const [selectedService, setSelectedService] = useState(data.serviceType || '');

  const serviceOptions = [
    {
      id: 'pickup',
      title: 'Pickup & Tailor',
      subtitle: 'We collect your items',
      description: 'Have items that need tailoring? We\'ll pick them up from your location and return them perfectly fitted.',
      icon: '👔',
      features: ['Same-day pickup available', 'Expert alterations', 'Contactless collection']
    },
    {
      id: 'sourcing',
      title: 'Source & Deliver',
      subtitle: 'We find and deliver',
      description: 'Looking for specific pieces? Share images or links and we\'ll source luxury items for you.',
      icon: '🛍️',
      features: ['Luxury brand sourcing', 'Authentication guaranteed', 'Custom tailoring included']
    }
  ];

  const handleServiceSelect = (serviceType) => {
    setSelectedService(serviceType);
    onDataUpdate({ serviceType });
  };

  const handleNext = () => {
    if (selectedService) {
      onNext();
    }
  };

  return (
    <div className="service-type-section">
      <h2>How can we help you today?</h2>
      <p className="section-description">
        Choose the service that best fits your needs
      </p>

      <div className="service-options">
        {serviceOptions.map(service => (
          <div 
            key={service.id}
            className={`service-option ${selectedService === service.id ? 'selected' : ''}`}
            onClick={() => handleServiceSelect(service.id)}
          >
            <div className="service-header">
              <div className="service-icon">{service.icon}</div>
              <div className="service-info">
                <h3>{service.title}</h3>
                <p className="service-subtitle">{service.subtitle}</p>
              </div>
              <div className="selection-indicator">
                <div className="radio-button"></div>
              </div>
            </div>
            
            <p className="service-description">{service.description}</p>
            
            <ul className="service-features">
              {service.features.map((feature, index) => (
                <li key={index}>
                  <span className="feature-check">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="service-info-cards">
        <div className="info-card">
          <h4>Service Areas</h4>
          <p>Manhattan & Brooklyn</p>
        </div>
        <div className="info-card">
          <h4>Turnaround</h4>
          <p>24-48 hours typical</p>
        </div>
        <div className="info-card">
          <h4>Payment</h4>
          <p>Square card reader on delivery</p>
        </div>
      </div>

      <div className="form-navigation">
        <button 
          className="next-button"
          onClick={handleNext}
          disabled={!selectedService}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ServiceTypeSelector;