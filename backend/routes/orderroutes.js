const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const User = require('../models/user');
const authMiddleware = require('../middleware/authmiddleware');

router.post('/place-order', authMiddleware, async (req, res) => {
  const { products, address } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const orders = products.map(product => ({
      user: user._id,
      orderItems: [{
        name: product.name,
        qty: product.quantity,
        image: product.image,
        price: product.price,
        product: product.productId,
      }],
      shippingAddress: address,
      paymentMethod: 'COD', // Assuming Cash on Delivery for simplicity
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: product.price * product.quantity,
      isPaid: false,
      isDelivered: false,
      isCanceled: false,
    }));

    const createdOrders = await Order.insertMany(orders);

    res.status(201).json({ message: 'Order placed successfully', orders: createdOrders });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all orders for a user
router.get('/user-orders', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const orders = await Order.find({ user: user._id });
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel an order
router.put('/cancel-order/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isCanceled = true;
    await order.save();

    res.status(200).json({ message: 'Order canceled successfully', order });
  } catch (error) {
    console.error('Error canceling order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;