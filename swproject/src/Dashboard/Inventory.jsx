
import React from 'react';
import './Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';

function Inventory() {
    return (
        <div className="dashboard">
            <Header />

            <div className="dashboard-layout">
                <Sidebar />

                <div className="dashboard-content">
                    <h1>Inventory</h1>
                    
                    <div className="dashboard-card">
                        <p>This is your inventory management section. Track and manage your assets here.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Inventory;