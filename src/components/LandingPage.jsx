import React from 'react';
import DNA_logo_copy from '../assets/DNA logo copy.jpg-Photoroom.png';
import './LandingPage.css';

const LandingPage = ({ onLogin, onRegister }) => {
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
                            src={DNA_logo_copy}
                            alt="Doctors Alliance Network Logo"
                            className="logo-img"
                        />
                        <div className="logo-text">Doctors Network Alliance</div>
                    </div>
                    <div className="nav-buttons">
                        <button className="btn btn-login" onClick={onLogin}>
                            Login
                        </button>
                        <button className="btn btn-register" onClick={onRegister}>
                            Register
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
        <main className="landing-container">

            <div className="landing-main-content">
                {/* Hero Section */}
                <section className="hero-section">
                    <h1 className="hero-title">Transforming Healthcare Collaboration</h1>
                    <p className="hero-subtitle">
                        Join thousands of medical professionals building stronger networks,
                        sharing knowledge, and improving patient outcomes together.
                    </p>
                    <button className="btn btn-register" onClick={onRegister}>
                        Join Our Network Today
                    </button>
                </section>

                {/* Overview Section */}
                <section className="overview-section">
                    <h2 className="overview-title">Overview of Application</h2>
                    <div className="overview-content">
                        <div className="overview-text">
                            <p>
                                <strong>Doctors Alliance Network</strong> is a professional collaboration platform where doctors connect with other doctors to share knowledge, referrals, and best practices, with the main focus on better patient care.
                            </p>
                            <p>
                                Our platform bridges the gap between medical professionals, creating a seamless environment for collaboration that ultimately leads to improved healthcare outcomes. Whether you're looking to refer a patient to a specialist, seek a second opinion, or stay updated with the latest medical practices, our network provides the tools and connections you need.
                            </p>
                            <p>
                                With advanced security features and HIPAA compliance, you can collaborate with confidence knowing that patient information and professional discussions remain protected at all times.
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
            </div>
        </main>
        </div>
    );
};

export default LandingPage;
