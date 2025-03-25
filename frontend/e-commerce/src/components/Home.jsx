import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const BASE_URL = 'https://ecommerce-follow-allong-5.onrender.com'; // Replace with your actual base URL

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products`, {
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

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="products-container">
      <h2>Home</h2>
      <ul className="products-list">
        {products.map((product) => (
          <li key={product._id} className="product-item" onClick={() => handleProductClick(product)}>
            <img src={`${BASE_URL}/${product.images[0]}`} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProducts;
