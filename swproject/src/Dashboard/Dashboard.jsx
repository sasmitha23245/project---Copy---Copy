
import React from 'react';
import './Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';

function Dashboard() {
    return (
        <div className="dashboard">
            <Header />

            <div className="dashboard-layout">
                <Sidebar />

                <div className="dashboard-content">
                    <h1>Welcome to the Dashboard</h1>
                    <p>You have successfully logged in!</p>

                    <div className="dashboard-card">
                        <p>This is your main workspace. You can add widgets, charts, reports, and more.</p>
                    </div>

                    <div className="dashboard-pa">
                        <p>
                          

                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;