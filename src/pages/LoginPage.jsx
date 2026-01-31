import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Register from '../components/Register';
import '../components/Login.css';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: ''
    });
    const [loginErrors, setLoginErrors] = useState({});
    const [registeredUsers, setRegisteredUsers] = useState([]);

    useEffect(() => {
        // Load registered users from localStorage
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        setRegisteredUsers(users);
    }, []);

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (loginErrors[name]) {
            setLoginErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleForgotPasswordInputChange = (e) => {
        const { name, value } = e.target;
        setForgotPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateLogin = () => {
        const errors = {};

        if (!loginData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!loginData.password) {
            errors.password = 'Password is required';
        }

        setLoginErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateForgotPassword = () => {
        const errors = {};
        if (!forgotPasswordData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(forgotPasswordData.email)) {
            errors.email = 'Email is invalid';
        }
        return Object.keys(errors).length === 0;
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (validateLogin()) {
            // Check if user exists in registered users
            const user = registeredUsers.find(u =>
                u.email === loginData.email && u.password === loginData.password
            );

            if (user) {
                login(user);
                alert(`Welcome back, Dr. ${user.fullName}!`);
                navigate('/');
            } else {
                setLoginErrors({
                    general: 'Invalid email or password. Please check your credentials or register first.'
                });
            }
        }
    };

    const handleForgotPassword = () => {
        setShowForgotPassword(true);
    };

    const handleCloseForgotPassword = () => {
        setShowForgotPassword(false);
        setForgotPasswordData({ email: '' });
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        if (validateForgotPassword()) {
            // Check if email exists in registered users
            const user = registeredUsers.find(u => u.email === forgotPasswordData.email);
            if (user) {
                alert(`Password reset link has been sent to ${forgotPasswordData.email}`);
                handleCloseForgotPassword();
            } else {
                alert('This email is not registered. Please check your email or register first.');
            }
        }
    };

    const handleRegister = () => {
        setShowRegisterForm(true);
    };

    const handleCloseRegister = () => {
        setShowRegisterForm(false);
    };

    if (showRegisterForm) {
        return (
            <Register 
                onClose={handleCloseRegister} 
                onLogin={() => setShowRegisterForm(false)}
            />
        );
    }

    if (showForgotPassword) {
        return (
            <div className="forgot-password-overlay">
                <div className="forgot-password-form">
                    <div className="forgot-password-header">
                        <h2>Reset Password</h2>
                        <button className="close-btn" onClick={handleCloseForgotPassword}>×</button>
                    </div>
                    <div className="forgot-password-content">
                        <div className="forgot-password-icon">
                            <span>🔒</span>
                        </div>
                        <h3>Forgot Your Password?</h3>
                        <p>Enter your email address and we'll send you a link to reset your password.</p>
                        <form onSubmit={handleForgotPasswordSubmit} className="forgot-password-form-inner">
                            <div className="forgot-input-group">
                                <label>Email Address</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">📧</span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={forgotPasswordData.email}
                                        onChange={handleForgotPasswordInputChange}
                                        placeholder="Enter your registered email"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="reset-password-btn">
                                Send Reset Link
                            </button>
                            <button type="button" className="back-to-login-btn" onClick={() => { handleCloseForgotPassword(); setShowForgotPassword(false); }}>
                                Back to Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="login-popup-overlay">
            <div className="login-popup-form">
                <div className="login-popup-header">
                    <div className="login-popup-logo">
                        <img src="DNA_logo_copy.jpg" alt="Doctors Alliance Network" />
                        <div className="login-popup-title">
                            <h2>Doctors Alliance Network</h2>
                            <p>Transforming Healthcare Collaboration</p>
                        </div>
                    </div> 
                </div>
                <div className="login-popup-content">
                    <div className="login-popup-left">
                        <div className="login-welcome-section">
                            <h3>Welcome Back</h3>
                            <p>Access your doctor network and connect with healthcare professionals worldwide</p>
                            <div className="login-features-list">
                                <div className="login-feature-item">
                                    <span className="feature-icon">🏥</span>
                                    <span>Connect with Doctor Professionals</span>
                                </div>
                                <div className="login-feature-item">
                                    <span className="feature-icon">🤝</span>
                                    <span>Share Knowledge & Best Practices</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="login-popup-right">
                        <form onSubmit={handleLoginSubmit} className="login-popup-form-inner">
                            {loginErrors.general && (
                                <div className="general-error">
                                    {loginErrors.general}
                                </div>
                            )}
                            <div className="login-input-group">
                                <label>Email Address</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">📧</span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={loginData.email}
                                        onChange={handleLoginInputChange}
                                        className={loginErrors.email ? 'error' : ''}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {loginErrors.email && <span className="error-message">{loginErrors.email}</span>}
                            </div>
                            
                            <div className="login-input-group">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">🔒</span>
                                    <input
                                        type="password"
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleLoginInputChange}
                                        className={loginErrors.password ? 'error' : ''}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                {loginErrors.password && <span className="error-message">{loginErrors.password}</span>}
                            </div>
                            
                            <div className="login-options">
                                <label className="checkbox-label">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    Remember me
                                </label>
                                <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); handleForgotPassword(); }}>Forgot Password?</a>
                            </div>
                            
                            <button type="submit" className="login-submit-btn">
                                Login to Network
                            </button>
                            
                            <div className="new-user-link">
                                <p>New to Doctors Alliance Network? <button className="btn-logins" onClick={handleRegister}>Register Here</button></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
