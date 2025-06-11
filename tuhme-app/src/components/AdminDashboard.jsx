import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../services/orderService';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orderStatuses = [
    'pending',
    'confirmed',
    'in_progress',
    'ready_for_delivery',
    'delivered',
    'cancelled'
  ];

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const ordersData = await getAllOrders();
      setOrders(ordersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
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

  if (loading) {
    return <div className="admin-loading">Loading orders...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Order Management Dashboard</h1>
      
      <div className="orders-overview">
        <div className="stats">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>{orders.length}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p>{orders.filter(o => o.status === 'pending').length}</p>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <p>{orders.filter(o => o.status === 'in_progress').length}</p>
          </div>
          <div className="stat-card">
            <h3>Delivered</h3>
            <p>{orders.filter(o => o.status === 'delivered').length}</p>
          </div>
        </div>
      </div>

      <div className="orders-table">
        <h2>Recent Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id.slice(-8)}</td>
                  <td>{order.delivery?.phone || 'N/A'}</td>
                  <td>{order.delivery?.address}, {order.delivery?.borough}</td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.createdAt ? 
                      new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 
                      'Unknown'
                    }
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      className="status-select"
                    >
                      {orderStatuses.map(status => (
                        <option key={status} value={status}>
                          {status.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="view-details-btn"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedOrder && (
        <div className="order-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Order Details - {selectedOrder.id.slice(-8)}</h3>
              <button onClick={() => setSelectedOrder(null)}>&times;</button>
            </div>
            <div className="modal-body">
              {selectedOrder.imageUrl && (
                <div className="order-image">
                  <img src={selectedOrder.imageUrl} alt="Order item" />
                </div>
              )}
              
              <div className="order-info">
                <h4>Tailoring Requirements</h4>
                {selectedOrder.tailoring?.measurements && (
                  <div>
                    <strong>Measurements:</strong>
                    <ul>
                      {Object.entries(selectedOrder.tailoring.measurements).map(([key, value]) => (
                        value && <li key={key}>{key}: {value} inches</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedOrder.tailoring?.alterations?.length > 0 && (
                  <div>
                    <strong>Alterations:</strong>
                    <ul>
                      {selectedOrder.tailoring.alterations.map((alt, index) => (
                        <li key={index}>{alt}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedOrder.tailoring?.specialRequests && (
                  <div>
                    <strong>Special Requests:</strong>
                    <p>{selectedOrder.tailoring.specialRequests}</p>
                  </div>
                )}
                
                <h4>Delivery Information</h4>
                <p><strong>Address:</strong> {selectedOrder.delivery?.address}, {selectedOrder.delivery?.borough}</p>
                <p><strong>Phone:</strong> {selectedOrder.delivery?.phone}</p>
                <p><strong>Preferred Time:</strong> {selectedOrder.delivery?.preferredTime}</p>
                {selectedOrder.delivery?.notes && (
                  <p><strong>Notes:</strong> {selectedOrder.delivery.notes}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;