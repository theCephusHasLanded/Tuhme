import { useModal } from '../contexts/ModalContext';
import { useEffect, useState } from 'react';
import FeedbackModal from './FeedbackModal';

const Modal = ({ isOpen, onClose, children, title, size = 'medium' }) => {
  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-content modal-${size}`} 
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicyModal = () => {
  const { modals, closeModal } = useModal();
  
  return (
    <Modal 
      isOpen={modals.privacy} 
      onClose={() => closeModal('privacy')}
      title="Privacy Policy"
      size="large"
    >
      <div className="legal-content">
        <div className="legal-section">
          <h3>Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
          <ul>
            <li>Personal information (name, email, phone number)</li>
            <li>Delivery addresses and preferences</li>
            <li>Payment information (processed securely)</li>
            <li>Communication preferences</li>
          </ul>
        </div>

        <div className="legal-section">
          <h3>How We Use Your Information</h3>
          <p>We use the information we collect to provide, maintain, and improve our services:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about our services</li>
            <li>Provide customer support</li>
            <li>Improve our platform and user experience</li>
          </ul>
        </div>

        <div className="legal-section">
          <h3>Information Sharing</h3>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
        </div>

        <div className="legal-section">
          <h3>Data Security</h3>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        </div>

        <div className="legal-section">
          <h3>Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@tuhme.com</p>
        </div>
      </div>
    </Modal>
  );
};

const TermsModal = () => {
  const { modals, closeModal } = useModal();
  
  return (
    <Modal 
      isOpen={modals.terms} 
      onClose={() => closeModal('terms')}
      title="Terms and Conditions"
      size="large"
    >
      <div className="legal-content">
        <div className="legal-section">
          <h3>Service Agreement</h3>
          <p>By using Tuhme's services, you agree to these terms and conditions. Our service connects you with personal shoppers who source and deliver fashion items.</p>
        </div>

        <div className="legal-section">
          <h3>Service Fees</h3>
          <ul>
            <li>Starter Package: $9.99 per item (3-5 items)</li>
            <li>Popular Package: $7.99 per item (5-10 items)</li>
            <li>Premium Package: $5.99 per item (10-15 items)</li>
            <li>Tuhme Now Subscription: $49.99/month with 50% discount</li>
          </ul>
        </div>

        <div className="legal-section">
          <h3>Try-On Policy</h3>
          <p>You have 15 minutes (15-20 minutes for subscribers) to try on items. You only pay for items you decide to keep.</p>
        </div>

        <div className="legal-section">
          <h3>Service Area</h3>
          <p>Currently available in Manhattan and Brooklyn, New York. Service availability may vary by location and store hours.</p>
        </div>

        <div className="legal-section">
          <h3>Limitation of Liability</h3>
          <p>Tuhme's liability is limited to the amount paid for our service fees. We are not responsible for store policies, item availability, or third-party issues.</p>
        </div>
      </div>
    </Modal>
  );
};

const CookieModal = () => {
  const { modals, closeModal, acceptCookies } = useModal();
  
  return (
    <Modal 
      isOpen={modals.cookies} 
      onClose={() => closeModal('cookies')}
      title="Cookie Preferences"
      size="medium"
    >
      <div className="cookie-content">
        <div className="cookie-section">
          <h3>Essential Cookies</h3>
          <p>Required for the website to function properly. These cannot be disabled.</p>
          <div className="cookie-toggle">
            <span>Always Active</span>
            <div className="toggle-switch disabled">
              <div className="toggle-thumb active"></div>
            </div>
          </div>
        </div>

        <div className="cookie-section">
          <h3>Analytics Cookies</h3>
          <p>Help us understand how visitors interact with our website.</p>
          <div className="cookie-toggle">
            <span>Optional</span>
            <div className="toggle-switch">
              <div className="toggle-thumb"></div>
            </div>
          </div>
        </div>

        <div className="cookie-section">
          <h3>Marketing Cookies</h3>
          <p>Used to provide personalized advertisements and track campaign performance.</p>
          <div className="cookie-toggle">
            <span>Optional</span>
            <div className="toggle-switch">
              <div className="toggle-thumb"></div>
            </div>
          </div>
        </div>

        <div className="cookie-actions">
          <button className="cookie-accept-all" onClick={acceptCookies}>
            Accept All
          </button>
          <button className="cookie-accept-essential" onClick={() => closeModal('cookies')}>
            Essential Only
          </button>
        </div>
      </div>
    </Modal>
  );
};

const AIAgentModal = () => {
  const { modals, closeModal } = useModal();
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m Tuhme\'s AI assistant. I can help you with orders, pricing, and service questions. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickQuestions = [
    'How does pricing work?',
    'What areas do you serve?',
    'How long does delivery take?',
    'Can I cancel my order?'
  ];

  const handleSendMessage = (message = inputValue) => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, {
      type: 'user',
      content: message,
      timestamp: new Date()
    }]);

    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: getAIResponse(message),
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const getAIResponse = (question) => {
    const responses = {
      'pricing': 'Our pricing is simple: Starter (3-5 items) at $9.99/item, Popular (5-10 items) at $7.99/item, and Premium (10-15 items) at $5.99/item. We also offer Tuhme Now subscription for $49.99/month with 50% off all orders.',
      'areas': 'We currently serve Manhattan and Brooklyn. Same-day delivery is available for orders placed before 12 PM.',
      'delivery': 'Orders placed before 12 PM are delivered same-day. Orders after 12 PM arrive the next day. You get 15 minutes to try everything on.',
      'cancel': 'You can cancel your order anytime before your shopper starts shopping. Contact us via WhatsApp for fastest response.'
    };

    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('pricing') || lowerQuestion.includes('cost')) return responses.pricing;
    if (lowerQuestion.includes('area') || lowerQuestion.includes('serve')) return responses.areas;
    if (lowerQuestion.includes('delivery') || lowerQuestion.includes('time')) return responses.delivery;
    if (lowerQuestion.includes('cancel') || lowerQuestion.includes('refund')) return responses.cancel;
    
    return 'I understand you\'re asking about our service. For detailed assistance, I recommend contacting our team via WhatsApp at the number provided. They can give you personalized help with your specific needs!';
  };

  return (
    <Modal 
      isOpen={modals.aiAgent} 
      onClose={() => closeModal('aiAgent')}
      title="Tuhme AI Assistant"
      size="medium"
    >
      <div className="ai-chat">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <div className="message-content">
                {message.content}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>

        <div className="quick-questions">
          <p>Quick questions:</p>
          <div className="question-buttons">
            {quickQuestions.map((question, index) => (
              <button 
                key={index}
                className="quick-question"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={() => handleSendMessage()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
};

const CookieConsent = () => {
  const { cookieConsent, openModal, acceptCookies } = useModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!cookieConsent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [cookieConsent]);

  if (cookieConsent || !isVisible) return null;

  return (
    <div className="cookie-consent-banner">
      <div className="cookie-consent-content">
        <div className="cookie-text">
          <h4>We use cookies</h4>
          <p>We use cookies to enhance your experience and provide personalized service. Choose your preferences or accept all.</p>
        </div>
        <div className="cookie-actions">
          <button className="cookie-customize" onClick={() => openModal('cookies')}>
            Customize
          </button>
          <button className="cookie-accept" onClick={acceptCookies}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

const FeedbackModalWrapper = () => {
  const { modals, closeModal } = useModal();
  
  return modals.feedback ? (
    <FeedbackModal onClose={() => closeModal('feedback')} />
  ) : null;
};

const ModalsSystem = () => {
  return (
    <>
      <PrivacyPolicyModal />
      <TermsModal />
      <CookieModal />
      <AIAgentModal />
      <FeedbackModalWrapper />
      <CookieConsent />
    </>
  );
};

export default ModalsSystem;