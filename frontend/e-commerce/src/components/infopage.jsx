import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './infopage.css';

const ProductInfoPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data); 
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem); 
    localStorage.setItem('cart', JSON.stringify(cart)); 

    alert('Product added to cart!');
  };

  return (
    <div className="product-info">
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : product ? (
        <>
          <h1>{product.name}</h1>
          <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} />
          <p>{product.description}</p>
          <h3>Price: ${product.price}</h3>

          <div>
            <label>Quantity: </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              style={{ width: '50px' }}
            />
          </div>

          <button onClick={handleAddToCart}>Add to Cart</button>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductInfoPage;