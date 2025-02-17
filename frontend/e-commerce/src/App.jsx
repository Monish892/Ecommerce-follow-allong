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
import ProfilePage from './components/profile';
import AddressForm from './components/addres';
import SelectAddress from './components/selectaddress';
import OrderConfirmation from './components/order';
import OrderSuccess from './components/sucess';
import UserOrders from './components/userorder';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


const App = () => {
  return (
        <PayPalScriptProvider options={{ "client-id": "AS-ekrsDQNemBeJ5kdhBnYv6kEMttrnonln7d-mAUMStg46nAdZWuRLzsh4-t6fX58beNq75n7cdfPNa" }}>

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
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/address" element={<AddressForm/>} />
        <Route path="/address/:addressId" element={<AddressForm />} />
        <Route path="/select-address" element={<SelectAddress />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<UserOrders />} />

      </Routes>
    </Router>
    </PayPalScriptProvider>

  );
};

export default App;
