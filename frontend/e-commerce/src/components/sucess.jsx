import React from 'react';
import { useNavigate } from 'react-router-dom';
import './success.css';

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className="order-success-page">
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your purchase. Your order has been placed successfully.</p>
      <button className="go-to-home-button" onClick={handleGoToHome}>Go to Home</button>
    </div>
  );
};

export default OrderSuccess;