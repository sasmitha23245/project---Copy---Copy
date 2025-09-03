
import React from 'react';
import './Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';

function Meetings() {
    return (
        <div className="dashboard">
            <Header />

            <div className="dashboard-layout">
                <Sidebar />

                <div className="dashboard-content">
                    <h1>Meetings</h1>
                    
                    <div className="dashboard-card">
                        <p>This is your meeting's workplace. You can schedule, view, and manage meetings here.</p>
                        <p><strong>Start by calling a new meeting or inviting upcoming events.</strong></p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Meetings;