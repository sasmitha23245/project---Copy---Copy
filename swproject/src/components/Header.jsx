import React from 'react';
import './Header.css';
import logo from '../assets/bgr.png'; 
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ← Add this

function Header() {
  const navigate = useNavigate(); // ← Hook to redirect

  const handleLogout = () => {
    localStorage.clear(); // Or specific keys like localStorage.removeItem("token");
    
    // Redirect to login
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo-section">
        <img src={logo} alt="Opemate Logo" className="logo" />
      </div>
      <div className="spacer" />
      <div className="button-group">
        <button className="header-btn">
          <FaSearch /> SEARCH
        </button>
        <button className="header-btn" onClick={handleLogout}>
          <FaSignOutAlt /> LOGOUT
        </button>
      </div>
    </header>
  );
};

export default Header;
