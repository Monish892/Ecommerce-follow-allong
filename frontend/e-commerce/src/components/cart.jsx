import React, { useState, useEffect } from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const BASE_URL = 'https://ecommerce-follow-allong-5.onrender.com'; // Replace with your actual base URL

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    console.log(cart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handlePlaceOrder = (item) => {
    navigate('/select-address', { state: { selectedProduct: item } });
  };

  const handleQuantityChange = async (productId, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0) {
          item.quantity = newQuantity;
        }
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    try {
      await axios.put(`${BASE_URL}/api/cart/update-quantity`, {
        productId,
        quantity: change
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.productId} className="cart-item">
            <img src={`${BASE_URL}/${item.image}`} alt={item.name} className="cart-image" />
            <h3 className="cart-name">{item.name}</h3>
            <p className="cart-description">{item.description}</p>
            <p className="cart-price">${item.price}</p>
            <p className="cart-quantity">Quantity: {item.quantity}</p>
            <button className="quantity-button" onClick={() => handleQuantityChange(item.productId, -1)}>-</button>
            <button className="quantity-button" onClick={() => handleQuantityChange(item.productId, 1)}>+</button>
            <button className="remove-from-cart-button" onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
            <button className="place-order-button" onClick={() => handlePlaceOrder(item)}>Place Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
