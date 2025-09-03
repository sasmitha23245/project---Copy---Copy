
import React from 'react';
import './Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';

function Settings() {
    return (
        <div className="dashboard">
            <Header />

            <div className="dashboard-layout">
                <Sidebar />

                <div className="dashboard-content">
                    <h1>Settings</h1>
                    
                    <div className="dashboard-card">
                        <p>This is your settings panel. Configure your application preferences here.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Settings;