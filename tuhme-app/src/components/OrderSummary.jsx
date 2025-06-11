import React, { useState } from 'react';
import { createOrder } from '../services/orderService';

const OrderSummary = ({ onPrev, orderData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const generateWhatsAppMessage = () => {
    const { image, imageUrl, tailoring, delivery } = orderData;
    
    let message = "New TUHME Order Request:\n\n";
    
    if (imageUrl) {
      message += `Item Image: ${imageUrl}\n\n`;
    }
    
    if (tailoring.measurements && Object.keys(tailoring.measurements).length > 0) {
      message += "Measurements:\n";
      Object.entries(tailoring.measurements).forEach(([key, value]) => {
        if (value) {
          message += `- ${key}: ${value} inches\n`;
        }
      });
      message += "\n";
    }
    
    if (tailoring.alterations && tailoring.alterations.length > 0) {
      message += "Required Alterations:\n";
      tailoring.alterations.forEach(alteration => {
        message += `- ${alteration}\n`;
      });
      message += "\n";
    }
    
    if (tailoring.specialRequests) {
      message += `Special Requests: ${tailoring.specialRequests}\n\n`;
    }
    
    message += "Delivery Information:\n";
    message += `Address: ${delivery.address}, ${delivery.borough}\n`;
    message += `Phone: ${delivery.phone}\n`;
    message += `Preferred Time: ${delivery.preferredTime}\n`;
    
    if (delivery.notes) {
      message += `Notes: ${delivery.notes}\n`;
    }
    
    return encodeURIComponent(message);
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    
    try {
      // Create order in Firebase
      const savedOrder = await createOrder(orderData);
      
      // Generate WhatsApp message
      const whatsappMessage = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/16465889916?text=${whatsappMessage}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      setOrderSubmitted(true);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSubmitted) {
    return (
      <div className="order-confirmation">
        <div className="confirmation-icon">✓</div>
        <h2>Order Request Sent!</h2>
        <p>Your order details have been sent via WhatsApp. We'll be in touch shortly to confirm your order and arrange delivery.</p>
        <div className="next-steps">
          <h3>What happens next?</h3>
          <ul>
            <li>We'll confirm your order via WhatsApp</li>
            <li>Provide you with a delivery estimate</li>
            <li>Keep you updated on your order status</li>
            <li>Arrange payment upon delivery</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="order-summary-section">
      <h2>Order Summary</h2>
      <p className="section-description">
        Review your order details before submitting
      </p>

      <div className="summary-content">
        {(orderData.imageUrl || orderData.image) && (
          <div className="summary-item">
            <h3>Selected Item</h3>
            <div className="item-preview">
              <img 
                src={orderData.imageUrl || URL.createObjectURL(orderData.image)} 
                alt="Selected item" 
              />
            </div>
          </div>
        )}

        <div className="summary-item">
          <h3>Tailoring Requirements</h3>
          {orderData.tailoring.measurements && Object.keys(orderData.tailoring.measurements).length > 0 && (
            <div className="measurements-summary">
              <h4>Measurements</h4>
              <ul>
                {Object.entries(orderData.tailoring.measurements).map(([key, value]) => (
                  value && <li key={key}>{key}: {value} inches</li>
                ))}
              </ul>
            </div>
          )}
          
          {orderData.tailoring.alterations && orderData.tailoring.alterations.length > 0 && (
            <div className="alterations-summary">
              <h4>Alterations</h4>
              <ul>
                {orderData.tailoring.alterations.map((alteration, index) => (
                  <li key={index}>{alteration}</li>
                ))}
              </ul>
            </div>
          )}
          
          {orderData.tailoring.specialRequests && (
            <div className="special-requests-summary">
              <h4>Special Requests</h4>
              <p>{orderData.tailoring.specialRequests}</p>
            </div>
          )}
        </div>

        <div className="summary-item">
          <h3>Delivery Details</h3>
          <div className="delivery-summary">
            <p><strong>Address:</strong> {orderData.delivery.address}, {orderData.delivery.borough}</p>
            <p><strong>Phone:</strong> {orderData.delivery.phone}</p>
            <p><strong>Preferred Time:</strong> {orderData.delivery.preferredTime}</p>
            {orderData.delivery.notes && (
              <p><strong>Notes:</strong> {orderData.delivery.notes}</p>
            )}
          </div>
        </div>

        <div className="summary-item">
          <h3>Payment</h3>
          <p>Payment will be collected upon delivery via Square card reader</p>
        </div>
      </div>

      <div className="form-navigation">
        <button className="prev-button" onClick={onPrev}>
          Back
        </button>
        <button 
          className="submit-button"
          onClick={handleSubmitOrder}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Order via WhatsApp'}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;