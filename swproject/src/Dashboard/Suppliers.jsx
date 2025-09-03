import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';
import './Dashboard.css';

function Suppliers() {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-content">
          <h1>Suppliers</h1>
          <p>Manage your suppliers here.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Suppliers;
