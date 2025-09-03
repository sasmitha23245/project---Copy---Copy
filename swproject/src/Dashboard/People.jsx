
import React from 'react';
import './Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';

function People() {
    return (
        <div className="dashboard">
            <Header />

            <div className="dashboard-layout">
                <Sidebar />

                <div className="dashboard-content">
                    <h1>People</h1>
                    
                    <div className="dashboard-card">
                        <p>This is your people management section. You can view and manage team members here.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default People;