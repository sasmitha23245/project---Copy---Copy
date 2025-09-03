
import React from 'react';
import './Dashboard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';

function Notes() {
    return (
        <div className="dashboard">
            <Header />

            <div className="dashboard-layout">
                <Sidebar />

                <div className="dashboard-content">
                    <h1>Notes</h1>
                    
                    <div className="dashboard-card">
                        <p>This is your notes section. Create and organize your notes here.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Notes;