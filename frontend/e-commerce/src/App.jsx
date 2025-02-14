import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import AddProduct from './components/Addproduct';
import './App.css';
import EditProduct from './components/edit';
import Cart from './components/cart';
import MyProducts from './components/myproduct';
import ProductInfoPage from './components/infopage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<MyProducts />} />
        <Route path="/product/:id" element={<ProductInfoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
