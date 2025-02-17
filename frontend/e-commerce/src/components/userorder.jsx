import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userorder.css';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/orders/user-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error.response?.data?.message || error.message);
        setError(error.response?.data?.message || 'Failed to fetch orders. Please try again.');
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/orders/cancel-order/${orderId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(orders.map(order => order._id === orderId ? { ...order, isCanceled: true } : order));
    } catch (error) {
      console.error('Error canceling order:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Failed to cancel order. Please try again.');
    }
  };

  return (
    <div className="user-orders-page">
      <h2>My Orders</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>Total Price: ${order.totalPrice}</p>
              <p>Order Items:</p>
              <ul>
                {order.orderItems.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.qty} x ${item.price}
                  </li>
                ))}
              </ul>
              <p>Shipping Address: {order.shippingAddress.address1}, {order.shippingAddress.city}, {order.shippingAddress.country}</p>
              <p>Order Status: {order.isDelivered ? 'Delivered' : order.isCanceled ? 'Canceled' : 'Pending'}</p>
              {!order.isCanceled && !order.isDelivered && (
                <button onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default UserOrders;