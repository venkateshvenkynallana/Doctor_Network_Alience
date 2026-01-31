import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../components/LandingPage.css';

const ProfilePage = () => {
    const { authUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    if (!authUser) {
        return null;
    }

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
                        <span className="user-welcome">Welcome, Dr. {authUser.fullName}</span>
                        <button className="btn btn-login" onClick={handleBackToHome}>
                            Home
                        </button>
                        <button className="btn btn-login" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <div style={{ 
                    background: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '20px', 
                    padding: '40px', 
                    margin: '40px auto',
                    maxWidth: '800px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}>
                    <h1 style={{ 
                        fontSize: '2.5em', 
                        marginBottom: '30px',
                        background: 'linear-gradient(45deg, #000000, #dc2626)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textAlign: 'center'
                    }}>
                        Professional Profile
                    </h1>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 2fr', 
                        gap: '40px',
                        alignItems: 'start'
                    }}>
                        {/* Profile Picture Section */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '200px',
                                height: '200px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #dc2626, #000000)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px',
                                fontSize: '4em',
                                color: 'white',
                                fontWeight: 'bold'
                            }}>
                                {authUser.fullName.charAt(0).toUpperCase()}
                            </div>
                            <h3 style={{ 
                                fontSize: '1.5em', 
                                marginBottom: '10px',
                                color: '#333'
                            }}>
                                Dr. {authUser.fullName}
                            </h3>
                            <p style={{ 
                                color: '#666', 
                                fontStyle: 'italic',
                                marginBottom: '20px'
                            }}>
                                {authUser.designation}
                            </p>
                        </div>

                        {/* Profile Details Section */}
                        <div>
                            <div style={{ 
                                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                                padding: '30px', 
                                borderRadius: '15px',
                                border: '2px solid transparent'
                            }}>
                                <h2 style={{ 
                                    fontSize: '1.8em', 
                                    marginBottom: '25px',
                                    color: '#333',
                                    borderBottom: '2px solid #dc2626',
                                    paddingBottom: '10px'
                                }}>
                                    Professional Information
                                </h2>
                                
                                <div style={{ display: 'grid', gap: '20px' }}>
                                    <div>
                                        <label style={{ 
                                            fontWeight: '600', 
                                            color: '#000000', 
                                            fontSize: '0.9em',
                                            display: 'block',
                                            marginBottom: '8px'
                                        }}>
                                            Full Name
                                        </label>
                                        <p style={{ 
                                            fontSize: '1.1em', 
                                            color: '#555',
                                            padding: '10px',
                                            background: 'white',
                                            borderRadius: '8px',
                                            border: '1px solid #e9ecef'
                                        }}>
                                            Dr. {authUser.fullName}
                                        </p>
                                    </div>

                                    <div>
                                        <label style={{ 
                                            fontWeight: '600', 
                                            color: '#000000', 
                                            fontSize: '0.9em',
                                            display: 'block',
                                            marginBottom: '8px'
                                        }}>
                                            Email Address
                                        </label>
                                        <p style={{ 
                                            fontSize: '1.1em', 
                                            color: '#555',
                                            padding: '10px',
                                            background: 'white',
                                            borderRadius: '8px',
                                            border: '1px solid #e9ecef'
                                        }}>
                                            {authUser.email}
                                        </p>
                                    </div>

                                    <div>
                                        <label style={{ 
                                            fontWeight: '600', 
                                            color: '#000000', 
                                            fontSize: '0.9em',
                                            display: 'block',
                                            marginBottom: '8px'
                                        }}>
                                            Phone Number
                                        </label>
                                        <p style={{ 
                                            fontSize: '1.1em', 
                                            color: '#555',
                                            padding: '10px',
                                            background: 'white',
                                            borderRadius: '8px',
                                            border: '1px solid #e9ecef'
                                        }}>
                                            {authUser.phoneNo}
                                        </p>
                                    </div>

                                    <div>
                                        <label style={{ 
                                            fontWeight: '600', 
                                            color: '#000000', 
                                            fontSize: '0.9em',
                                            display: 'block',
                                            marginBottom: '8px'
                                        }}>
                                            Designation
                                        </label>
                                        <p style={{ 
                                            fontSize: '1.1em', 
                                            color: '#555',
                                            padding: '10px',
                                            background: 'white',
                                            borderRadius: '8px',
                                            border: '1px solid #e9ecef'
                                        }}>
                                            {authUser.designation}
                                        </p>
                                    </div>

                                    <div>
                                        <label style={{ 
                                            fontWeight: '600', 
                                            color: '#000000', 
                                            fontSize: '0.9em',
                                            display: 'block',
                                            marginBottom: '8px'
                                        }}>
                                            Specialization
                                        </label>
                                        <p style={{ 
                                            fontSize: '1.1em', 
                                            color: '#555',
                                            padding: '10px',
                                            background: 'white',
                                            borderRadius: '8px',
                                            border: '1px solid #e9ecef'
                                        }}>
                                            {authUser.specialization}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ 
                                marginTop: '30px', 
                                display: 'flex', 
                                gap: '15px',
                                justifyContent: 'flex-end'
                            }}>
                                <button 
                                    className="btn btn-cancel"
                                    onClick={handleBackToHome}
                                    style={{ 
                                        background: 'transparent', 
                                        color: '#666',
                                        border: '2px solid #666',
                                        padding: '12px 25px',
                                        borderRadius: '25px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Back to Home
                                </button>
                                <button 
                                    className="btn btn-submit"
                                    style={{ 
                                        background: 'linear-gradient(45deg, #dc2626, #000000)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px 30px',
                                        borderRadius: '25px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
