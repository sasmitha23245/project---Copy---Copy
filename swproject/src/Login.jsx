
import React, { useState } from 'react';
import './Login.css';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === 'Admin' && password === '1234') {
            navigate('/dashboard');
        } else {
            alert('Invalid username or password');
        }
    };

   return (
        <div className="head">
            <h2>WELCOME to the OPELMATE ERP SYSTEM</h2>

            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <FaUser className="icon" />
                    </div>

                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FaLock className="icon" />
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                    </div>

                    <button className="button" type="submit">
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
