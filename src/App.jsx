import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/doctorDashboard/Dashboard/Dashboard';
import DNA_logo_copy from './assets/DNA logo copy.jpg.jpeg';
import './App.css';

function App() {
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

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

    return (
        <AuthProvider>
            <AppContent 
                showRegisterForm={showRegisterForm}
                showLoginForm={showLoginForm}
                onLogin={handleLogin}
                onRegister={handleRegister}
                onCloseRegister={handleCloseRegister}
                onCloseLogin={handleCloseLogin}
            />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </AuthProvider>
    );
}

function AppContent({ showRegisterForm, showLoginForm, onLogin, onRegister, onCloseRegister, onCloseLogin }) {
    const { user, login, register, logout } = useAuth();

    const handleLoginSuccess = async (credentials, action = 'login') => {
        console.log('handleLoginSuccess called with:', credentials, action);
        try {
            if (action === 'register') {
                console.log('Calling register function...');
                await register(credentials);
                // Don't automatically log in after registration
                // Just show the login page
            } else {
                console.log('Calling login function...');
                await login(credentials);
            }
            onCloseLogin();
            onCloseRegister();
        } catch (error) {
            console.error('Login/Registration error:', error);
            // Error is handled by the AuthContext with toast notifications
        }
    };

    const handleLogout = async () => {
        await logout();
    };

    if (user) {
        return <Dashboard />;
    }

    return (
        <div>
            <LandingPage onLogin={onLogin} onRegister={onRegister} />
            
            {showRegisterForm && (
                <Register 
                    onClose={onCloseRegister} 
                    onLogin={onLogin}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
            
            {showLoginForm && (
                <Login 
                    onClose={onCloseLogin} 
                    onRegister={onRegister}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </div>
    );
}

export default App;
