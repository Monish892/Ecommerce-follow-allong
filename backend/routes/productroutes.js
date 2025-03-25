const express = require('express');
const Product = require('../models/product');
const multer = require('multer');
const authMiddleware = require('../middleware/authmiddleware');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/', authMiddleware, upload.array('images', 10), async (req, res) => {
  const { name, price, description, category, stock } = req.body;
  const imagePaths = req.files ? req.files.map(file => file.path) : [];

  const product = new Product({ name, price, description, images: imagePaths, category, stock, user: req.user._id });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error); 
    res.status(500).json({ message: 'Error creating product', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error); 
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

router.get('/product', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching user products:', error); 
    res.status(500).json({ message: 'Error fetching user products', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error); 
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

router.put('/:id', authMiddleware, upload.array('images', 10), async (req, res) => {
  const { name, price, description, category, stock } = req.body;
  const imagePaths = req.files ? req.files.map(file => file.path) : [];

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.category = category;
    product.stock = stock;

    if (imagePaths.length > 0) {
      product.images = imagePaths;
    }

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error); 
    res.status(500).json({ message: 'Error updating product', error });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error); 
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

module.exports = router;