import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DNA_logo_copy from './assets/DNA logo copy.jpg.jpeg';
import './App.css';

function App() {
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const { authUser, login, register, logout } = useContext(AuthContext);

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

    const handleLoginSuccess = async (credentials, action = 'login') => {
        try {
            if (action === 'register') {
                await register(credentials);
                // Don't automatically log in after registration
                // Just show the login page
            } else {
                await login(credentials);
            }
            setShowLoginForm(false);
            setShowRegisterForm(false);
        } catch (error) {
            // Error is handled by the AuthContext with toast notifications
        }
    };

    const handleLogout = async () => {
        await logout();
    };

    if (authUser) {
        return <Dashboard />;
    }

    return (
        <div>
            <LandingPage onLogin={handleLogin} onRegister={handleRegister} />
            
            {showRegisterForm && (
                <Register 
                    onClose={handleCloseRegister} 
                    onLogin={handleLogin}
                    onLoginSuccess={handleLoginSuccess}
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
