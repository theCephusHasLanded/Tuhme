import React, { useState } from 'react';

const TailoringForm = ({ onNext, onPrev, onDataUpdate, data }) => {
  const [tailoringData, setTailoringData] = useState(data.tailoring || {
    measurements: {},
    alterations: [],
    specialRequests: ''
  });

  const measurementFields = [
    { key: 'chest', label: 'Chest', unit: 'inches' },
    { key: 'waist', label: 'Waist', unit: 'inches' },
    { key: 'shoulders', label: 'Shoulders', unit: 'inches' },
    { key: 'sleeves', label: 'Sleeve Length', unit: 'inches' },
    { key: 'inseam', label: 'Inseam', unit: 'inches' },
    { key: 'neck', label: 'Neck', unit: 'inches' }
  ];

  const alterationOptions = [
    'Hem adjustment',
    'Sleeve shortening/lengthening',
    'Waist adjustment',
    'Shoulder adjustment',
    'Chest adjustment',
    'Custom fit'
  ];

  const handleMeasurementChange = (field, value) => {
    const updatedMeasurements = {
      ...tailoringData.measurements,
      [field]: value
    };
    const updatedData = {
      ...tailoringData,
      measurements: updatedMeasurements
    };
    setTailoringData(updatedData);
    onDataUpdate({ tailoring: updatedData });
  };

  const handleAlterationToggle = (alteration) => {
    const updatedAlterations = tailoringData.alterations.includes(alteration)
      ? tailoringData.alterations.filter(item => item !== alteration)
      : [...tailoringData.alterations, alteration];
    
    const updatedData = {
      ...tailoringData,
      alterations: updatedAlterations
    };
    setTailoringData(updatedData);
    onDataUpdate({ tailoring: updatedData });
  };

  const handleSpecialRequestsChange = (value) => {
    const updatedData = {
      ...tailoringData,
      specialRequests: value
    };
    setTailoringData(updatedData);
    onDataUpdate({ tailoring: updatedData });
  };

  const hasRequiredInfo = () => {
    return Object.keys(tailoringData.measurements).length > 0 || 
           tailoringData.alterations.length > 0 || 
           tailoringData.specialRequests.trim() !== '';
  };

  return (
    <div className="tailoring-form-section">
      <h2>Tailoring Requirements</h2>
      <p className="section-description">
        Provide your measurements and specify any alterations needed
      </p>

      <div className="measurements-section">
        <h3>Measurements</h3>
        <div className="measurements-grid">
          {measurementFields.map(field => (
            <div key={field.key} className="measurement-field">
              <label>{field.label}</label>
              <div className="input-group">
                <input
                  type="number"
                  step="0.5"
                  placeholder="0"
                  value={tailoringData.measurements[field.key] || ''}
                  onChange={(e) => handleMeasurementChange(field.key, e.target.value)}
                />
                <span className="unit">{field.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="alterations-section">
        <h3>Required Alterations</h3>
        <div className="alterations-grid">
          {alterationOptions.map(alteration => (
            <label key={alteration} className="alteration-option">
              <input
                type="checkbox"
                checked={tailoringData.alterations.includes(alteration)}
                onChange={() => handleAlterationToggle(alteration)}
              />
              <span className="checkmark"></span>
              {alteration}
            </label>
          ))}
        </div>
      </div>

      <div className="special-requests-section">
        <h3>Special Requests</h3>
        <textarea
          placeholder="Any additional tailoring requirements or special requests..."
          value={tailoringData.specialRequests}
          onChange={(e) => handleSpecialRequestsChange(e.target.value)}
          rows="4"
        />
      </div>

      <div className="form-navigation">
        <button className="prev-button" onClick={onPrev}>
          Back
        </button>
        <button 
          className="next-button"
          onClick={onNext}
          disabled={!hasRequiredInfo()}
        >
          Continue to Delivery
        </button>
      </div>
    </div>
  );
};

export default TailoringForm;