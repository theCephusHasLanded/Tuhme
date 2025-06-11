import TuhmeIcon from './TuhmeIcon';

const DeliveryWidget = ({ variant = "default" }) => {
  const deliveryOptions = [
    {
      id: 'sameDay',
      title: 'Same-Day Delivery',
      subtitle: 'Orders placed before 12:00 PM',
      time: 'Delivered same day',
      icon: 'time'
    },
    {
      id: 'nextDay',
      title: 'Next-Day Delivery',
      subtitle: 'Orders placed after 12:00 PM',
      time: 'Delivered next day',
      icon: 'delivery'
    },
    {
      id: 'weekend',
      title: 'Weekend Delivery',
      subtitle: 'Available if stores are open',
      time: 'Saturday & Sunday',
      icon: 'shopping'
    },
    {
      id: 'express',
      title: 'Express Service',
      subtitle: 'Rush orders when needed',
      time: '2-4 hours',
      icon: 'professional'
    }
  ];

  const serviceAreas = [
    {
      id: 'manhattan',
      name: 'Manhattan',
      coverage: 'Complete coverage',
      neighborhoods: [
        'Upper East Side',
        'Upper West Side',
        'Midtown',
        'Lower Manhattan',
        'Chelsea & Village',
        'And all neighborhoods'
      ],
      icon: 'shopping'
    },
    {
      id: 'brooklyn',
      name: 'Brooklyn',
      coverage: 'Select neighborhoods',
      neighborhoods: [
        'Williamsburg',
        'DUMBO',
        'Brooklyn Heights',
        'Park Slope',
        'Fort Greene',
        'And expanding...'
      ],
      icon: 'delivery'
    }
  ];

  return (
    <div className={`delivery-widget ${variant}`}>
      <div className="delivery-container">
        <div className="delivery-header">
          <h2 className="delivery-title">Delivery Information</h2>
          <p className="delivery-subtitle">
            Fast, reliable delivery throughout Manhattan and Brooklyn
          </p>
        </div>

        <div className="delivery-section">
          <h3 className="section-title">Delivery Windows</h3>
          <div className="delivery-options">
            {deliveryOptions.map((option) => (
              <div key={option.id} className="delivery-option">
                <div className="option-icon">
                  <TuhmeIcon type={option.icon} size={24} />
                </div>
                <div className="option-content">
                  <h4 className="option-title">{option.title}</h4>
                  <p className="option-subtitle">{option.subtitle}</p>
                  <span className="option-time">{option.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="service-section">
          <h3 className="section-title">Service Area</h3>
          <div className="service-areas">
            {serviceAreas.map((area) => (
              <div key={area.id} className="area-card">
                <div className="area-header">
                  <div className="area-icon">
                    <TuhmeIcon type={area.icon} size={28} />
                  </div>
                  <div className="area-info">
                    <h4 className="area-name">{area.name}</h4>
                    <p className="area-coverage">{area.coverage}</p>
                  </div>
                </div>
                <div className="area-neighborhoods">
                  {area.neighborhoods.map((neighborhood, index) => (
                    <span key={index} className="neighborhood-tag">
                      {neighborhood}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="delivery-background">
          <div className="gradient-mesh mesh-1"></div>
          <div className="gradient-mesh mesh-2"></div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryWidget;