import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import DNA_logo_copy from './assets/DNA logo copy.jpg.jpeg';
import './App.css';

function App() {
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogin = () => {
        setShowLoginForm(true);
    };

    const handleRegister = () => {
        setShowRegisterForm(true);
    };

    const handleCloseRegister = () => {
        setShowRegisterForm(false);
    };

    const handleCloseLogin = () => {
        setShowLoginForm(false);
    };

    const handleLoginSuccess = (user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        alert('You have been logged out successfully.');
    };

    if (isLoggedIn) {
        return (
            <div>
                <header className="header">
                    <div className="nav-container">
                        <div className="logo-section">
                            <img
                                src={DNA_logo_copy}
                                alt="Doctors Alliance Network Logo"
                                className="logo-img"
                            />
                            <div className="logo-text">Doctors Alliance Network</div>
                        </div>
                        <div className="nav-buttons">
                            <span className="user-welcome">Welcome, Dr. {currentUser?.fullName || 'User'}</span>
                            <button className="btn btn-login" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                        
                    </div>
                </header>
                <main className="main-content">
                    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                        <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>
                            Welcome to Your Dashboard
                        </h1>
                        <p style={{ fontSize: '1.2em', color: '#666' }}>
                            Dr. {currentUser?.fullName}, you are now logged in to the Doctors Alliance Network.
                        </p>
                        <p style={{ fontSize: '1em', color: '#888', marginTop: '10px' }}>
                            Dashboard features will be implemented here.
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div>
            <LandingPage onLogin={handleLogin} onRegister={handleRegister} />
            
            {showRegisterForm && (
                <Register 
                    onClose={handleCloseRegister} 
                    onLogin={handleLogin}
                />
            )}
            
            {showLoginForm && (
                <Login 
                    onClose={handleCloseLogin} 
                    onRegister={handleRegister}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </div>
    );
}

export default App;
