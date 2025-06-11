import { useState } from 'react';
import TuhmeIcon from './TuhmeIcon';

const GetInTouchModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('contact'); // contact, form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate WhatsApp message for contact
    const message = encodeURIComponent(
      `New Contact Form Submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    );
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const isFormValid = () => {
    return formData.name && formData.email && formData.phone && formData.message;
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setActiveTab('contact');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content get-in-touch-modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={handleClose}>×</button>
          
          <div className="success-content">
            <div className="success-icon">
              <TuhmeIcon type="secure" size={48} />
            </div>
            <h2 className="success-title">Thank You!</h2>
            <p className="success-message">
              We've received your message and will get back to you within 24 hours.
            </p>
            <div className="success-actions">
              <button className="success-button primary" onClick={resetForm}>
                Send Another Message
              </button>
              <button className="success-button secondary" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content get-in-touch-modal large" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="professional" size={40} />
          <h2>Get In Touch</h2>
          <p>Have questions about our service? Want to partner with us? We'd love to hear from you.</p>
        </div>

        <div className="modal-tabs">
          <button 
            className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <TuhmeIcon type="delivery" size={16} />
            Contact Info
          </button>
          <button 
            className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            <TuhmeIcon type="professional" size={16} />
            Send Message
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'contact' && (
            <div className="contact-tab">
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <TuhmeIcon type="delivery" size={24} />
                  </div>
                  <div className="method-content">
                    <h4>WhatsApp</h4>
                    <p>Fastest response for orders and quick questions</p>
                    <a 
                      href="https://wa.me/16465889916" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      Message us now
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <TuhmeIcon type="secure" size={24} />
                  </div>
                  <div className="method-content">
                    <h4>Email</h4>
                    <p>For partnerships, press inquiries, and detailed questions</p>
                    <a href="mailto:hello@tuhme.com" className="contact-link">
                      hello@tuhme.com
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <TuhmeIcon type="shopping" size={24} />
                  </div>
                  <div className="method-content">
                    <h4>Service Area</h4>
                    <p>Currently serving Manhattan and Brooklyn</p>
                    <span className="service-note">Expanding to more NYC areas soon</span>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h4>Quick Actions</h4>
                <div className="action-buttons">
                  <button 
                    className="action-button"
                    onClick={() => {
                      handleClose();
                      const element = document.getElementById('pricing');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <TuhmeIcon type="shopping" size={16} />
                    View Pricing
                  </button>
                  <button 
                    className="action-button"
                    onClick={() => {
                      handleClose();
                      const element = document.getElementById('how-it-works');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <TuhmeIcon type="professional" size={16} />
                    How It Works
                  </button>
                  <a 
                    href="https://wa.me/16465889916?text=Hi!%20I%20have%20a%20question%20about%20Tuhme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button primary"
                  >
                    <TuhmeIcon type="delivery" size={16} />
                    Ask a Question
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'form' && (
            <div className="form-tab">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <div className="input-container">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="input-border"></div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <div className="input-container">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="input-border"></div>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <div className="input-container">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="input-border"></div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <div className="select-container">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a topic</option>
                        <option value="General Question">General Question</option>
                        <option value="Order Support">Order Support</option>
                        <option value="Partnership">Partnership Inquiry</option>
                        <option value="Press">Press & Media</option>
                        <option value="Careers">Careers</option>
                        <option value="Feedback">Feedback</option>
                      </select>
                      <div className="select-border"></div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <div className="textarea-container">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                    <div className="textarea-border"></div>
                  </div>
                </div>

                <div className="form-footer">
                  <div className="recaptcha-notice">
                    <p>This form is protected by reCAPTCHA and the Google 
                      <a href="#" target="_blank" rel="noopener noreferrer"> Privacy Policy</a> and 
                      <a href="#" target="_blank" rel="noopener noreferrer"> Terms of Service</a> apply.
                    </p>
                  </div>

                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={!isFormValid() || isSubmitting}
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <TuhmeIcon type="delivery" size={16} />
                    <div className="button-shine"></div>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetInTouchModal;