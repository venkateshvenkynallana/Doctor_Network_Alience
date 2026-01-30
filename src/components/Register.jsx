import React, { useState } from 'react';
import './Register.css';

const Register = ({ onClose, onLogin }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNo: '',
        designation: '',
        specialization: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.fullName.trim()) {
            errors.fullName = 'Full Name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.phoneNo.trim()) {
            errors.phoneNo = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNo.replace(/\s/g, ''))) {
            errors.phoneNo = 'Phone number must be 10 digits';
        }

        if (!formData.designation.trim()) {
            errors.designation = 'Designation is required';
        }

        if (!formData.specialization.trim()) {
            errors.specialization = 'Specialization is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Save user to registered users list
            const newUser = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                phoneNo: formData.phoneNo,
                designation: formData.designation,
                specialization: formData.specialization
            };
            
            // Get existing users from localStorage or initialize empty array
            const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            existingUsers.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

            alert('Registration successful! Welcome to Doctors Alliance Network.');
            handleCloseForm();
        }
    };

    const handleCloseForm = () => {
        setFormData({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNo: '',
            designation: '',
            specialization: ''
        });
        setFormErrors({});
        onClose();
    };

    return (
        <div className="popup-overlay">
            <div className="popup-form">
                <div className="popup-header">
                    <h2>Register with Doctors Alliance Network</h2>
                    <button className="close-btn" onClick={handleCloseForm}>×</button>
                </div>
                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className={formErrors.fullName ? 'error' : ''}
                                placeholder="your full name"
                            />
                            {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={formErrors.email ? 'error' : ''}
                                placeholder="your email id"
                            />
                            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Password *</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={formErrors.password ? 'error' : ''}
                                placeholder="Min. 8 characters"
                            />
                            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label>Confirm Password *</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={formErrors.confirmPassword ? 'error' : ''}
                                placeholder="Re-enter yourpassword"
                            />
                            {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Phone Number *</label>
                            <input
                                type="tel"
                                name="phoneNo"
                                value={formData.phoneNo}
                                onChange={handleInputChange}
                                className={formErrors.phoneNo ? 'error' : ''}
                                placeholder="minimum 10 digits"
                            />
                            {formErrors.phoneNo && <span className="error-message">{formErrors.phoneNo}</span>}
                        </div>
                        <div className="form-group">
                            <label>Designation *</label>
                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleInputChange}
                                className={formErrors.designation ? 'error' : ''}
                                placeholder="your designation"
                            />
                            {formErrors.designation && <span className="error-message">{formErrors.designation}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Specialization *</label>
                            <input
                                type="text"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className={formErrors.specialization ? 'error' : ''}
                                placeholder="your specialization"
                            />
                            {formErrors.specialization && <span className="error-message">{formErrors.specialization}</span>}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={handleCloseForm}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit">
                            Register
                        </button>
                    </div>
                    <div className="login-link">
                        <p>Already registered user? <button className="btn-logins" onClick={() => { handleCloseForm(); onLogin(); }}>Login</button></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
