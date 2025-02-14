const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const path = require('path');

const port = process.env.port || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://grmonishs65:2007@asap-project.izf50.mongodb.net/sdaa')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('not connected', err));

const authroutes = require('./routes/authroutes');
const productRoutes = require('./routes/productroutes'); 


app.use('/api/auth', authroutes);
app.use('/api/products', productRoutes); 

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
