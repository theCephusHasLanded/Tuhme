import { useState } from 'react';

const PickupDeliveryForm = ({ onNext, onPrev, onDataUpdate, data, serviceType }) => {
  const [formData, setFormData] = useState({
    pickup: data.pickup || {
      address: '',
      borough: '',
      phone: '',
      preferredTime: '',
      instructions: ''
    },
    delivery: data.delivery || {
      address: '',
      borough: '',
      phone: '',
      preferredTime: '',
      notes: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [sameAddress, setSameAddress] = useState(false);

  const boroughs = ['Manhattan', 'Brooklyn'];
  const timeSlots = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
    '6:00 PM - 9:00 PM'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    // Always validate delivery
    if (!formData.delivery.address) newErrors.deliveryAddress = 'Delivery address is required';
    if (!formData.delivery.borough) newErrors.deliveryBorough = 'Borough is required';
    if (!formData.delivery.phone) newErrors.deliveryPhone = 'Phone number is required';
    if (!formData.delivery.preferredTime) newErrors.deliveryTime = 'Preferred time is required';
    
    // Validate pickup only if service type is pickup
    if (serviceType === 'pickup') {
      if (!formData.pickup.address) newErrors.pickupAddress = 'Pickup address is required';
      if (!formData.pickup.borough) newErrors.pickupBorough = 'Borough is required';
      if (!formData.pickup.phone) newErrors.pickupPhone = 'Phone number is required';
      if (!formData.pickup.preferredTime) newErrors.pickupTime = 'Preferred time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (section, field, value) => {
    const updatedData = {
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    };
    
    setFormData(updatedData);
    onDataUpdate(updatedData);
    
    // Clear error for this field
    if (errors[`${section}${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${section}${field.charAt(0).toUpperCase() + field.slice(1)}`];
        return newErrors;
      });
    }
  };

  const handleSameAddressToggle = () => {
    const newSameAddress = !sameAddress;
    setSameAddress(newSameAddress);
    
    if (newSameAddress) {
      const updatedData = {
        ...formData,
        delivery: {
          ...formData.pickup,
          notes: formData.delivery.notes
        }
      };
      setFormData(updatedData);
      onDataUpdate(updatedData);
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="pickup-delivery-form-section">
      <h2>
        {serviceType === 'pickup' ? 'Pickup & Delivery Details' : 'Delivery Information'}
      </h2>
      <p className="section-description">
        {serviceType === 'pickup' 
          ? 'Where should we pick up your items and deliver them back?'
          : 'Where should we deliver your sourced items?'
        }
      </p>

      {serviceType === 'pickup' && (
        <div className="pickup-section">
          <h3>Pickup Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Pickup Address *</label>
              <input
                type="text"
                placeholder="123 Main Street, Apt 4B"
                value={formData.pickup.address}
                onChange={(e) => handleInputChange('pickup', 'address', e.target.value)}
                className={errors.pickupAddress ? 'error' : ''}
              />
              {errors.pickupAddress && <span className="error-message">{errors.pickupAddress}</span>}
            </div>

            <div className="form-group">
              <label>Borough *</label>
              <select
                value={formData.pickup.borough}
                onChange={(e) => handleInputChange('pickup', 'borough', e.target.value)}
                className={errors.pickupBorough ? 'error' : ''}
              >
                <option value="">Select Borough</option>
                {boroughs.map(borough => (
                  <option key={borough} value={borough}>{borough}</option>
                ))}
              </select>
              {errors.pickupBorough && <span className="error-message">{errors.pickupBorough}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.pickup.phone}
                onChange={(e) => handleInputChange('pickup', 'phone', e.target.value)}
                className={errors.pickupPhone ? 'error' : ''}
              />
              {errors.pickupPhone && <span className="error-message">{errors.pickupPhone}</span>}
            </div>

            <div className="form-group">
              <label>Preferred Pickup Time *</label>
              <select
                value={formData.pickup.preferredTime}
                onChange={(e) => handleInputChange('pickup', 'preferredTime', e.target.value)}
                className={errors.pickupTime ? 'error' : ''}
              >
                <option value="">Select Time Slot</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              {errors.pickupTime && <span className="error-message">{errors.pickupTime}</span>}
            </div>

            <div className="form-group full-width">
              <label>Pickup Instructions</label>
              <textarea
                placeholder="Buzzer code, floor, special instructions..."
                value={formData.pickup.instructions}
                onChange={(e) => handleInputChange('pickup', 'instructions', e.target.value)}
                rows="3"
              />
            </div>
          </div>

          <div className="same-address-toggle">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={sameAddress}
                onChange={handleSameAddressToggle}
              />
              <span className="checkmark"></span>
              Use same address for delivery
            </label>
          </div>
        </div>
      )}

      <div className="delivery-section">
        <h3>Delivery Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Delivery Address *</label>
            <input
              type="text"
              placeholder="123 Main Street, Apt 4B"
              value={formData.delivery.address}
              onChange={(e) => handleInputChange('delivery', 'address', e.target.value)}
              className={errors.deliveryAddress ? 'error' : ''}
              disabled={sameAddress}
            />
            {errors.deliveryAddress && <span className="error-message">{errors.deliveryAddress}</span>}
          </div>

          <div className="form-group">
            <label>Borough *</label>
            <select
              value={formData.delivery.borough}
              onChange={(e) => handleInputChange('delivery', 'borough', e.target.value)}
              className={errors.deliveryBorough ? 'error' : ''}
              disabled={sameAddress}
            >
              <option value="">Select Borough</option>
              {boroughs.map(borough => (
                <option key={borough} value={borough}>{borough}</option>
              ))}
            </select>
            {errors.deliveryBorough && <span className="error-message">{errors.deliveryBorough}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.delivery.phone}
              onChange={(e) => handleInputChange('delivery', 'phone', e.target.value)}
              className={errors.deliveryPhone ? 'error' : ''}
              disabled={sameAddress}
            />
            {errors.deliveryPhone && <span className="error-message">{errors.deliveryPhone}</span>}
          </div>

          <div className="form-group">
            <label>Preferred Delivery Time *</label>
            <select
              value={formData.delivery.preferredTime}
              onChange={(e) => handleInputChange('delivery', 'preferredTime', e.target.value)}
              className={errors.deliveryTime ? 'error' : ''}
              disabled={sameAddress}
            >
              <option value="">Select Time Slot</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.deliveryTime && <span className="error-message">{errors.deliveryTime}</span>}
          </div>

          <div className="form-group full-width">
            <label>Delivery Notes</label>
            <textarea
              placeholder="Buzzer code, floor, special instructions..."
              value={formData.delivery.notes}
              onChange={(e) => handleInputChange('delivery', 'notes', e.target.value)}
              rows="3"
            />
          </div>
        </div>
      </div>

      <div className="service-info">
        <div className="info-card">
          <h4>Payment</h4>
          <p>Payment collected via Square card reader upon delivery</p>
        </div>
        <div className="info-card">
          <h4>Service Areas</h4>
          <p>Manhattan and Brooklyn only</p>
        </div>
        <div className="info-card">
          <h4>Estimated Timeline</h4>
          <p>{serviceType === 'pickup' ? '24-48 hours after pickup' : '2-5 business days'}</p>
        </div>
      </div>

      <div className="form-navigation">
        <button className="prev-button" onClick={onPrev}>
          Back
        </button>
        <button 
          className="next-button"
          onClick={handleNext}
        >
          Review Order
        </button>
      </div>
    </div>
  );
};

export default PickupDeliveryForm;