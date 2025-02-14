import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response?.data?.message || error.message);
      }
    };
    fetchProducts();
  }, []);

  // const handleDelete = async (productId) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/products/${productId}`);
  //     setProducts(products.filter(product => product._id !== productId));
  //   } catch (error) {
  //     console.error('Error deleting product:', error.response?.data?.message || error.message);
  //   }
  // };

  // const handleEdit = (productId) => {
  //   window.location.href = `/edit-product/${productId}`;
  // };

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  return (
    <div className="products-container">
      <h2>Home</h2>
      <ul className="products-list">
        {products.map((product) => (
          <li key={product._id} className="product-item">
            <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
            {/* <button className="edit-button" onClick={() => handleEdit(product._id)}>Edit</button> */}
            {/* <button className="delete-button" onClick={() => handleDelete(product._id)}>Delete</button> */}
            <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProducts;