import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './infopage.css';

const BASE_URL = 'https://ecommerce-follow-allong-3.onrender.com'; // Directly define the base URL here

const ProductInfoPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError('Error fetching product. Please try again.');
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => setQuantity(Number(e.target.value));

  const handleAddToCart = () => {
    const cartItem = { 
      productId: product._id, 
      name: product.name, 
      price: product.price, 
      image: product.images[0], 
      quantity 
    };
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="product-info">
      <h1>{product.name}</h1>
      <img src={`${BASE_URL}/${product.images[0]}`} alt={product.name} />
      <p>{product.description}</p>
      <h3>Price: ${product.price}</h3>
      <div>
        <label>Quantity: </label>
        <input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductInfoPage;
