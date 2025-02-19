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

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://grmonishs65:2007@asap-project.izf50.mongodb.net/sdaa')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('not connected', err));

const authroutes = require('./routes/authroutes');
const productRoutes = require('./routes/productroutes'); 
const { use } = require('react');


app.use('/api/auth', authroutes);
app.use('/api/products', productRoutes); 

app.use('/api/users',userRoutes);

app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes); 


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
