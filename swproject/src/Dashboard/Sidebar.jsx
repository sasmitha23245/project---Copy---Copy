import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { 
  FaUserCircle, FaTachometerAlt, FaUsers, 
  FaCalendarAlt, FaBoxes, FaFileInvoiceDollar, 
  FaChartBar, FaClipboardList, FaCog, FaStickyNote 
} from 'react-icons/fa';

function Sidebar() {
  const [profileImage, setProfileImage] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [showInventoryDropdown, setShowInventoryDropdown] = useState(false);
  const fileInputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfileImage(base64String);
        localStorage.setItem('profileImage', base64String);
        setShowMenu(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem('profileImage');
    setShowMenu(false);
  };

  const handleProfileClick = () => {
    setShowMenu(!showMenu);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleViewImage = () => {
    if (profileImage) {
      window.open(profileImage, '_blank');
      setShowMenu(false);
    }
  };

  return (
    <div className="sidebar">
      {/* Profile Section */}
      <div className="profile-section">
        <div onClick={handleProfileClick} style={{ position: 'relative', cursor: 'pointer' }}>
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-icon-img" />
          ) : (
            <FaUserCircle className="profile-icon" />
          )}

          {showMenu && (
            <div className="profile-menu">
              {profileImage && <button onClick={handleRemoveImage}>Remove image</button>}
              {profileImage && <button onClick={handleViewImage}>View image</button>}
              <button onClick={openFileDialog}>
                {profileImage ? 'Change image' : 'Set image'}
              </button>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />

        <div className="welcome-text">
          <p className="welcome">WELCOME</p>
          <p className="username">Sudesh Rajasekara</p>
          <p className="status">status: <span className="online">online</span></p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'}>
          <FaTachometerAlt /> DASHBOARD
        </NavLink>

        <NavLink to="/meetings" className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'}>
          <FaCalendarAlt /> MEETINGS
        </NavLink>

        {/* People Dropdown */}
        <div className="nav-dropdown">
          <button 
            className={`nav-btn dropdown-toggle ${showPeopleDropdown ? 'active' : ''}`} 
            onClick={() => setShowPeopleDropdown(!showPeopleDropdown)}
          >
            <FaUsers /> PEOPLE
          </button>
          {showPeopleDropdown && (
            <div className="dropdown-menu">
              <NavLink to="/people/employees" className="dropdown-item">Employees</NavLink>
              <NavLink to="/people/customers" className="dropdown-item">Customers</NavLink>
              <NavLink to="/people/suppliers" className="dropdown-item">Suppliers</NavLink>
            </div>
          )}
        </div>

        {/* Inventory Dropdown */}
        <div className="nav-dropdown">
          <button 
            className={`nav-btn dropdown-toggle ${showInventoryDropdown ? 'active' : ''}`} 
            onClick={() => setShowInventoryDropdown(!showInventoryDropdown)}
          >
            <FaBoxes /> INVENTORY
          </button>
          {showInventoryDropdown && (
            <div className="dropdown-menu">
              <NavLink to="/inventory/rawmaterials" className="dropdown-item">Raw Materials</NavLink>
              <NavLink to="/inventory/products" className="dropdown-item">Products</NavLink>
            </div>
          )}
        </div>

        <NavLink to="/finance" className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'}>
          <FaFileInvoiceDollar /> FINANCE
        </NavLink>

        <NavLink to="/reports" className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'}>
          <FaChartBar /> REPORTS
        </NavLink>

        <NavLink to="/orders" className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'}>
          <FaClipboardList /> ORDERS
        </NavLink>

        <NavLink to="/notes" className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'}>
          <FaStickyNote /> NOTES
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-btn active' : 'nav-btn'}>
          <FaCog /> SETTINGS
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
