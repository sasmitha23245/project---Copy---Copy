import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';
import './Dashboard.css';

function Customers() {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-content">
          <h1>Customers</h1>
          <p>Manage your customers here.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Customers;
