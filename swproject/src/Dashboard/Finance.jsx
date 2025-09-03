
import React from 'react';
import './Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';

function Finance() {
    return (
        <div className="dashboard">
            <Header />

            <div className="dashboard-layout">
                <Sidebar />

                <div className="dashboard-content">
                    <h1>Finance</h1>
                    
                    <div className="dashboard-card">
                        <p>This is your financial dashboard. View reports and manage transactions here.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Finance;