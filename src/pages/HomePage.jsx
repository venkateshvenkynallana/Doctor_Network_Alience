import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../components/LandingPage.css';

const HomePage = () => {
    const { authUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const features = [
        {
            id: 1,
            icon: '🤝',
            title: 'Professional Network',
            description: 'Connect with verified medical professionals and build meaningful relationships'
        },
        {
            id: 2,
            icon: '📋',
            title: 'Patient Referrals',
            description: 'Streamlined referral system for better patient care coordination'
        },
        {
            id: 3,
            icon: '📚',
            title: 'Knowledge Sharing',
            description: 'Share best practices, research findings, and clinical experiences'
        },
        {
            id: 4,
            icon: '🔒',
            title: 'Secure Platform',
            description: 'HIPAA-compliant secure environment for professional collaboration'
        },
        {
            id: 5,
            icon: '📊',
            title: 'Analytics Dashboard',
            description: 'Track referrals, network growth, and collaboration metrics'
        },
        {
            id: 6,
            icon: '🌍',
            title: 'Global Community',
            description: 'Connect with doctors worldwide for diverse medical perspectives'
        }
    ];

    return (
        <div>
            {/* Header Navigation */}
            <header className="header">
                <div className="nav-container">
                    <div className="logo-section">
                        <img
                            src="DNA_logo_copy.jpg"
                            alt="Doctors Alliance Network Logo"
                            className="logo-img"
                        />
                        <div className="logo-text">Doctors Alliance Network</div>
                    </div>
                    <div className="nav-buttons">
                        <span className="user-welcome">Welcome, Dr. {authUser?.fullName || 'User'}</span>
                        <button className="btn btn-login" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                {/* Hero Section */}
                <section className="hero-section">
                    <h1 className="hero-title">Welcome to Your Dashboard</h1>
                    <p className="hero-subtitle">
                        Dr. {authUser?.fullName}, you are now connected to the Doctors Alliance Network.
                        Explore the features and connect with medical professionals worldwide.
                    </p>
                    <button className="btn btn-register" onClick={() => navigate('/profile')}>
                        View Profile
                    </button>
                </section>

                {/* Overview Section */}
                <section className="overview-section">
                    <h2 className="overview-title">Your Network Overview</h2>
                    <div className="overview-content">
                        <div className="overview-text">
                            <p>
                                <strong>Welcome back, Dr. {authUser?.fullName}!</strong> Your professional network is ready for you to explore.
                            </p>
                            <p>
                                As a {authUser?.designation} specializing in {authUser?.specialization}, you have access to thousands of medical professionals who can help you provide better patient care through collaboration and knowledge sharing.
                            </p>
                            <p>
                                Start connecting with colleagues, sharing your expertise, and building meaningful professional relationships that will enhance your medical practice.
                            </p>
                        </div>
                        <div className="overview-images">
                            <div className="image-card">
                                <img src="https://picsum.photos/seed/medical-collaboration/400/300.jpg" alt="Medical Collaboration" />
                            </div>
                            <div className="image-card">
                                <img src="https://picsum.photos/seed/doctor-network/400/300.jpg" alt="Doctor Network" />
                            </div>
                            <div className="image-card">
                                <img src="https://picsum.photos/seed/patient-care/400/300.jpg" alt="Patient Care" />
                            </div>
                            <div className="image-card">
                                <img src="https://picsum.photos/seed/medical-technology/400/300.jpg" alt="Medical Technology" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <h2 className="features-title">Platform Features</h2>
                    <div className="features-grid">
                        {features.map(feature => (
                            <div key={feature.id} className="feature-card">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
