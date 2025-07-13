import { useState, useEffect } from 'react';
import whatsappOrderService from '../services/whatsappOrderService';

const ShopperDashboard = ({ shopperPhone = '16465889916', shopperName = 'TUHME Shopper' }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateDetails, setUpdateDetails] = useState('');

  useEffect(() => {
    // Load orders for this shopper
    const shopperOrders = whatsappOrderService.getOrdersForShopper(shopperPhone);
    setOrders(shopperOrders);
  }, [shopperPhone]);

  const handleStatusUpdate = (orderId, newStatus) => {
    try {
      const updatedOrder = whatsappOrderService.updateOrderStatus(
        orderId,
        newStatus,
        updateMessage || getDefaultMessage(newStatus),
        updateDetails || getDefaultDetails(newStatus)
      );

      // Refresh orders
      const shopperOrders = whatsappOrderService.getOrdersForShopper(shopperPhone);
      setOrders(shopperOrders);
      
      // Clear form
      setUpdateMessage('');
      setUpdateDetails('');
      setSelectedOrder(null);

      alert('Order status updated and customer notified via WhatsApp!');
    } catch (error) {
      alert('Error updating order: ' + error.message);
    }
  };

  const getDefaultMessage = (status) => {
    const messages = {
      'shopper_assigned': 'Your personal shopper has been assigned',
      'shopping_in_progress': 'Shopping for your items now',
      'items_collected': 'All items have been collected',
      'on_the_way': 'On the way to your location',
      'delivered': 'Arrived at your location - ready for try-on',
      'completed': 'Order completed successfully'
    };
    return messages[status] || 'Order status updated';
  };

  const getDefaultDetails = (status) => {
    const details = {
      'shopper_assigned': 'I\'m excited to be your personal shopper today! I\'ll start collecting your items and keep you updated.',
      'shopping_in_progress': 'I\'m currently at the stores collecting your requested items. This may take 30-60 minutes depending on availability.',
      'items_collected': 'Great news! I\'ve successfully collected all your items and they look amazing. Heading your way now!',
      'on_the_way': 'I\'m traveling to your location now. Expected arrival in 15-30 minutes. I\'ll message when I arrive.',
      'delivered': 'I\'ve arrived at your location with your items! Ready to start your 15-minute private try-on session.',
      'completed': 'Thank you for choosing TUHME! Hope you love your new items. Feel free to book another session anytime!'
    };
    return details[status] || 'Order status has been updated.';
  };

  const statusOptions = [
    { value: 'shopper_assigned', label: 'Shopper Assigned', color: '#8b5cf6' },
    { value: 'shopping_in_progress', label: 'Shopping in Progress', color: '#f59e0b' },
    { value: 'items_collected', label: 'Items Collected', color: '#10b981' },
    { value: 'on_the_way', label: 'On the Way', color: '#06b6d4' },
    { value: 'delivered', label: 'Delivered', color: '#84cc16' },
    { value: 'completed', label: 'Completed', color: '#22c55e' }
  ];

  // Demo function to create a test order
  const createTestOrder = () => {
    const orderId = whatsappOrderService.createOrder(
      '1234567890', // Test customer phone
      [
        { name: 'Gucci Handbag', store: 'Gucci Madison' },
        { name: 'Prada Shoes', store: 'Prada SoHo' }
      ],
      {
        name: 'Test Customer',
        neighborhood: 'Upper East Side',
        address: '123 Test St, New York, NY'
      }
    );

    // Assign to current shopper
    whatsappOrderService.assignShopper(orderId, {
      name: shopperName,
      phone: shopperPhone
    });

    // Refresh orders
    const shopperOrders = whatsappOrderService.getOrdersForShopper(shopperPhone);
    setOrders(shopperOrders);

    alert(`Test order created: ${orderId}`);
  };

  return (
    <div className="shopper-dashboard">
      <div className="dashboard-header">
        <h1>TUHME Shopper Dashboard</h1>
        <p>Welcome, {shopperName}</p>
        <button onClick={createTestOrder} className="test-order-btn">
          Create Test Order (Demo)
        </button>
      </div>

      <div className="orders-section">
        <h2>My Active Orders ({orders.length})</h2>
        
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>No active orders assigned to you.</p>
            <p>New orders will appear here when assigned.</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map(order => {
              const statusInfo = whatsappOrderService.getStatusDisplay(order.status);
              return (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>{order.id}</h3>
                    <div 
                      className="status-badge"
                      style={{ backgroundColor: statusInfo.color }}
                    >
                      {statusInfo.icon} {statusInfo.label}
                    </div>
                  </div>
                  
                  <div className="order-details">
                    <p><strong>Customer:</strong> {order.customerInfo.name || 'N/A'}</p>
                    <p><strong>Items:</strong> {order.items.length}</p>
                    <p><strong>Created:</strong> {order.createdAt.toLocaleString()}</p>
                    <p><strong>Last Update:</strong> {order.updatedAt.toLocaleString()}</p>
                  </div>

                  <div className="order-items">
                    <h4>Items to shop:</h4>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>{item.name} {item.store && `(${item.store})`}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="order-actions">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="update-status-btn"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="update-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="update-modal" onClick={e => e.stopPropagation()}>
            <h3>Update Order Status</h3>
            <p>Order: {selectedOrder.id}</p>
            <p>Current Status: {whatsappOrderService.getStatusDisplay(selectedOrder.status).label}</p>

            <div className="status-options">
              <h4>New Status:</h4>
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  className="status-option"
                  style={{ borderColor: option.color }}
                  onClick={() => {
                    setUpdateMessage(getDefaultMessage(option.value));
                    setUpdateDetails(getDefaultDetails(option.value));
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="update-form">
              <label>
                Update Message (sent to customer):
                <input
                  type="text"
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                  placeholder="Brief status message"
                />
              </label>

              <label>
                Detailed Description:
                <textarea
                  value={updateDetails}
                  onChange={(e) => setUpdateDetails(e.target.value)}
                  placeholder="Detailed description of current status"
                  rows={3}
                />
              </label>
            </div>

            <div className="modal-actions">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  className="confirm-update-btn"
                  style={{ backgroundColor: option.color }}
                  onClick={() => handleStatusUpdate(selectedOrder.id, option.value)}
                >
                  Update to {option.label}
                </button>
              ))}
              <button 
                onClick={() => setSelectedOrder(null)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx="true">{`
        .shopper-dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: var(--font-primary);
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .dashboard-header h1 {
          font-size: 2.5rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .dashboard-header p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .test-order-btn {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: var(--accent-primary);
          color: var(--primary-bg);
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .orders-section h2 {
          color: var(--text-primary);
          margin-bottom: 2rem;
        }

        .no-orders {
          text-align: center;
          padding: 3rem;
          color: var(--text-secondary);
        }

        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .order-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .order-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .order-header h3 {
          color: var(--text-primary);
          margin: 0;
          font-size: 1.1rem;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          color: var(--primary-bg);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .order-details p {
          margin: 0.5rem 0;
          color: var(--text-secondary);
        }

        .order-items {
          margin: 1rem 0;
        }

        .order-items h4 {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .order-items ul {
          margin: 0;
          padding-left: 1rem;
          color: var(--text-secondary);
        }

        .order-actions {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .update-status-btn {
          background: var(--accent-primary);
          color: var(--primary-bg);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .update-status-btn:hover {
          background: var(--accent-secondary);
          transform: translateY(-1px);
        }

        .update-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .update-modal {
          background: var(--bg-primary);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .update-modal h3 {
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .status-options {
          margin: 1.5rem 0;
        }

        .status-option {
          display: inline-block;
          margin: 0.25rem;
          padding: 0.5rem 1rem;
          background: transparent;
          border: 2px solid;
          border-radius: 6px;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .status-option:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .update-form {
          margin: 1.5rem 0;
        }

        .update-form label {
          display: block;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .update-form input,
        .update-form textarea {
          width: 100%;
          padding: 0.75rem;
          margin-top: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          color: var(--text-primary);
          font-family: inherit;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }

        .confirm-update-btn {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 6px;
          color: var(--primary-bg);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .confirm-update-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.1);
        }

        .cancel-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: var(--text-secondary);
          padding: 0.75rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }

        .cancel-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ShopperDashboard;