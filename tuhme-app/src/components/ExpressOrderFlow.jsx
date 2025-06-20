import { useState } from 'react';
import Footer from './Footer';
import TuhmeIcon from './TuhmeIcon';
import SaviAssistant from './SaviAssistant';
import '../styles/validation-modal.css';

const ExpressOrderFlow = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [orderData, setOrderData] = useState({
    packageSize: '',
    items: [],
    itemDetails: [], // Track individual item details
    preferences: '',
    deliveryTime: '',
    contactInfo: {
      name: '',
      phone: '',
      email: '',
      address: ''
    },
    membershipStatus: 'guest' // guest, member, premium
  });
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const steps = ['Package', 'Preferences', 'Contact', 'Review'];
  
  const packageOptions = [
    {
      id: 'starter',
      name: 'Starter',
      items: '3-5 items',
      price: '$9.99/item',
      total: '$29.97-$49.95',
      icon: 'shopping'
    },
    {
      id: 'popular',
      name: 'Popular',
      items: '5-10 items',
      price: '$7.99/item',
      total: '$39.95-$79.90',
      icon: 'event',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      items: '10-15 items',
      price: '$5.99/item',
      total: '$59.90-$89.85',
      icon: 'professional'
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Ensure we scroll to the very top of the express order app
      const expressOrderApp = document.querySelector('.express-order-app');
      if (expressOrderApp) {
        expressOrderApp.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Ensure we scroll to the very top of the express order app
      const expressOrderApp = document.querySelector('.express-order-app');
      if (expressOrderApp) {
        expressOrderApp.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setOrderData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setOrderData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Set reasonable upload limit
  const getMaxItems = () => {
    return 8;
  };

  const getUploadLimitClass = () => {
    const ratio = orderData.items.length / getMaxItems();
    if (ratio >= 1) return 'limit-reached';
    if (ratio >= 0.8) return 'limit-warning';
    return 'limit-safe';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 10 * 1024 * 1024;
    const validFiles = [];
    const errors = [];

    files.forEach(file => {
      if (file.size > maxFileSize) {
        errors.push(`${file.name} is too large (max 10MB)`);
        return;
      }
      
      if (orderData.items.length + validFiles.length >= getMaxItems()) {
        errors.push('Maximum items reached');
        return;
      }
      
      validFiles.push(file);
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    if (validFiles.length > 0) {
      const newItems = [...orderData.items, ...validFiles];
      const newItemDetails = [...orderData.itemDetails];
      
      validFiles.forEach(() => {
        newItemDetails.push({ size: '', color: '', notes: '', itemLink: '', priority: 'normal' });
      });
      
      setOrderData(prev => ({
        ...prev,
        items: newItems,
        itemDetails: newItemDetails
      }));
    }
  };

  const removeItem = (index) => {
    const newItems = orderData.items.filter((_, i) => i !== index);
    const newItemDetails = orderData.itemDetails.filter((_, i) => i !== index);
    
    setOrderData(prev => ({
      ...prev,
      items: newItems,
      itemDetails: newItemDetails
    }));
  };

  const openItemDetailsModal = (index) => {
    const size = prompt('What size are you looking for?', orderData.itemDetails[index]?.size || '');
    const color = prompt('Preferred color?', orderData.itemDetails[index]?.color || '');
    const notes = prompt('Any special notes?', orderData.itemDetails[index]?.notes || '');
    const itemLink = prompt('Link to this item (if shopping online)?', orderData.itemDetails[index]?.itemLink || '');
    
    if (size !== null || color !== null || notes !== null || itemLink !== null) {
      const newItemDetails = [...orderData.itemDetails];
      newItemDetails[index] = {
        ...newItemDetails[index],
        size: size || newItemDetails[index]?.size || '',
        color: color || newItemDetails[index]?.color || '',
        notes: notes || newItemDetails[index]?.notes || '',
        itemLink: itemLink || newItemDetails[index]?.itemLink || ''
      };
      
      setOrderData(prev => ({
        ...prev,
        itemDetails: newItemDetails
      }));
    }
  };

  const openMembershipModal = () => {
    alert('Upgrade to Premium for unlimited uploads, priority service, and 50% off all orders!');
  };

  const calculateTotal = () => {
    const selectedPackage = packageOptions.find(pkg => pkg.id === orderData.packageSize);
    if (!selectedPackage) return '0.00';
    
    // Service fee for sourcing and delivery
    const serviceFee = 25.00;
    
    // Rush delivery fee if selected
    const rushFee = orderData.deliveryTime === 'asap' ? 20.00 : 0;
    
    const total = serviceFee + rushFee;
    return total.toFixed(2);
  };

  const validateOrder = () => {
    const errors = [];
    
    // Required fields validation
    if (!orderData.packageSize) {
      errors.push({ field: 'package', message: 'Please select a package size' });
    }
    
    if (orderData.items.length === 0) {
      errors.push({ field: 'items', message: 'Please upload at least one item screenshot' });
    }
    
    if (!orderData.preferences.trim()) {
      errors.push({ field: 'preferences', message: 'Please provide your preferences (size, color, style notes, etc.)' });
    }
    
    if (!orderData.deliveryTime) {
      errors.push({ field: 'deliveryTime', message: 'Please select a preferred delivery time' });
    }
    
    // Contact information validation
    if (!orderData.contactInfo.name.trim()) {
      errors.push({ field: 'name', message: 'Please provide your full name' });
    }
    
    if (!orderData.contactInfo.phone.trim()) {
      errors.push({ field: 'phone', message: 'Please provide your phone number' });
    }
    
    if (!orderData.contactInfo.email.trim()) {
      errors.push({ field: 'email', message: 'Please provide your email address' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderData.contactInfo.email)) {
      errors.push({ field: 'email', message: 'Please provide a valid email address' });
    }
    
    if (!orderData.contactInfo.address.trim()) {
      errors.push({ field: 'address', message: 'Please provide your delivery address' });
    }
    
    return errors;
  };

  const submitOrder = () => {
    // Validate the order first
    const errors = validateOrder();
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowValidationModal(true);
      return;
    }
    
    const selectedPackage = packageOptions.find(pkg => pkg.id === orderData.packageSize);
    
    let message = "🛍️ NEW TUHME EXPRESS ORDER\n\n";
    message += `📦 Package: ${selectedPackage?.name} (${selectedPackage?.items})\n`;
    message += `💰 Price: ${selectedPackage?.price}\n`;
    message += `📸 Items: ${orderData.items.length} screenshots uploaded\n\n`;
    
    // Add item details to WhatsApp message
    if (orderData.itemDetails.length > 0) {
      message += "🏷️ ITEM DETAILS:\n";
      orderData.itemDetails.forEach((detail, index) => {
        if (detail.size || detail.color || detail.notes || detail.itemLink) {
          message += `Item ${index + 1}: `;
          if (detail.size) message += `Size: ${detail.size} `;
          if (detail.color) message += `Color: ${detail.color} `;
          if (detail.notes) message += `Notes: ${detail.notes} `;
          if (detail.itemLink) message += `Link: ${detail.itemLink}`;
          message += "\n";
        }
      });
      message += "\n";
    }
    
    if (orderData.preferences) {
      message += `✨ Preferences:\n${orderData.preferences}\n\n`;
    }
    
    message += `⏰ Delivery Time: ${orderData.deliveryTime || 'Flexible'}\n\n`;
    message += `👤 Contact Information:\n`;
    message += `Name: ${orderData.contactInfo.name}\n`;
    message += `Phone: ${orderData.contactInfo.phone}\n`;
    message += `Email: ${orderData.contactInfo.email}\n\n`;
    message += `📍 Delivery Address:\n${orderData.contactInfo.address}\n\n`;
    message += `💰 Temporary Holding Fee: $${calculateTotal()}\n`;
    message += `💳 Final payment for items will be processed in-person with Square card reader\n`;
    message += `📄 Transparent pricing: Service fee + item costs (no hidden fees)\n`;
    
    message += "\nI'll send the screenshots in follow-up messages. Please confirm availability and estimated delivery time. Thank you! 🙏";

    const whatsappURL = `https://wa.me/+16465889916?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleValidationModalClose = () => {
    setShowValidationModal(false);
    setValidationErrors([]);
  };

  const goToStepWithError = (field) => {
    // Navigate to the step that contains the error field
    if (field === 'package' || field === 'items') {
      setCurrentStep(0);
    } else if (field === 'preferences' || field === 'deliveryTime') {
      setCurrentStep(1);
    } else if (field === 'name' || field === 'phone' || field === 'email' || field === 'address') {
      setCurrentStep(2);
    }
    handleValidationModalClose();
  };

  return (
    <div className="express-order-app">
      <div className="express-order-flow">
        <div className="liquid-glass-container">
          <div className="flow-header">
            <button className="minimal-back-button" onClick={onBack}>
              ←
            </button>
            <h1 className="express-title">Express Order</h1>
            <div className="step-indicator">{currentStep + 1} / {steps.length}</div>
          </div>

          <div className="minimal-progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>

          <div className="liquid-step-content">
            {currentStep === 0 && (
              <div className="liquid-item-selection">
                <div className="step-header">
                  <h2 className="step-title">Select Your Package</h2>
                  <p className="step-description">Choose the perfect package size for your shopping needs</p>
                </div>
                
                <div className="liquid-package-grid">
                  {packageOptions.map(pkg => (
                    <div 
                      key={pkg.id}
                      className={`liquid-package-card ${orderData.packageSize === pkg.id ? 'selected' : ''}`}
                      onClick={() => handleInputChange('packageSize', pkg.id)}
                    >
                      <div className="package-glow"></div>
                      <div className="package-content">
                        <div className="package-icon">
                          <TuhmeIcon type={pkg.icon} size={32} />
                        </div>
                        <h3 className="package-name">{pkg.name}</h3>
                        <p className="package-items">{pkg.items}</p>
                        <div className="package-price">{pkg.price}</div>
                        <div className="package-total">{pkg.total}</div>
                        {pkg.popular && (
                          <div className="popular-badge">Most Popular</div>
                        )}
                        {orderData.packageSize === pkg.id && (
                          <div className="selected-indicator">
                            <TuhmeIcon type="event" size={16} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="liquid-upload-section">
                  <div className="upload-header">
                    <h3>Upload Item Screenshots</h3>
                    <p>Add images of items you want us to find and bring to you</p>
                    <div className="upload-limits">
                      <div className={`limit-indicator ${getUploadLimitClass()}`}>
                        <TuhmeIcon type="shopping" size={16} />
                        <span>{orderData.items.length} items uploaded</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="upload-progress-section">
                    <div className="upload-progress-bar">
                      <div 
                        className="upload-progress-fill" 
                        style={{ width: `${(orderData.items.length / getMaxItems()) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="liquid-upload-area">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*,video/*"
                      id="file-upload"
                      onChange={handleFileUpload}
                      disabled={orderData.items.length >= getMaxItems()}
                    />
                    <label htmlFor="file-upload" className={`upload-label ${orderData.items.length >= getMaxItems() ? 'disabled' : ''}`}>
                      <div className="upload-icon">
                        <TuhmeIcon type="delivery" size={48} />
                      </div>
                      <div className="upload-text">
                        <p className="upload-primary">
                          {orderData.items.length >= getMaxItems() 
                            ? 'Maximum items reached' 
                            : 'Drop screenshots here or click to upload'
                          }
                        </p>
                        <p className="upload-secondary">
                          {orderData.items.length >= getMaxItems()
                            ? 'Please remove items to upload more'
                            : 'Support for JPG, PNG, HEIC, MP4 files (max 10MB each)'
                          }
                        </p>
                      </div>
                    </label>

                    {orderData.items.length > 0 && (
                      <div className="uploaded-items-grid">
                        {orderData.items.map((file, index) => (
                          <div key={index} className="uploaded-item-card">
                            <div className="item-preview">
                              {file.type.startsWith('image/') ? (
                                <img 
                                  src={URL.createObjectURL(file)} 
                                  alt={`Item ${index + 1}`}
                                  className="item-image"
                                />
                              ) : (
                                <div className="video-placeholder">
                                  <TuhmeIcon type="delivery" size={24} />
                                  <span>Video</span>
                                </div>
                              )}
                            </div>
                            <div className="item-details">
                              <div className="item-name">{file.name}</div>
                              <div className="item-size">{formatFileSize(file.size)}</div>
                              <div className="item-actions">
                                <button 
                                  className="add-details-btn"
                                  onClick={() => openItemDetailsModal(index)}
                                >
                                  <TuhmeIcon type="professional" size={14} />
                                  Add Details
                                </button>
                                <button 
                                  className="remove-item-btn"
                                  onClick={() => removeItem(index)}
                                >
                                  <TuhmeIcon type="secure" size={14} />
                                </button>
                              </div>
                            </div>
                            {orderData.itemDetails[index] && (
                              <div className="item-metadata">
                                <div className="metadata-tag">
                                  Size: {orderData.itemDetails[index].size || 'Not specified'}
                                </div>
                                {orderData.itemDetails[index].notes && (
                                  <div className="metadata-tag">
                                    Notes: {orderData.itemDetails[index].notes}
                                  </div>
                                )}
                                {orderData.itemDetails[index].itemLink && (
                                  <div className="metadata-tag link-tag">
                                    <a href={orderData.itemDetails[index].itemLink} target="_blank" rel="noopener noreferrer">
                                      View Item Link
                                    </a>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="liquid-preferences">
                <div className="step-header">
                  <h2 className="step-title">Your Preferences</h2>
                  <p className="step-description">Help us personalize your shopping experience</p>
                </div>
                
                <div className="liquid-form-group">
                  <label className="liquid-label">
                    <TuhmeIcon type="professional" size={20} />
                    Special Requests or Preferences
                  </label>
                  <div className="liquid-textarea-container">
                    <textarea
                      className="liquid-textarea"
                      value={orderData.preferences}
                      onChange={(e) => handleInputChange('preferences', e.target.value)}
                      placeholder="Size preferences, color choices, style notes, brand preferences, or any special requests..."
                      rows="4"
                    />
                    <div className="textarea-border"></div>
                  </div>
                </div>
                
                <div className="liquid-form-group">
                  <label className="liquid-label">
                    <TuhmeIcon type="time" size={20} />
                    Preferred Delivery Time
                  </label>
                  <div className="liquid-select-container">
                    <select
                      className="liquid-select"
                      value={orderData.deliveryTime}
                      onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                    >
                      <option value="">Select your preferred time window</option>
                      <option value="morning">Morning (9AM-12PM)</option>
                      <option value="afternoon">Afternoon (12PM-5PM)</option>
                      <option value="evening">Evening (5PM-8PM)</option>
                      <option value="asap">ASAP (Rush delivery +$20)</option>
                    </select>
                    <div className="select-border"></div>
                    <div className="select-arrow">
                      <TuhmeIcon type="delivery" size={16} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="liquid-contact-info">
                <div className="step-header">
                  <h2 className="step-title">Contact Information</h2>
                  <p className="step-description">We need this information to coordinate your delivery</p>
                </div>
                
                <div className="liquid-form-row">
                  <div className="liquid-form-group">
                    <label className="liquid-label">
                      <TuhmeIcon type="professional" size={20} />
                      Full Name
                    </label>
                    <div className="liquid-input-container">
                      <input
                        type="text"
                        className="liquid-input"
                        value={orderData.contactInfo.name}
                        onChange={(e) => handleInputChange('contactInfo.name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                      <div className="input-border"></div>
                    </div>
                  </div>
                  
                  <div className="liquid-form-group">
                    <label className="liquid-label">
                      <TuhmeIcon type="delivery" size={20} />
                      Phone Number
                    </label>
                    <div className="liquid-input-container">
                      <input
                        type="tel"
                        className="liquid-input"
                        value={orderData.contactInfo.phone}
                        onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                      <div className="input-border"></div>
                    </div>
                  </div>
                </div>
                
                <div className="liquid-form-group">
                  <label className="liquid-label">
                    <TuhmeIcon type="secure" size={20} />
                    Email Address
                  </label>
                  <div className="liquid-input-container">
                    <input
                      type="email"
                      className="liquid-input"
                      value={orderData.contactInfo.email}
                      onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                      placeholder="your@email.com"
                    />
                    <div className="input-border"></div>
                  </div>
                </div>
                
                <div className="liquid-form-group">
                  <label className="liquid-label">
                    <TuhmeIcon type="home" size={20} />
                    Delivery Address
                  </label>
                  <div className="liquid-textarea-container">
                    <textarea
                      className="liquid-textarea"
                      value={orderData.contactInfo.address}
                      onChange={(e) => handleInputChange('contactInfo.address', e.target.value)}
                      placeholder="Full delivery address including apartment/unit number, buzzer code, and any special delivery instructions"
                      rows="3"
                    />
                    <div className="textarea-border"></div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="liquid-review-submit">
                <div className="step-header">
                  <h2 className="step-title">Review Your Order</h2>
                  <p className="step-description">Please confirm all details before submitting</p>
                </div>
                
                <div className="liquid-order-summary">
                  <div className="summary-card">
                    <div className="summary-header">
                      <TuhmeIcon type="shopping" size={24} />
                      <h3>Package Selected</h3>
                    </div>
                    <div className="summary-content">
                      <p className="package-details">
                        {packageOptions.find(p => p.id === orderData.packageSize)?.name} Package
                      </p>
                      <p className="package-price">
                        {packageOptions.find(p => p.id === orderData.packageSize)?.price}
                      </p>
                    </div>
                  </div>
                  
                  <div className="summary-card">
                    <div className="summary-header">
                      <TuhmeIcon type="delivery" size={24} />
                      <h3>Items & Preferences</h3>
                    </div>
                    <div className="summary-content">
                      <p>{orderData.items.length} screenshots uploaded</p>
                      <p className="preferences-text">
                        {orderData.preferences || 'No special preferences specified'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="summary-card">
                    <div className="summary-header">
                      <TuhmeIcon type="time" size={24} />
                      <h3>Delivery Information</h3>
                    </div>
                    <div className="summary-content">
                      <p className="delivery-time">
                        {orderData.deliveryTime ? 
                          orderData.deliveryTime.charAt(0).toUpperCase() + orderData.deliveryTime.slice(1) :
                          'No specific time preference'
                        }
                      </p>
                      <div className="delivery-address">
                        <p>{orderData.contactInfo.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="summary-card">
                    <div className="summary-header">
                      <TuhmeIcon type="professional" size={24} />
                      <h3>Contact Details</h3>
                    </div>
                    <div className="summary-content">
                      <p>{orderData.contactInfo.name}</p>
                      <p>{orderData.contactInfo.phone}</p>
                      <p>{orderData.contactInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="summary-card total-card">
                    <div className="summary-header">
                      <TuhmeIcon type="payment" size={24} />
                      <h3>Temporary Holding Fee</h3>
                    </div>
                    <div className="summary-content">
                      <p className="total-amount">${calculateTotal()}</p>
                      <p className="total-note">Service fee only. Final payment for items processed in-person with Square</p>
                      <p className="transparent-pricing">Transparent pricing - no hidden fees</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="liquid-navigation-buttons">
            {currentStep > 0 && (
              <button className="liquid-prev-button" onClick={prevStep}>
                <TuhmeIcon type="delivery" size={16} />
                <span>Previous</span>
              </button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <button className="liquid-next-button" onClick={nextStep}>
                <span>Continue</span>
                <TuhmeIcon type="delivery" size={16} />
              </button>
            ) : (
              <button className="liquid-submit-button" onClick={submitOrder}>
                <TuhmeIcon type="delivery" size={20} />
                <span>Send Order via WhatsApp</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
      <SaviAssistant />

      {/* Validation Modal */}
      {showValidationModal && (
        <div className="validation-modal-backdrop" onClick={handleValidationModalClose}>
          <div className="validation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="validation-modal-header">
              <div className="validation-icon">
                <TuhmeIcon type="alert" size={32} />
              </div>
              <h3>Please Complete Required Information</h3>
              <button className="validation-close" onClick={handleValidationModalClose}>
                ×
              </button>
            </div>
            
            <div className="validation-modal-body">
              <p className="validation-intro">
                We need some additional information to process your order:
              </p>
              
              <div className="validation-errors">
                {validationErrors.map((error, index) => (
                  <div key={index} className="validation-error-item">
                    <div className="error-icon">
                      <TuhmeIcon type="alert" size={16} />
                    </div>
                    <div className="error-content">
                      <span className="error-message">{error.message}</span>
                      <button 
                        className="fix-error-btn"
                        onClick={() => goToStepWithError(error.field)}
                      >
                        Fix This
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="validation-modal-footer">
              <button className="validation-dismiss-btn" onClick={handleValidationModalClose}>
                I'll Complete These Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpressOrderFlow;