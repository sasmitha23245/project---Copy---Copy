
import React from 'react';
import './Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';

function Reports() {
    return (
        <div className="dashboard">
            <Header />

            <div className="dashboard-layout">
                <Sidebar />

                <div className="dashboard-content">
                    <h1>Reports</h1>
                    
                    <div className="dashboard-card">
                        <p>This is your reports section. Generate and view business reports here.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Reports;