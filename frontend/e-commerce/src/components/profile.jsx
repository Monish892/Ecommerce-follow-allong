import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error.response?.data?.message || error.message);
        setError(error.response?.data?.message || 'Failed to fetch user profile. Please try again.');
      }
    };
    fetchUserProfile();
  }, []);

  const handleAddOrEditAddress = () => {
    navigate('/address');
  };

  const handleDeleteAddress = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/users/address', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser((prevUser) => ({
        ...prevUser,
        address: null
      }));
    } catch (error) {
      console.error('Error deleting address:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Failed to delete address. Please try again.');
    }
  };

  return (
    <div className="profile-page">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user ? (
        <>
          <div className="profile-section">
            <img
              src={user.profilePhoto ? `http://localhost:5000/${user.profilePhoto}` : 'http://localhost:5000/uploads/default-profile.png'}
              alt="Profile"
              className="profile-photo"
            />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          <div className="address-section">
            <h3>Address</h3>
            {user.address ? (
              <div>
                {user.address.address1}, {user.address.city}, {user.address.country}
                <button onClick={handleAddOrEditAddress}>Edit</button>
                <button onClick={handleDeleteAddress}>Delete</button>
              </div>
            ) : (
              <p>No address found</p>
            )}
            {!user.address && (
              <button className="add-address-button" onClick={handleAddOrEditAddress}>Add Address</button>
            )}
          </div>
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;