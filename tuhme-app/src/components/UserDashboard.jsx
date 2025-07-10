import { useState, useEffect } from 'react';

const UserDashboard = ({ userPhone, onBack }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadUserOrders();
  }, [userPhone]);

  const loadUserOrders = async () => {
    try {
      // Since we removed Firebase, there are no stored orders to load
      setOrders([]);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffa726',
      confirmed: '#42a5f5',
      in_progress: '#ab47bc',
      ready_for_delivery: '#26c6da',
      delivered: '#4caf50',
      cancelled: '#ef5350'
    };
    return colors[status] || '#666';
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Order Received',
      confirmed: 'Confirmed',
      in_progress: 'In Progress',
      ready_for_delivery: 'Ready for Delivery',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    };
    return statusMap[status] || status;
  };

  const getEstimatedDelivery = (order) => {
    if (order.status === 'delivered') return 'Delivered';
    if (order.status === 'cancelled') return 'Cancelled';
    
    const createdDate = new Date(order.createdAt?.seconds * 1000);
    const estimatedDays = order.serviceType === 'pickup' ? 2 : 5;
    const estimatedDate = new Date(createdDate.getTime() + estimatedDays * 24 * 60 * 60 * 1000);
    
    return estimatedDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="user-dashboard loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Order
        </button>
        <h1>Your Orders</h1>
        <p className="dashboard-subtitle">Track your TUHME orders and delivery status</p>
      </div>

      {/* WhatsApp Tracking Section */}
      <div className="whatsapp-tracking-section">
        <div className="tracking-card">
          <div className="tracking-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#25d366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.346"/>
            </svg>
            <h3>Real-Time Order Tracking</h3>
          </div>
          <p className="tracking-description">
            Get instant updates on your TUHME orders via WhatsApp. Our personal shoppers will keep you informed throughout the entire process.
          </p>
          <div className="tracking-features">
            <div className="feature">
              <span className="feature-icon">📝</span>
              <span>Order confirmation</span>
            </div>
            <div className="feature">
              <span className="feature-icon">👤</span>
              <span>Shopper assignment</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🛍️</span>
              <span>Shopping progress</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🚗</span>
              <span>Delivery updates</span>
            </div>
          </div>
          <a 
            href={whatsappOrderService.generateTrackingLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-track-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.346"/>
            </svg>
            Track via WhatsApp
          </a>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <div className="no-orders-icon">📦</div>
          <h2>No Orders Found</h2>
          <p>You haven't placed any orders yet with this phone number.</p>
          <button className="primary-cta" onClick={onBack}>
            Place Your First Order
          </button>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-id">
                  <span className="order-label">Order</span>
                  <span className="order-number">#{order.id.slice(-8).toUpperCase()}</span>
                </div>
                <div className="order-date">
                  {formatDate(order.createdAt)}
                </div>
              </div>

              <div className="order-service-type">
                <span className={`service-badge ${order.serviceType}`}>
                  {order.serviceType === 'pickup' ? '👔 Pickup & Tailor' : '🛍️ Source & Deliver'}
                </span>
              </div>

              {order.imageUrl && (
                <div className="order-image">
                  <img src={order.imageUrl} alt="Order item" />
                </div>
              )}

              <div className="order-status-section">
                <div className="status-info">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusText(order.status)}
                  </span>
                  <div className="delivery-estimate">
                    <span className="estimate-label">Estimated:</span>
                    <span className="estimate-date">{getEstimatedDelivery(order)}</span>
                  </div>
                </div>

                <div className="progress-indicator">
                  <div className="progress-bar-container">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${
                          order.status === 'pending' ? '20%' :
                          order.status === 'confirmed' ? '40%' :
                          order.status === 'in_progress' ? '60%' :
                          order.status === 'ready_for_delivery' ? '80%' :
                          order.status === 'delivered' ? '100%' : '0%'
                        }`
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="order-details-preview">
                {order.delivery?.address && (
                  <div className="detail-item">
                    <span className="detail-label">Delivery to:</span>
                    <span className="detail-value">{order.delivery.address}</span>
                  </div>
                )}
                {order.tailoring?.alterations?.length > 0 && (
                  <div className="detail-item">
                    <span className="detail-label">Alterations:</span>
                    <span className="detail-value">{order.tailoring.alterations.length} items</span>
                  </div>
                )}
              </div>

              <div className="order-actions">
                <button 
                  className="view-details-btn"
                  onClick={() => setSelectedOrder(order)}
                >
                  View Details
                </button>
                <button className="contact-btn">
                  📱 WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="order-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Order #{selectedOrder.id.slice(-8).toUpperCase()}</h3>
              <button onClick={() => setSelectedOrder(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="order-timeline">
                <h4>Order Timeline</h4>
                <div className="timeline">
                  <div className={`timeline-item ${selectedOrder.status !== 'pending' ? 'completed' : 'current'}`}>
                    <div className="timeline-icon">📝</div>
                    <div className="timeline-content">
                      <h5>Order Placed</h5>
                      <p>{formatDate(selectedOrder.createdAt)}</p>
                    </div>
                  </div>
                  <div className={`timeline-item ${['confirmed', 'in_progress', 'ready_for_delivery', 'delivered'].includes(selectedOrder.status) ? 'completed' : selectedOrder.status === 'confirmed' ? 'current' : ''}`}>
                    <div className="timeline-icon">✅</div>
                    <div className="timeline-content">
                      <h5>Order Confirmed</h5>
                      <p>We've received your order</p>
                    </div>
                  </div>
                  <div className={`timeline-item ${['in_progress', 'ready_for_delivery', 'delivered'].includes(selectedOrder.status) ? 'completed' : selectedOrder.status === 'in_progress' ? 'current' : ''}`}>
                    <div className="timeline-icon">⚡</div>
                    <div className="timeline-content">
                      <h5>In Progress</h5>
                      <p>{selectedOrder.serviceType === 'pickup' ? 'Tailoring your items' : 'Sourcing your items'}</p>
                    </div>
                  </div>
                  <div className={`timeline-item ${['ready_for_delivery', 'delivered'].includes(selectedOrder.status) ? 'completed' : selectedOrder.status === 'ready_for_delivery' ? 'current' : ''}`}>
                    <div className="timeline-icon">📦</div>
                    <div className="timeline-content">
                      <h5>Ready for Delivery</h5>
                      <p>Your order is ready</p>
                    </div>
                  </div>
                  <div className={`timeline-item ${selectedOrder.status === 'delivered' ? 'completed' : ''}`}>
                    <div className="timeline-icon">🚚</div>
                    <div className="timeline-content">
                      <h5>Delivered</h5>
                      <p>Order completed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-full-details">
                {selectedOrder.imageUrl && (
                  <div className="order-image-large">
                    <img src={selectedOrder.imageUrl} alt="Order item" />
                  </div>
                )}
                
                <div className="details-grid">
                  <div className="detail-section">
                    <h4>Service Type</h4>
                    <p>{selectedOrder.serviceType === 'pickup' ? 'Pickup & Tailoring' : 'Sourcing & Delivery'}</p>
                  </div>
                  
                  {selectedOrder.pickup && (
                    <div className="detail-section">
                      <h4>Pickup Details</h4>
                      <p>{selectedOrder.pickup.address}, {selectedOrder.pickup.borough}</p>
                      <p>Time: {selectedOrder.pickup.preferredTime}</p>
                    </div>
                  )}
                  
                  <div className="detail-section">
                    <h4>Delivery Details</h4>
                    <p>{selectedOrder.delivery?.address}, {selectedOrder.delivery?.borough}</p>
                    <p>Time: {selectedOrder.delivery?.preferredTime}</p>
                  </div>
                  
                  {selectedOrder.tailoring && (
                    <div className="detail-section">
                      <h4>Tailoring Requirements</h4>
                      {selectedOrder.tailoring.alterations?.length > 0 && (
                        <ul>
                          {selectedOrder.tailoring.alterations.map((alt, index) => (
                            <li key={index}>{alt}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;