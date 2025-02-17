import React, { useState, useEffect } from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.productId} className="cart-item">
            <img src={`http://localhost:5000/${item.image}`} alt={item.name} className="cart-image" />
            <h3 className="cart-name">{item.name}</h3>
            <p className="cart-description">{item.description}</p>
            <p className="cart-price">${item.price}</p>
            <p className="cart-quantity">Quantity: {item.quantity}</p>
            <button className="remove-from-cart-button" onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
            <button className="place-order-button" onClick={() => handlePlaceOrder(item)}>Place Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;