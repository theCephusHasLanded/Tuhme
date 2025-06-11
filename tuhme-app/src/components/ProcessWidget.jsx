import TuhmeIcon from './TuhmeIcon';

const ProcessWidget = ({ variant = "default" }) => {
  const processSteps = [
    {
      id: 'tryOn',
      title: '15-Minute Try-On',
      description: 'Our shopper waits outside while you take your time trying on items in the comfort of your own space.',
      icon: 'time'
    },
    {
      id: 'payKeeps',
      title: 'Pay For Keeps Only',
      description: 'Love it? Pay with our secure Square reader. Don\'t love it? We take it back to the store - no questions asked.',
      icon: 'secure'
    },
    {
      id: 'securePayment',
      title: 'Secure Payment',
      description: 'Square Reader accepts chip cards, contactless cards, Apple Pay, and Google Pay for safe transactions.',
      icon: 'professional'
    }
  ];

  return (
    <div className={`process-widget ${variant}`}>
      <div className="process-container">
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <div key={step.id} className="process-card">
              <div className="process-icon">
                <TuhmeIcon type={step.icon} size={32} />
              </div>
              <div className="process-content">
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
              </div>
              <div className="process-number">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessWidget;