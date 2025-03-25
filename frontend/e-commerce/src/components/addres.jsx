import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addres.css';

export const BASE_URL = 'https://ecommerce-follow-allong-5.onrender.com';

const AddressForm = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [addressType, setAddressType] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const address = response.data.address;
        if (address) {
          setCountry(address.country);
          setCity(address.city);
          setAddress1(address.address1);
          setAddress2(address.address2);
          setZipCode(address.zipCode);
          setAddressType(address.addressType);
        }
      } catch (error) {
        console.error('Error fetching address:', error.response?.data?.message || error.message);
        setError(error.response?.data?.message || 'Failed to fetch address. Please try again.');
      }
    };
    fetchAddress();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const newAddress = { country, city, address1, address2, zipCode, addressType };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/api/users/address`, newAddress, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      navigate('/profile');
    } catch (error) {
      console.error('Error saving address:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Failed to save address. Please try again.');
    }
  };

  return (
    <div className="address-form-page">
      <h2>Address</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address Line 1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address Line 2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address Type (e.g., Home, Work)"
          value={addressType}
          onChange={(e) => setAddressType(e.target.value)}
          required
        />
        <button type="submit">Save Address</button>
      </form>
    </div>
  );
};

export default AddressForm;
