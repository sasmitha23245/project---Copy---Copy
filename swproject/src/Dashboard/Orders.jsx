
import React from 'react';
import './Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';

function Orders() {
    return (
        <div className="dashboard">
            <Header />

            <div className="dashboard-layout">
                <Sidebar />

                <div className="dashboard-content">
                    <h1>Orders</h1>
                    
                    <div className="dashboard-card">
                        <p>This is your orders management section. Track and fulfill orders here.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Orders;