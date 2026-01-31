import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import DNA_logo_copy from '../assets/DNA logo copy.jpg.jpeg';
import './Dashboard.css';

const Dashboard = () => {
    const { authUser, logout, updateProfile } = useContext(AuthContext);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [activeSection, setActiveSection] = useState('resume');

    console.log('Dashboard render - showEditProfile:', showEditProfile, 'authUser:', authUser);

    const handleLogout = async () => {
        await logout();
    };

    const handleEditProfile = () => {
        setShowEditProfile(true);
    };

    const handleCloseEditProfile = () => {
        console.log('Closing edit profile...');
        setShowEditProfile(false);
        // Force a re-render by clearing any lingering state
        setActiveSection('resume');
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(sectionId);
    };

    if (showEditProfile) {
        return <EditProfile onClose={handleCloseEditProfile} authUser={authUser} updateProfile={updateProfile} />;
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
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
                        <span className="user-welcome">Welcome, Dr. {authUser?.fullName || authUser?.name || 'User'}</span>
                        <div className="profile-icon" onClick={handleEditProfile}>
                            <div className="profile-avatar">
                                {authUser?.fullName?.charAt(0)?.toUpperCase() || 'D'}
                            </div>
                        </div>
                        <button className="btn btn-logout" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="dashboard-main">
                <div className="dashboard-content">
                    <h1 className="dashboard-title">Doctor Dashboard</h1>
                    <p className="dashboard-subtitle">
                        Welcome to your professional medical network dashboard
                    </p>

                    <div className="dashboard-grid">
                        <div className="dashboard-card">
                            <h3>Profile Completion</h3>
                            <div className="completion-bar">
                                <div className="completion-fill" style={{ width: '75%' }}></div>
                            </div>
                            <p>75% Complete</p>
                        </div>

                        <div className="dashboard-card">
                            <h3>Network Connections</h3>
                            <p className="card-number">248</p>
                            <p>Medical Professionals</p>
                        </div>

                        <div className="dashboard-card">
                            <h3>Appointments</h3>
                            <p className="card-number">12</p>
                            <p>This Week</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const EditProfile = ({ onClose, authUser, updateProfile }) => {
    const [activeSection, setActiveSection] = useState('resume');
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(
        `https://ui-avatars.com/api/?name=${authUser?.fullName || 'Doctor'}&background=dc2626&color=fff&size=128`
    );
    const [isSaving, setIsSaving] = useState(false);
    const [skills, setSkills] = useState(['Patient Care', 'Diagnosis', 'Medical Research']);
    const [skillInput, setSkillInput] = useState('');

    const quickLinks = [
        { id: 'resume', label: 'Resume', icon: '📄' },
        { id: 'headline', label: 'Resume Headline', icon: '💼' },
        { id: 'skills', label: 'Key Skills', icon: '🔑' },
        { id: 'experience', label: 'Experience', icon: '🏥' },
        { id: 'education', label: 'Education', icon: '🎓' },
        { id: 'licenses', label: 'Licenses', icon: '📜' },
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(sectionId);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImageUrl(e.target.result);
                setProfileImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('profile-image-input').click();
    };

    const addSkill = () => {
        const trimmedSkill = skillInput.trim();
        if (trimmedSkill && !skills.includes(trimmedSkill)) {
            setSkills([...skills, trimmedSkill]);
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleSkillInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    const handleSaveProfile = async () => {
        try {
            setIsSaving(true);

            const formData = new FormData();

            // ===== profile image =====
            if (profileImage) {
                formData.append("profilepic", profileImage);
            }

            // ===== basic fields =====
            const bio = document.querySelector(
                'textarea[name="professionalSummary"]'
            )?.value?.trim();

            if (bio) {
                formData.append("bio", bio);
            }

            // ===== profile object (IMPORTANT) =====
            const profile = {};

            const professionalHeadline = document.querySelector(
                'input[name="professionalHeadline"]'
            )?.value?.trim();
            if (professionalHeadline) {
                profile.professionalHeadline = professionalHeadline;
            }

            // skills (state)
            if (skills.length > 0) {
                profile.skills = skills;
            }

            // ===== experience =====
            const experience = {};
            const jobTitle = document.querySelector('input[name="jobTitle"]')?.value?.trim();
            const hospital = document.querySelector('input[name="hospital"]')?.value?.trim();
            const duration = document.querySelector('input[name="duration"]')?.value?.trim();
            const description = document.querySelector(
                'textarea[name="experienceDescription"]'
            )?.value?.trim();

            if (jobTitle) experience.jobTitle = jobTitle;
            if (hospital) experience.hospital = hospital;
            if (duration) experience.duration = duration;
            if (description) experience.description = description;

            if (Object.keys(experience).length > 0) {
                profile.experience = experience;
            }

            // ===== education =====
            const education = {};
            const degree = document.querySelector('input[name="degree"]')?.value?.trim();
            const university = document.querySelector('input[name="university"]')?.value?.trim();
            const year = document.querySelector('input[name="educationYear"]')?.value?.trim();

            if (degree) education.degree = degree;
            if (university) education.university = university;
            if (year) education.year = year;

            if (Object.keys(education).length > 0) {
                profile.education = education;
            }

            // ===== certifications =====
            const certifications = {};
            const name = document.querySelector('input[name="licenseName"]')?.value?.trim();
            const issuingOrganization = document.querySelector(
                'input[name="issuingOrganization"]'
            )?.value?.trim();
            const validUntil = document.querySelector(
                'input[name="validUntil"]'
            )?.value?.trim();

            if (name) certifications.name = name;
            if (issuingOrganization)
                certifications.issuingOrganization = issuingOrganization;
            if (validUntil) certifications.validUntil = validUntil;

            if (Object.keys(certifications).length > 0) {
                profile.certifications = certifications;
            }

            // ===== append profile as JSON STRING =====
            if (Object.keys(profile).length > 0) {
                formData.append("profile", JSON.stringify(profile));
            }

            // 🔍 DEBUG (VERY IMPORTANT)
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            // ===== API CALL =====
            await updateProfile(formData);

            setIsSaving(false);
            onClose();
        } catch (error) {
            console.error("Profile update failed", error);
            setIsSaving(false);
        }
    };


    return (
        <div className="edit-profile-overlay">
            <div className="edit-profile-container">
                <div className="edit-profile-header">
                    <div className="profile-header-left">
                        <div className="profile-picture-section">
                            <div className="profile-picture">
                                <img src={profileImageUrl} alt="Profile" />
                                <button className="edit-photo-btn" onClick={triggerFileInput}>
                                    <span>📷</span>
                                </button>
                                <input
                                    id="profile-image-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <div className="profile-completion">
                                <h3>Profile Completion</h3>
                                <div className="completion-bar">
                                    <div className="completion-fill" style={{ width: '75%' }}></div>
                                </div>
                                <p>75% Complete</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile-header-right">
                        <button
                            className="save-profile-btn"
                            onClick={handleSaveProfile}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Profile'}
                        </button>
                        <button className="close-btn" onClick={onClose} disabled={isSaving}>×</button>
                    </div>
                </div>

                <div className="edit-profile-content">
                    <div className="profile-sidebar">
                        <div className="quick-links">
                            <h3>Quick links</h3>
                            <ul>
                                {quickLinks.map(link => (
                                    <li
                                        key={link.id}
                                        className={activeSection === link.id ? 'active' : ''}
                                        onClick={() => scrollToSection(link.id)}
                                    >
                                        <span className="link-icon">{link.icon}</span>
                                        <span className="link-text">{link.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="profile-main-content">
                        <div className="profile-sections">
                            <section id="resume" className="profile-section">
                                <h2>Resume</h2>
                                <div className="section-content">
                                    <div className="form-group">
                                        <label>Professional Summary</label>
                                        <textarea
                                            name="professionalSummary"
                                            placeholder="Write a brief summary about your professional background..."
                                            rows="4"
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Specialization</label>
                                        <input
                                            type="text"
                                            name="specialization"
                                            placeholder="e.g., Cardiology, Neurology"
                                            defaultValue={authUser?.specialization}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section id="headline" className="profile-section">
                                <h2>Resume Headline</h2>
                                <div className="section-content">
                                    <div className="form-group">
                                        <label>Professional Headline</label>
                                        <input
                                            type="text"
                                            name="professionalHeadline"
                                            placeholder="e.g., Senior Cardiologist with 10+ years of experience"
                                            maxLength="100"
                                        />
                                        <small>Maximum 100 characters</small>
                                    </div>
                                </div>
                            </section>

                            <section id="skills" className="profile-section">
                                <h2>Key Skills</h2>
                                <div className="section-content">
                                    <div className="form-group">
                                        <label>Professional Skills</label>
                                        <div className="skills-input">
                                            <input
                                                type="text"
                                                name="skillsInput"
                                                placeholder="Add a skill and press Enter"
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyPress={handleSkillInputKeyPress}
                                            />
                                            <button type="button" className="add-skill-btn" onClick={addSkill}>Add</button>
                                        </div>
                                        <div className="skills-tags">
                                            {skills.map((skill, index) => (
                                                <span key={index} className="skill-tag">
                                                    {skill}
                                                    <button type="button" onClick={() => removeSkill(skill)}>×</button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section id="experience" className="profile-section">
                                <h2>Experience</h2>
                                <div className="section-content">
                                    <div className="experience-item">
                                        <div className="form-group">
                                            <label>Job Title</label>
                                            <input
                                                type="text"
                                                name="jobTitle"
                                                placeholder="e.g., Senior Cardiologist"
                                            />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Hospital/Clinic</label>
                                                <input
                                                    type="text"
                                                    name="hospital"
                                                    placeholder="e.g., City General Hospital"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Duration</label>
                                                <input
                                                    type="text"
                                                    name="duration"
                                                    placeholder="e.g., 2018 - Present"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea
                                                name="experienceDescription"
                                                placeholder="Describe your responsibilities and achievements..."
                                                rows="3"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section id="education" className="profile-section">
                                <h2>Education</h2>
                                <div className="section-content">
                                    <div className="education-item">
                                        <div className="form-group">
                                            <label>Degree</label>
                                            <input
                                                type="text"
                                                name="degree"
                                                placeholder="e.g., MBBS, MD"
                                            />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>University</label>
                                                <input
                                                    type="text"
                                                    name="university"
                                                    placeholder="e.g., Harvard Medical School"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Year</label>
                                                <input
                                                    type="text"
                                                    name="educationYear"
                                                    placeholder="e.g., 2010"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section id="licenses" className="profile-section">
                                <h2>Licenses & Certifications</h2>
                                <div className="section-content">
                                    <div className="license-item">
                                        <div className="form-group">
                                            <label>License/Certification Name</label>
                                            <input
                                                type="text"
                                                name="licenseName"
                                                placeholder="e.g., Medical License"
                                            />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Issuing Organization</label>
                                                <input
                                                    type="text"
                                                    name="issuingOrganization"
                                                    placeholder="e.g., Medical Council"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Valid Until</label>
                                                <input
                                                    type="text"
                                                    name="validUntil"
                                                    placeholder="e.g., 2025"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="profile-section diversity-section">
                                <h2>Diversity & Inclusion</h2>
                                <div className="section-content">
                                    <div className="disclaimer">
                                        <p>Doctors Alliance Network is committed to fostering an inclusive environment. Providing this information is voluntary and helps us improve our platform.</p>
                                    </div>
                                    <div className="disability-options">
                                        <label className="radio-label">
                                            <input type="radio" name="disability" />
                                            <span className="radio-custom"></span>
                                            I have a disability
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="disability" />
                                            <span className="radio-custom"></span>
                                            I don't have a disability
                                        </label>
                                    </div>
                                    <button type="button" className="submit-btn">Submit</button>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
