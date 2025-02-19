const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const authMiddleware = require('../middleware/authmiddleware');

router.put('/update-quantity', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const product = cart.items.find(item => item.productId.toString() === productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    product.quantity += quantity;
    if (product.quantity <= 0) {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    }

    await cart.save();
    res.status(200).json({ message: 'Quantity updated successfully', cart });
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;