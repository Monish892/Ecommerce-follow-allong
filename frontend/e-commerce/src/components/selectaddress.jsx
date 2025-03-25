import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './selectaddress.css';

// Define the BASE_URL as a constant
const BASE_URL = 'https://ecommerce-follow-allong-3.onrender.com'; // Replace this with your actual base URL

const SelectAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct;

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/api/users/addresses`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error('Error fetching addresses:', error.response?.data?.message || error.message);
        setError(error.response?.data?.message || 'Failed to fetch addresses. Please try again.');
      }
    };
    fetchAddresses();
  }, []);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleConfirmOrder = () => {
    if (selectedAddress) {
      navigate('/order-confirmation', { state: { selectedAddress, selectedProduct } });
    } else {
      setError('Please select an address.');
    }
  };

  return (
    <div className="select-address-page">
      <h2>Select Delivery Address</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {addresses.length > 0 ? (
        <ul>
          {addresses.map((address, index) => (
            <li key={index} className={selectedAddress === address ? 'selected' : ''}>
              {address.address1}, {address.city}, {address.country}
              <button onClick={() => handleSelectAddress(address)}>Select</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No addresses found</p>
      )}
      <button className="confirm-order-button" onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
  );
};

export default SelectAddress;
