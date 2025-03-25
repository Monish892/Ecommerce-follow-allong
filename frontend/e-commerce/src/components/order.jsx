import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PayPalButtons } from '@paypal/react-paypal-js';
import './order.css';

// Define the BASE_URL as a constant
const BASE_URL = 'https://ecommerce-follow-allong-5.onrender.com'; // Replace this with the actual base URL

const OrderConfirmation = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // New state variable for error message
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const product = location.state?.selectedProduct;
    const address = location.state?.selectedAddress;
    if (product && address) {
      setSelectedProduct(product);
      setSelectedAddress(address);
    } else {
      navigate('/cart');
    }
  }, [location, navigate]);

  const calculateTotalPrice = () => {
    return selectedProduct ? (selectedProduct.price * selectedProduct.quantity).toFixed(2) : '0.00';
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const orderDetails = {
        products: [selectedProduct],
        address: selectedAddress,
        paymentMethod,
      };
      const response = await axios.post(`${BASE_URL}/api/orders/place-order`, orderDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders([...orders, response.data]);
      console.log('Order placed:', response.data);
      navigate('/order-success');
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        setErrorMessage(error.response.data.message || 'Server error');
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Request data:', error.request);
        setErrorMessage('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
        setErrorMessage('Error placing order. Please try again.');
      }
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(orders.filter(order => order._id !== orderId));
      console.log('Order cancelled');
    } catch (error) {
      console.error('Error cancelling order:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="order-confirmation-page">
      <h2>Order Confirmation</h2>
      <div className="order-details">
        <h3>Product</h3>
        {selectedProduct && (
          <ul>
            <li>
              {selectedProduct.name} - {selectedProduct.quantity} x ${selectedProduct.price}
            </li>
          </ul>
        )}
        <h3>Delivery Address</h3>
        {selectedAddress && (
          <p>
            {selectedAddress.address1}, {selectedAddress.city}, {selectedAddress.country}
          </p>
        )}
        <h3>Total Price</h3>
        <p>${calculateTotalPrice()}</p>
        <h3>Payment Method</h3>
        <div>
          <label>
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === 'COD'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery (COD)
          </label>
          <label>
            <input
              type="radio"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Online Payment (PayPal)
          </label>
        </div>
        {paymentMethod === 'PayPal' && (
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: calculateTotalPrice(),
                  },
                }],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert('Transaction completed by ' + details.payer.name.given_name);
                handlePlaceOrder();
              });
            }}
          />
        )}
        <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      </div>
    </div>
  );
};

export default OrderConfirmation;
