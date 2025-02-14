import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    images: []
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProduct(response.data);
        setImagePreviews(response.data.images.map(image => `http://localhost:5000/${image}`));
      } catch (error) {
        console.error('Error fetching product:', error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: files });

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('stock', product.stock);
    for (let i = 0; i < product.images.length; i++) {
      formData.append('images', product.images[i]);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/product');
    } catch (error) {
      console.error('Error updating product:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Failed to update product. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
        <input type="file" multiple onChange={handleFileChange} />
        <div className="image-previews">
          {imagePreviews.map((preview, index) => (
            <img key={index} src={preview} alt="Preview" className="image-preview" />
          ))}
        </div>
        <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} required />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;