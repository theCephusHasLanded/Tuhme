import React, { useState } from 'react';

const DeliveryForm = ({ onNext, onPrev, onDataUpdate, data }) => {
  const [deliveryData, setDeliveryData] = useState(data.delivery || {
    address: '',
    borough: '',
    phone: '',
    preferredTime: '',
    notes: ''
  });

  const [addressError, setAddressError] = useState('');

  const boroughs = ['Manhattan', 'Brooklyn'];
  const timeSlots = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
    '6:00 PM - 9:00 PM'
  ];

  const validateAddress = (address, borough) => {
    if (!address || !borough) {
      setAddressError('Please provide a complete address and select a borough');
      return false;
    }
    
    if (!boroughs.includes(borough)) {
      setAddressError('We only deliver to Manhattan and Brooklyn');
      return false;
    }
    
    setAddressError('');
    return true;
  };

  const handleInputChange = (field, value) => {
    const updatedData = {
      ...deliveryData,
      [field]: value
    };
    setDeliveryData(updatedData);
    onDataUpdate({ delivery: updatedData });

    if (field === 'address' || field === 'borough') {
      validateAddress(
        field === 'address' ? value : deliveryData.address,
        field === 'borough' ? value : deliveryData.borough
      );
    }
  };

  const isFormValid = () => {
    return deliveryData.address &&
           deliveryData.borough &&
           deliveryData.phone &&
           deliveryData.preferredTime &&
           !addressError;
  };

  const handleNext = () => {
    if (validateAddress(deliveryData.address, deliveryData.borough) && isFormValid()) {
      onNext();
    }
  };

  return (
    <div className="delivery-form-section">
      <h2>Delivery Information</h2>
      <p className="section-description">
        We deliver exclusively to Manhattan and Brooklyn
      </p>

      <div className="delivery-form">
        <div className="form-group">
          <label>Delivery Address *</label>
          <input
            type="text"
            placeholder="123 Main Street, Apt 4B"
            value={deliveryData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className={addressError ? 'error' : ''}
          />
        </div>

        <div className="form-group">
          <label>Borough *</label>
          <select
            value={deliveryData.borough}
            onChange={(e) => handleInputChange('borough', e.target.value)}
            className={addressError ? 'error' : ''}
          >
            <option value="">Select Borough</option>
            {boroughs.map(borough => (
              <option key={borough} value={borough}>
                {borough}
              </option>
            ))}
          </select>
        </div>

        {addressError && (
          <div className="error-message">{addressError}</div>
        )}

        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={deliveryData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Preferred Delivery Time *</label>
          <select
            value={deliveryData.preferredTime}
            onChange={(e) => handleInputChange('preferredTime', e.target.value)}
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map(slot => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Delivery Notes</label>
          <textarea
            placeholder="Buzzer code, floor, special instructions..."
            value={deliveryData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            rows="3"
          />
        </div>
      </div>

      <div className="payment-info">
        <h3>Payment Information</h3>
        <p>Payment will be collected upon delivery via Square card reader</p>
      </div>

      <div className="form-navigation">
        <button className="prev-button" onClick={onPrev}>
          Back
        </button>
        <button 
          className="next-button"
          onClick={handleNext}
          disabled={!isFormValid()}
        >
          Review Order
        </button>
      </div>
    </div>
  );
};

export default DeliveryForm;