import { useState } from 'react';
import TuhmeIcon from './TuhmeIcon';

const FAQWidget = ({ variant = "default", title = "Common Questions" }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const defaultFAQs = [
    {
      id: 'fit',
      question: 'What if items don\'t fit?',
      answer: 'No problem! We return anything you don\'t want directly to the store. You only pay for what you keep.'
    },
    {
      id: 'delivery',
      question: 'How long does delivery take?',
      answer: 'Orders placed before 12 PM are delivered same-day. Orders after 12 PM arrive the next day.'
    },
    {
      id: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We use Square Reader for secure payments: chip cards, contactless cards, Apple Pay, and Google Pay.'
    },
    {
      id: 'stores',
      question: 'Can I order from any store?',
      answer: 'Yes! Any local store in Manhattan or Brooklyn, even if they\'re not on our partner list.'
    }
  ];

  const deliveryFAQs = [
    {
      id: 'not-home',
      question: 'What if I\'m not home?',
      answer: 'We can coordinate with doormen, schedule for your availability, or offer contactless delivery options.'
    },
    {
      id: 'wait-time',
      question: 'How long do shoppers wait?',
      answer: 'Standard 15 minutes, extended to 15-20 minutes for Tuhme Now subscribers.'
    },
    {
      id: 'weather',
      question: 'What about bad weather?',
      answer: 'We deliver in all weather conditions with appropriate protection for your items.'
    },
    {
      id: 'reschedule',
      question: 'Can I reschedule delivery?',
      answer: 'Yes! Contact us via WhatsApp to reschedule up to 2 hours before your delivery window.'
    }
  ];

  const faqItems = variant === 'delivery' ? deliveryFAQs : defaultFAQs;

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className={`faq-widget ${variant}`}>
      <div className="faq-container">
        <div className="faq-header">
          <h3 className="faq-title">{title}</h3>
        </div>

        <div className="faq-list">
          {faqItems.map((item) => (
            <div 
              key={item.id} 
              className={`faq-item ${expandedFAQ === item.id ? 'expanded' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(item.id)}
              >
                <span className="question-text">{item.question}</span>
                <div className="question-icon">
                  <TuhmeIcon 
                    type={expandedFAQ === item.id ? "delivery" : "shopping"} 
                    size={16} 
                  />
                </div>
              </button>
              
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQWidget;