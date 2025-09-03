import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth & Landing
import Login from './Login';
import Index from './Index';

// Main Dashboard pages
import Dashboard from './Dashboard/Dashboard';
import Meetings from './Dashboard/Meetings';
import Finance from './Dashboard/Finance';
import Reports from './Dashboard/Reports';
import Orders from './Dashboard/Orders';
import Notes from './Dashboard/Notes';
import Settings from './Dashboard/Settings';

// People sub-pages
import Employees from './Dashboard/Employees';
import Customers from './Dashboard/Customers';
import Suppliers from './Dashboard/Suppliers';

// Inventory sub-pages
import RawMaterials from './Dashboard/RawMaterials';
import Product from './Dashboard/Product';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />

                {/* Dashboard main */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/meetings" element={<Meetings />} />

                {/* People sub-routes */}
                <Route path="/people/employees" element={<Employees />} />
                <Route path="/people/customers" element={<Customers />} />
                <Route path="/people/suppliers" element={<Suppliers />} />

                {/* Inventory sub-routes */}
                <Route path="/inventory/rawmaterials" element={<RawMaterials />} />
                <Route path="/inventory/products" element={<Product />} />

                {/* Other modules */}
                <Route path="/finance" element={<Finance />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Router>
    );
}

export default App;
