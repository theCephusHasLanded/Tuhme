import { useState } from 'react';
import TuhmeIcon from './TuhmeIcon';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`TUHME Feedback: ${formData.subject}`);
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Feedback Type: ${formData.type}

Message:
${formData.message}

---
Sent from TUHME Feedback Form
      `);
      
      const mailtoLink = `mailto:support@tuhme.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content feedback-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <TuhmeIcon type="professional" size={40} />
          <h2>Send Feedback</h2>
          <p>We'd love to hear from you! Your feedback helps us improve.</p>
        </div>

        <div className="modal-body">
          {submitStatus === 'success' ? (
            <div className="feedback-success">
              <TuhmeIcon type="secure" size={48} />
              <h3>Thank you!</h3>
              <p>Your feedback has been prepared for sending. Please send the email that opened in your email client.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="feedback-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="type">Feedback Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="general">General Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="complaint">Complaint</option>
                  <option value="compliment">Compliment</option>
                  <option value="partnership">Partnership Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Brief summary of your feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  rows="5"
                  placeholder="Please share your detailed feedback here..."
                />
              </div>

              <div className="feedback-contact-info">
                <h4>Direct Contact</h4>
                <p>You can also reach us directly at:</p>
                <a href="mailto:support@tuhme.com" className="contact-email">
                  <TuhmeIcon type="delivery" size={16} />
                  support@tuhme.com
                </a>
              </div>
            </form>
          )}
        </div>

        <div className="modal-actions">
          <button 
            type="button" 
            className="modal-action-btn secondary" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          {submitStatus !== 'success' && (
            <button 
              type="submit" 
              className="modal-action-btn primary"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
            >
              {isSubmitting ? 'Preparing...' : 'Send Feedback'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;