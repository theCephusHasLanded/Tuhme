import { useState } from 'react';
import TuhmeIcon from './TuhmeIcon';

const InteractiveInfoSection = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const faqData = [
    {
      id: 'fit',
      question: 'What if items don\'t fit?',
      answer: 'No problem! We return anything you don\'t want directly to the store. You only pay for what you keep.',
      icon: 'fit'
    },
    {
      id: 'delivery-time',
      question: 'How long does delivery take?',
      answer: 'Orders placed before 12 PM are delivered same-day. Orders after 12 PM arrive the next day.',
      icon: 'time'
    },
    {
      id: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We use Square Reader for secure payments: chip cards, contactless cards, Apple Pay, and Google Pay.',
      icon: 'payment'
    },
    {
      id: 'any-store',
      question: 'Can I order from any store?',
      answer: 'Yes! Any local store in Manhattan or Brooklyn, even if they\'re not on our partner list.',
      icon: 'shopping'
    }
  ];

  const deliveryData = [
    {
      id: 'same-day',
      title: 'Same-Day Delivery',
      subtitle: 'Orders placed before 12:00 PM',
      description: 'Delivered same day',
      icon: 'express'
    },
    {
      id: 'next-day',
      title: 'Next-Day Delivery',
      subtitle: 'Orders placed after 12:00 PM',
      description: 'Delivered next day',
      icon: 'delivery'
    },
    {
      id: 'weekend',
      title: 'Weekend Delivery',
      subtitle: 'Available if stores are open',
      description: 'Saturday & Sunday',
      icon: 'weekend'
    },
    {
      id: 'express',
      title: 'Express Service',
      subtitle: 'Rush orders when needed',
      description: '2-4 hours',
      icon: 'time'
    }
  ];

  const serviceAreas = [
    {
      id: 'manhattan',
      title: 'Manhattan',
      subtitle: 'Complete coverage',
      areas: [
        'Upper East Side',
        'Upper West Side',
        'Midtown',
        'Lower Manhattan',
        'Chelsea & Village',
        'And all neighborhoods'
      ]
    },
    {
      id: 'brooklyn',
      title: 'Brooklyn',
      subtitle: 'Select neighborhoods',
      areas: [
        'Williamsburg',
        'DUMBO',
        'Brooklyn Heights',
        'Park Slope',
        'Fort Greene',
        'And expanding...'
      ]
    }
  ];

  return (
    <section className="interactive-info-section">
      <div className="info-container">
        
        {/* Common Questions Section */}
        <div className="info-category">
          <div className="category-header">
            <h2>Common Questions</h2>
            <p>Quick answers to help you get started</p>
          </div>
          
          <div className="faq-accordion">
            {faqData.map((faq) => (
              <div key={faq.id} className={`faq-item ${activeSection === faq.id ? 'active' : ''}`}>
                <button 
                  className="faq-question"
                  onClick={() => toggleSection(faq.id)}
                  aria-expanded={activeSection === faq.id}
                >
                  <div className="question-content">
                    <TuhmeIcon type={faq.icon} size={20} />
                    <span>{faq.question}</span>
                  </div>
                  <div className="expand-icon">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      className={activeSection === faq.id ? 'rotated' : ''}
                    >
                      <path 
                        d="M6 9l6 6 6-6" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
                
                <div className={`faq-answer ${activeSection === faq.id ? 'expanded' : ''}`}>
                  <div className="answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Information Section */}
        <div className="info-category">
          <div className="category-header">
            <h2>Delivery Information</h2>
            <p>Fast, reliable delivery throughout Manhattan and Brooklyn</p>
          </div>
          
          <div className="delivery-windows">
            <h3>Delivery Windows</h3>
            <div className="delivery-grid">
              {deliveryData.map((delivery) => (
                <div 
                  key={delivery.id} 
                  className={`delivery-card ${activeSection === delivery.id ? 'active' : ''}`}
                  onClick={() => toggleSection(delivery.id)}
                >
                  <div className="delivery-icon">
                    <TuhmeIcon type={delivery.icon} size={24} />
                  </div>
                  <div className="delivery-info">
                    <h4>{delivery.title}</h4>
                    <p className="delivery-subtitle">{delivery.subtitle}</p>
                    <p className="delivery-description">{delivery.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="service-areas">
            <h3>Service Area</h3>
            <div className="areas-grid">
              {serviceAreas.map((area) => (
                <div 
                  key={area.id} 
                  className={`area-card ${activeSection === area.id ? 'active' : ''}`}
                  onClick={() => toggleSection(area.id)}
                >
                  <div className="area-header">
                    <h4>{area.title}</h4>
                    <p>{area.subtitle}</p>
                  </div>
                  
                  <div className={`area-details ${activeSection === area.id ? 'expanded' : ''}`}>
                    <ul>
                      {area.areas.map((neighborhood, index) => (
                        <li key={index}>{neighborhood}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="expand-indicator">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      className={activeSection === area.id ? 'rotated' : ''}
                    >
                      <path 
                        d="M6 9l6 6 6-6" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveInfoSection;