const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middleware/authMiddleware');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add or update address
router.post('/address', authMiddleware, async (req, res) => {
  const { country, city, address1, address2, zipCode, addressType } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.address = { country, city, address1, address2, zipCode, addressType };
    await user.save();

    res.status(200).json({ message: 'Address saved successfully', address: user.address });
  } catch (error) {
    console.error('Error saving address:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete address
router.delete('/address', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.address = null;
    await user.save();

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all addresses of the user
router.get('/addresses', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('address');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ addresses: [user.address] });
    } catch (error) {
      console.error('Error fetching addresses:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get address by ID
  router.get('/address/:id', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const address = user.addresses.id(req.params.id);
      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }
      res.json(address);
    } catch (error) {
      console.error('Error fetching address:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Add or update address
  router.post('/address', authMiddleware, async (req, res) => {
    const { country, city, address1, address2, zipCode, addressType } = req.body;
  
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.address = { country, city, address1, address2, zipCode, addressType };
      await user.save();
  
      res.status(200).json({ message: 'Address saved successfully', address: user.address });
    } catch (error) {
      console.error('Error saving address:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Update address
  router.put('/address/:id', authMiddleware, async (req, res) => {
    const { country, city, address1, address2, zipCode, addressType } = req.body;
  
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const address = user.addresses.id(req.params.id);
      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }
  
      address.country = country;
      address.city = city;
      address.address1 = address1;
      address.address2 = address2;
      address.zipCode = zipCode;
      address.addressType = addressType;
  
      await user.save();
  
      res.status(200).json({ message: 'Address updated successfully', address: user.address });
    } catch (error) {
      console.error('Error updating address:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Delete address
  router.delete('/address', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.address = null;
      await user.save();
  
      res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
      console.error('Error deleting address:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;
module.exports = router;