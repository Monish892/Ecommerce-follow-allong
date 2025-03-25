const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const path = require('path');
const userRoutes = require('./routes/userroutes');
const orderRoutes = require('./routes/orderroutes'); 
const cartRoutes = require('./routes/cartroutes'); 

const port = process.env.port || 5000;

// Define the CORS options to allow multiple frontend origins
const corsOptions = {
  origin: [
    'https://ecommerce-follow-allong-rn45.vercel.app', // Your first Vercel frontend domain
    'http://localhost:5173' 
  ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowing the necessary HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
};

app.use(cors(corsOptions)); // Apply CORS with the defined options

app.use(express.json());

mongoose.connect('mongodb+srv://grmonishs65:2007@asap-project.izf50.mongodb.net/sdaa')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('not connected', err));

const authroutes = require('./routes/authroutes');
const productRoutes = require('./routes/productroutes'); 

app.use('/api/auth', authroutes);
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Serving uploaded files
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
