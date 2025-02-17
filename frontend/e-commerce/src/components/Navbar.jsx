import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {

  const navigate = useNavigate();



  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };



  return (
    <nav className='navbar'>
      <h1 id='cric'>Cricket Cart</h1>
      <ul className='nav-links'> 
        <li><Link to="/">Home</Link></li>
        {/* { <li><Link to="/signup">Sign Up</Link></li>}*/}
        {<li><Link to="/profile">My profile</Link></li>}
        {/* {<li><Link to="/add-product">Add Product</Link></li>} */}
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/product">My Product</Link></li>
        <li><Link to='/orders'>My Orders</Link></li>
      </ul>
        <button className='logout-button' onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
