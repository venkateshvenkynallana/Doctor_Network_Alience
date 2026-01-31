import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Briefcase, FileText, Save, Camera, Plus, X, Edit2, Check, Upload, Award, Star } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showProfilePreview, setShowProfilePreview] = useState(false);
  const { user, updateUserProfile } = useAuth();
  
  const [profileData, setProfileData] = useState({
    professionalTitle: '',
    fullName: '',
    email: '',
    phone: '',
    professionalSummary: '',
    designation: '',
    workingHospital: '',
    yearsOfExperience: '',
    profileImage: null,
    keySkills: [],
    experience: [],
    education: [],
    interests: [],
    achievements: [],
    certifications: []
  });

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || user.phoneNo || '',
        professionalSummary: user.professionalSummary || user.bio || '',
        designation: user.designation || '',
        workingHospital: user.workingHospital || user.profile?.experience?.hospital || '',
        yearsOfExperience: user.yearsOfExperience || user.profile?.experience?.duration || '',
        profileImage: user.profileImage || user.profilepic || null,
        professionalTitle: user.professionalTitle || user.profile?.professionalHeadline || '',
        keySkills: user.keySkills || user.profile?.skills || [],
        experience: user.experience || (user.profile?.experience ? [{
          hospitalName: user.profile.experience.hospital,
          duration: user.profile.experience.duration,
          years: user.profile.experience.duration,
          description: user.profile.experience.description,
          jobTitle: user.profile.experience.jobTitle,
          id: Date.now()
        }] : []),
        education: user.education || (user.profile?.education ? [{
          degree: user.profile.education.degree,
          institution: user.profile.education.university,
          year: user.profile.education.year,
          id: Date.now()
        }] : []),
        interests: user.interests || [],
        achievements: user.achievements || [],
        certifications: user.certifications || (user.profile?.certifications ? [{
          name: user.profile.certifications.name,
          organization: user.profile.certifications.issuingOrganization,
          validUntil: user.profile.certifications.validUntil,
          id: Date.now()
        }] : [])
      }));
    }
  }, [user]);

  const [newEducation, setNewEducation] = useState({ degree: '', institution: '', year: '' });
  const [newInterest, setNewInterest] = useState('');
  const [newAchievement, setNewAchievement] = useState({ title: '', organization: '' });
  const [newSkill, setNewSkill] = useState('');
  const [newExperience, setNewExperience] = useState({ hospitalName: '', duration: '', years: '', description: '' });
  const [newCertification, setNewCertification] = useState({ name: '', image: null });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCertificationImageUpload = (e, certificationId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          certifications: prev.certifications.map(cert => 
            cert.id === certificationId ? { ...cert, image: reader.result } : cert
          )
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.year) {
      setProfileData(prev => ({
        ...prev,
        education: [...prev.education, { ...newEducation, id: Date.now() }]
      }));
      setNewEducation({ degree: '', institution: '', year: '' });
    }
  };

  const removeEducation = (id) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addInterest = () => {
    if (newInterest && !profileData.interests.includes(newInterest)) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter(int => int !== interest)
    }));
  };

  const addAchievement = () => {
    if (newAchievement.title && newAchievement.organization) {
      setProfileData(prev => ({
        ...prev,
        achievements: [...prev.achievements, { ...newAchievement, id: Date.now() }]
      }));
      setNewAchievement({ title: '', organization: '' });
    }
  };

  const removeAchievement = (id) => {
    setProfileData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(ach => ach.id !== id)
    }));
  };

  const addSkill = () => {
    if (newSkill && !profileData.keySkills.includes(newSkill)) {
      setProfileData(prev => ({
        ...prev,
        keySkills: [...prev.keySkills, newSkill]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setProfileData(prev => ({
      ...prev,
      keySkills: prev.keySkills.filter(s => s !== skill)
    }));
  };

  const addExperience = () => {
    if (newExperience.hospitalName && newExperience.duration && newExperience.years) {
      setProfileData(prev => ({
        ...prev,
        experience: [...prev.experience, { ...newExperience, id: Date.now() }]
      }));
      setNewExperience({ hospitalName: '', duration: '', years: '', description: '' });
    }
  };

  const removeExperience = (id) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addCertification = () => {
    if (newCertification.name) {
      setProfileData(prev => ({
        ...prev,
        certifications: [...prev.certifications, { ...newCertification, id: Date.now() }]
      }));
      setNewCertification({ name: '', image: null });
    }
  };

  const removeCertification = (id) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    updateUserProfile(profileData);
    console.log('Profile data saved:', profileData);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-header-content">
          <h1>Profile Settings</h1>
          <p>Manage your personal and professional information</p>
        </div>
        <div className="profile-actions">
          <button className="btn-view-profile" onClick={() => setShowProfilePreview(true)}>
            <User className="btn-icon" />
            View Profile
          </button>
          {!isEditing ? (
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              <Edit2 className="btn-icon" />
              Edit Profile
            </button>
          ) : (
            <button className="btn-save" onClick={handleSave}>
              <Check className="btn-icon" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="profile-content">
        {/* Personal Information Section */}
        <div className="profile-section">
          <div className="section-header">
            <User className="section-icon" />
            <h2>Personal Information</h2>
          </div>
          <div className="section-content">
            <div className="personal-info-layout">
              {/* Profile Image on Left Side */}
              <div className="profile-image-section">
                <div className="profile-image-wrapper">
                  {profileData.profileImage ? (
                    <img src={profileData.profileImage} alt="Profile" className="profile-image" />
                  ) : (
                    <div className="profile-image-placeholder">
                      <User size={48} />
                    </div>
                  )}
                  {isEditing && (
                    <div className="profile-image-upload">
                      <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label htmlFor="profileImage" className="upload-btn">
                        <Upload size={20} />
                        Upload Photo
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Fields on Right Side */}
              <div className="form-fields-section">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      disabled={!isEditing}
                      className="form-input"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="form-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="form-input"
                      placeholder="your phone number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Information Section */}
        <div className="profile-section">
          <div className="section-header">
            <Briefcase className="section-icon" />
            <h2>Professional Information</h2>
          </div>
          <div className="section-content">
            <div className="professional-form-grid">
              <div className="form-group full-width">
                <label htmlFor="professionalSummary">Professional Summary</label>
                <textarea
                  id="professionalSummary"
                  value={profileData.professionalSummary}
                  onChange={(e) => handleInputChange('professionalSummary', e.target.value)}
                  disabled={!isEditing}
                  className="form-textarea"
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label htmlFor="designation">Designation</label>
                <input
                  type="text"
                  id="designation"
                  value={profileData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="workingHospital">Working Hospital</label>
                <input
                  type="text"
                  id="workingHospital"
                  value={profileData.workingHospital}
                  onChange={(e) => handleInputChange('workingHospital', e.target.value)}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="yearsOfExperience">Total Years of Experience</label>
                <input
                  type="text"
                  id="yearsOfExperience"
                  value={profileData.yearsOfExperience}
                  onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Key Skills Section */}
        <div className="profile-section">
          <div className="section-header">
            <Star className="section-icon" />
            <h2>Key Skills</h2>
          </div>
          <div className="section-content">
            <div className="tags-container">
              {profileData.keySkills.map((skill, index) => (
                <div key={index} className="tag">
                  {skill}
                  {isEditing && (
                    <button
                      className="tag-remove"
                      onClick={() => removeSkill(skill)}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="add-tag-form">
                  <input
                    type="text"
                    placeholder="Add skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    className="tag-input"
                  />
                  <button className="btn-add" onClick={addSkill}>
                    <Plus size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="profile-section">
          <div className="section-header">
            <Briefcase className="section-icon" />
            <h2>Work Experience</h2>
          </div>
          <div className="section-content">
            <div className="dynamic-list">
              {profileData.experience.map((exp) => (
                <div key={exp.id} className="list-item">
                  <div className="item-content">
                    <div className="item-title">{exp.hospitalName}</div>
                    <div className="item-subtitle">{exp.duration} • {exp.years} years</div>
                    <div className="item-description">{exp.description}</div>
                  </div>
                  {isEditing && (
                    <button
                      className="btn-remove"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="add-item-form">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Hospital Name"
                      value={newExperience.hospitalName}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, hospitalName: e.target.value }))}
                      className="form-input small"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., 2018 - Present)"
                      value={newExperience.duration}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, duration: e.target.value }))}
                      className="form-input small"
                    />
                    <input
                      type="text"
                      placeholder="Years"
                      value={newExperience.years}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, years: e.target.value }))}
                      className="form-input small"
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Description"
                      value={newExperience.description}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                      className="form-input"
                    />
                    <button className="btn-add" onClick={addExperience}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="profile-section">
          <div className="section-header">
            <FileText className="section-icon" />
            <h2>Education & Qualifications</h2>
          </div>
          <div className="section-content">
            <div className="dynamic-list">
              {profileData.education.map((edu) => (
                <div key={edu.id} className="list-item">
                  <div className="item-content">
                    <div className="item-title">{edu.degree}</div>
                    <div className="item-subtitle">{edu.institution}</div>
                    <div className="item-year">{edu.year}</div>
                  </div>
                  {isEditing && (
                    <button
                      className="btn-remove"
                      onClick={() => removeEducation(edu.id)}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="add-item-form">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Degree/Certificate"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                      className="form-input small"
                    />
                    <input
                      type="text"
                      placeholder="Institution"
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                      className="form-input small"
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      value={newEducation.year}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, year: e.target.value }))}
                      className="form-input small"
                    />
                    <button className="btn-add" onClick={addEducation}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="profile-section">
          <div className="section-header">
            <User className="section-icon" />
            <h2>Professional Interests</h2>
          </div>
          <div className="section-content">
            <div className="tags-container">
              {profileData.interests.map((interest, index) => (
                <div key={index} className="tag">
                  {interest}
                  {isEditing && (
                    <button
                      className="tag-remove"
                      onClick={() => removeInterest(interest)}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="add-tag-form">
                  <input
                    type="text"
                    placeholder="Add interest"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                    className="tag-input"
                  />
                  <button className="btn-add" onClick={addInterest}>
                    <Plus size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="profile-section">
          <div className="section-header">
            <Award className="section-icon" />
            <h2>Achievements & Awards</h2>
          </div>
          <div className="section-content">
            <div className="dynamic-list">
              {profileData.achievements.map((achievement) => (
                <div key={achievement.id} className="list-item">
                  <div className="item-content">
                    <div className="item-title">{achievement.title}</div>
                    <div className="item-subtitle">{achievement.organization}</div>
                  </div>
                  {isEditing && (
                    <button
                      className="btn-remove"
                      onClick={() => removeAchievement(achievement.id)}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="add-item-form">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Achievement/Award Title"
                      value={newAchievement.title}
                      onChange={(e) => setNewAchievement(prev => ({ ...prev, title: e.target.value }))}
                      className="form-input small"
                    />
                    <input
                      type="text"
                      placeholder="Organization"
                      value={newAchievement.organization}
                      onChange={(e) => setNewAchievement(prev => ({ ...prev, organization: e.target.value }))}
                      className="form-input small"
                    />
                    <button className="btn-add" onClick={addAchievement}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="profile-section">
          <div className="section-header">
            <Award className="section-icon" />
            <h2>Certifications</h2>
          </div>
          <div className="section-content">
            <div className="dynamic-list">
              {profileData.certifications.map((certification) => (
                <div key={certification.id} className="list-item certification-item">
                  <div className="item-content">
                    <div className="item-title">{certification.name}</div>
                    {certification.image && (
                      <div className="certification-image">
                        <img src={certification.image} alt={certification.name} />
                      </div>
                    )}
                  </div>
                  <div className="certification-actions">
                    {isEditing && (
                      <>
                        <div className="certification-upload">
                          <input
                            type="file"
                            id={`cert-${certification.id}`}
                            accept="image/*"
                            onChange={(e) => handleCertificationImageUpload(e, certification.id)}
                            className="hidden"
                          />
                          <label htmlFor={`cert-${certification.id}`} className="upload-btn-small">
                            <Upload size={16} />
                          </label>
                        </div>
                        <button
                          className="btn-remove"
                          onClick={() => removeCertification(certification.id)}
                        >
                          <X size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {isEditing && (
                <div className="add-item-form">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Certification Name"
                      value={newCertification.name}
                      onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                      className="form-input"
                    />
                    <button className="btn-add" onClick={addCertification}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Preview Modal */}
      {showProfilePreview && (
        <div className="profile-preview-overlay" onClick={() => setShowProfilePreview(false)}>
          <div className="profile-preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="preview-header">
              <h2>Doctor Profile Preview</h2>
              <button className="btn-close-preview" onClick={() => setShowProfilePreview(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="preview-content">
              {/* Profile Header */}
              <div className="preview-profile-header">
                <div className="preview-profile-image">
                  {profileData.profileImage ? (
                    <img src={profileData.profileImage} alt="Profile" />
                  ) : (
                    <div className="preview-image-placeholder">
                      <User size={60} />
                    </div>
                  )}
                </div>
                <div className="preview-basic-info">
                  <h1>{profileData.fullName || 'Name not provided'}</h1>
                  <p className="preview-designation">{profileData.designation || 'Designation not provided'}</p>
                  <p className="preview-hospital">{profileData.workingHospital || 'Hospital not provided'}</p>
                  <div className="preview-contact">
                    <div className="contact-item">
                      <Mail size={16} />
                      <span>{profileData.email || 'Email not provided'}</span>
                    </div>
                    <div className="contact-item">
                      <Phone size={16} />
                      <span>{profileData.phone || 'Phone not provided'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="preview-section">
                <h3><FileText size={20} /> Professional Summary</h3>
                <p>{profileData.professionalSummary || 'Professional summary not provided'}</p>
              </div>

              {/* Key Skills */}
              <div className="preview-section">
                <h3><Star size={20} /> Key Skills</h3>
                <div className="preview-skills">
                  {profileData.keySkills.length > 0 ? (
                    profileData.keySkills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))
                  ) : (
                    <p className="no-data">No skills added yet</p>
                  )}
                </div>
              </div>

              {/* Experience */}
              <div className="preview-section">
                <h3><Briefcase size={20} /> Work Experience</h3>
                <div className="preview-experience">
                  {profileData.experience.length > 0 ? (
                    profileData.experience.map((exp) => (
                      <div key={exp.id} className="experience-item">
                        <h4>{exp.hospitalName}</h4>
                        <p className="exp-duration">{exp.duration} • {exp.years} years</p>
                        <p className="exp-description">{exp.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No experience added yet</p>
                  )}
                </div>
              </div>

              {/* Education */}
              <div className="preview-section">
                <h3><FileText size={20} /> Education</h3>
                <div className="preview-education">
                  {profileData.education.length > 0 ? (
                    profileData.education.map((edu) => (
                      <div key={edu.id} className="education-item">
                        <h4>{edu.degree}</h4>
                        <p>{edu.institution} • {edu.year}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No education details added yet</p>
                  )}
                </div>
              </div>

              {/* Interests */}
              <div className="preview-section">
                <h3><User size={20} /> Professional Interests</h3>
                <div className="preview-interests">
                  {profileData.interests.length > 0 ? (
                    profileData.interests.map((interest, index) => (
                      <span key={index} className="interest-tag">{interest}</span>
                    ))
                  ) : (
                    <p className="no-data">No interests added yet</p>
                  )}
                </div>
              </div>

              {/* Achievements */}
              <div className="preview-section">
                <h3><Award size={20} /> Achievements & Awards</h3>
                <div className="preview-achievements">
                  {profileData.achievements.length > 0 ? (
                    profileData.achievements.map((achievement) => (
                      <div key={achievement.id} className="achievement-item">
                        <h4>{achievement.title}</h4>
                        <p>{achievement.organization}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No achievements added yet</p>
                  )}
                </div>
              </div>

              {/* Certifications */}
              <div className="preview-section">
                <h3><Award size={20} /> Certifications</h3>
                <div className="preview-certifications">
                  {profileData.certifications.length > 0 ? (
                    profileData.certifications.map((cert) => (
                      <div key={cert.id} className="certification-item">
                        <h4>{cert.name}</h4>
                        {cert.image && (
                          <img src={cert.image} alt={cert.name} className="cert-image" />
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No certifications added yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
