import TuhmeIcon from './TuhmeIcon';

const BenefitsWidget = ({ 
  variant = "default", // default, compact, inline
  showBackground = true 
}) => {
  const benefits = [
    {
      id: 'fast',
      title: 'Fast Turnaround',
      description: 'Same-day delivery for orders placed before 12 PM',
      icon: 'time'
    },
    {
      id: 'perfect-fit',
      title: 'Perfect Fit',
      description: 'Try before you buy in your own comfortable space',
      icon: 'professional'
    },
    {
      id: 'no-risk',
      title: 'No Risk',
      description: 'Pay only for items you decide to keep',
      icon: 'secure'
    }
  ];

  return (
    <div className={`benefits-widget ${variant} ${showBackground ? 'with-background' : ''}`}>
      <div className="benefits-container">
        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="benefit-card">
              <div className="benefit-icon">
                <TuhmeIcon type={benefit.icon} size={24} />
              </div>
              <div className="benefit-content">
                <h4 className="benefit-title">{benefit.title}</h4>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {showBackground && (
          <div className="benefits-background-effect">
            <div className="gradient-mesh mesh-1"></div>
            <div className="gradient-mesh mesh-2"></div>
            <div className="gradient-mesh mesh-3"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BenefitsWidget;