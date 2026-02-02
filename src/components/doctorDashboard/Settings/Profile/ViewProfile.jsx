import React, { useState, useEffect, useRef } from 'react';
import { User, Briefcase, GraduationCap, Award, Video, Image, Heart, Home, Mail, Phone, MapPin, Calendar, Download, Play, FileText, X, ChevronRight, ArrowLeft, Clock, Star, ThumbsUp, MessageCircle, Share2, Linkedin, Twitter, Globe, CheckCircle, Users, TrendingUp, BookOpen, Target, Award as Trophy } from 'lucide-react';
import './ViewProfile.css';

const ViewProfile = ({ onMenuClick }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(234);
  const [shareCount, setShareCount] = useState(89);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const sidebarRef = useRef(null);

  // Sample profile data - in real app, this would come from props or global state
  const profileData = {
    profileImage: '',
    fullName: 'Dr. Sarah Johnson',
    designation: 'Senior Cardiologist',
    hospitalName: 'City Medical Center',
    email: 'sarah.johnson@citymedical.com',
    phone: '+1 (555) 123-4567',
    bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating complex heart conditions. She specializes in interventional cardiology and has performed over 2,000 cardiac procedures. Her research focuses on preventive cardiology and heart disease prevention in high-risk populations.',
    totalExperience: 15,
    workExperience: [
      { id: 1, hospital: 'City Medical Center', duration: { from: '2018-01', to: 'Present' }, role: 'Senior Cardiologist' },
      { id: 2, hospital: 'University Hospital', duration: { from: '2015-01', to: '2017-12' }, role: 'Interventional Cardiologist' },
      { id: 3, hospital: 'Heart Institute', duration: { from: '2010-01', to: '2014-12' }, role: 'Cardiology Fellow' }
    ],
    education: [
      { id: 1, degree: 'MD - Doctor of Medicine', university: 'Harvard Medical School', year: 2010 },
      { id: 2, degree: 'Residency in Internal Medicine', university: 'Johns Hopkins Hospital', year: 2014 },
      { id: 3, degree: 'Fellowship in Cardiology', university: 'Mayo Clinic', year: 2017 }
    ],
    achievements: [
      { id: 1, name: 'Excellence in Cardiology Award', organization: 'American Heart Association', image: '' },
      { id: 2, name: 'Top Doctor Award', organization: 'Castle Connolly', image: '' },
      { id: 3, name: 'Research Innovation Prize', organization: 'Cardiology Research Foundation', image: '' }
    ],
    videos: [
      { id: 1, title: 'Understanding Heart Disease Prevention', url: 'https://youtube.com/watch?v=example1' },
      { id: 2, title: 'Latest Advances in Cardiac Treatment', url: 'https://youtube.com/watch?v=example2' }
    ],
    files: [
      { id: 1, name: 'Medical Credentials.pdf', type: 'pdf' },
      { id: 2, name: 'Research Publications.pdf', type: 'pdf' }
    ],
    gallery: [
      { id: 1, url: '', caption: 'Speaking at Medical Conference 2023' },
      { id: 2, url: '', caption: 'With Patients After Successful Procedure' },
      { id: 3, url: '', caption: 'Research Team Collaboration' },
      { id: 4, url: '', caption: 'Medical Award Ceremony' }
    ],
    interests: ['Cardiology', 'Medical Research', 'Teaching', 'Preventive Medicine', 'Heart Disease Prevention'],
    // Enhanced profile data
    stats: {
      patientsTreated: 5000,
      surgeriesPerformed: 1200,
      researchPapers: 45,
      awardsWon: 12,
      yearsActive: 15,
      satisfactionRate: 98
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/drsarahjohnson',
      twitter: 'https://twitter.com/drsarahjohnson',
      website: 'https://drsarahjohnson.com'
    },
    availability: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 3:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 2:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    },
    specialties: ['Interventional Cardiology', 'Preventive Cardiology', 'Heart Disease Prevention', 'Cardiac Catheterization'],
    languages: ['English', 'Spanish', 'French'],
    certifications: [
      { id: 1, name: 'Board Certified Cardiologist', issuer: 'American Board of Internal Medicine', year: 2015, expires: 2025 },
      { id: 2, name: 'Advanced Cardiac Life Support', issuer: 'American Heart Association', year: 2023, expires: 2025 }
    ],
    publications: [
      { id: 1, title: 'Advances in Interventional Cardiology', journal: 'Journal of Cardiology', year: 2023, citations: 45 },
      { id: 2, title: 'Preventive Strategies in Heart Disease', journal: 'American Heart Journal', year: 2022, citations: 32 }
    ],
    testimonials: [
      { id: 1, patient: 'John D.', rating: 5, comment: 'Dr. Johnson saved my life. Excellent care and expertise.', date: '2023-11-15' },
      { id: 2, patient: 'Sarah M.', rating: 5, comment: 'Very professional and caring. Highly recommend!', date: '2023-10-28' }
    ]
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'interests', label: 'Interests', icon: Heart }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handleBackToDashboard = () => {
    onMenuClick('Settings > Profile'); // Go back to Profile page
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = (platform) => {
    setShareCount(prev => prev + 1);
    setShowShareMenu(false);
    // Handle share logic based on platform
    console.log(`Sharing to ${platform}`);
  };

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareMenu(false);
    // Show toast notification
  };

  return (
    <div className="view-profile-container">
      {/* Sidebar */}
      <aside className="sidebar" ref={sidebarRef}>
        {/* Back Button */}
        <button className="back-button" onClick={handleBackToDashboard}>
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        
        <div className="sidebar-header">
          <div className="profile-image-container">
            {profileData.profileImage ? (
              <img src={profileData.profileImage} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-image-placeholder">
                <User size={64} />
              </div>
            )}
          </div>
          <h2 className="doctor-name">{profileData.fullName}</h2>
          <p className="doctor-designation">{profileData.designation}</p>
        </div>

        <nav className="sidebar-nav">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {activeSection === item.id && <ChevronRight size={16} />}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Overview Section */}
        <section id="overview" className="content-section">
          <div className="section-header">
            <h1 className="section-title">{profileData.fullName}</h1>
            <p className="section-subtitle">{profileData.designation}</p>
          </div>

          {/* Profile Actions */}
          <div className="profile-actions">
            <div className="action-buttons">
              <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
                <ThumbsUp size={20} />
                <span>{likeCount}</span>
              </button>
              <div className="share-container">
                <button className="share-button" onClick={() => setShowShareMenu(!showShareMenu)}>
                  <Share2 size={20} />
                  <span>{shareCount}</span>
                </button>
                {showShareMenu && (
                  <div className="share-dropdown">
                    <button onClick={() => handleShare('linkedin')}>
                      <Linkedin size={16} />
                      LinkedIn
                    </button>
                    <button onClick={() => handleShare('twitter')}>
                      <Twitter size={16} />
                      Twitter
                    </button>
                    <button onClick={copyProfileLink}>
                      <Globe size={16} />
                      Copy Link
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="social-links">
              <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                <Twitter size={20} />
              </a>
              <a href={profileData.socialLinks.website} target="_blank" rel="noopener noreferrer" className="social-link">
                <Globe size={20} />
              </a>
            </div>
          </div>

          <div className="overview-grid">
            <div className="overview-card">
              <div className="card-icon">
                <MapPin size={24} />
              </div>
              <div className="card-content">
                <h3>Hospital</h3>
                <p>{profileData.hospitalName}</p>
              </div>
            </div>

            <div className="overview-card">
              <div className="card-icon">
                <Mail size={24} />
              </div>
              <div className="card-content">
                <h3>Email</h3>
                <p>{profileData.email}</p>
              </div>
            </div>

            <div className="overview-card">
              <div className="card-icon">
                <Phone size={24} />
              </div>
              <div className="card-content">
                <h3>Phone</h3>
                <p>{profileData.phone}</p>
              </div>
            </div>

            <div className="overview-card">
              <div className="card-icon">
                <Calendar size={24} />
              </div>
              <div className="card-content">
                <h3>Experience</h3>
                <p>{profileData.totalExperience}+ Years</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="content-section">
          <div className="section-header">
            <User size={32} />
            <h2 className="section-title">About</h2>
          </div>
          
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              Biography
            </button>
            <button 
              className={`tab-button ${activeTab === 'specialties' ? 'active' : ''}`}
              onClick={() => setActiveTab('specialties')}
            >
              Specialties
            </button>
            <button 
              className={`tab-button ${activeTab === 'languages' ? 'active' : ''}`}
              onClick={() => setActiveTab('languages')}
            >
              Languages
            </button>
            <button 
              className={`tab-button ${activeTab === 'availability' ? 'active' : ''}`}
              onClick={() => setActiveTab('availability')}
            >
              Availability
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'about' && (
              <div className="about-content">
                <p>{profileData.bio}</p>
              </div>
            )}
            {activeTab === 'specialties' && (
              <div className="specialties-grid">
                {profileData.specialties.map((specialty, index) => (
                  <div key={index} className="specialty-card">
                    <CheckCircle size={20} />
                    <span>{specialty}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'languages' && (
              <div className="languages-grid">
                {profileData.languages.map((language, index) => (
                  <div key={index} className="language-card">
                    <Globe size={20} />
                    <span>{language}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'availability' && (
              <div className="availability-schedule">
                {Object.entries(profileData.availability).map(([day, hours]) => (
                  <div key={day} className="schedule-item">
                    <div className="day-name">{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                    <div className="day-hours">{hours}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="content-section">
          <div className="section-header">
            <Briefcase size={32} />
            <h2 className="section-title">Experience</h2>
          </div>
          <div className="timeline">
            {profileData.workExperience.map((exp, index) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{exp.role}</h3>
                    <span className="timeline-duration">
                      {exp.duration.from} - {exp.duration.to}
                    </span>
                  </div>
                  <p className="timeline-hospital">{exp.hospital}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="content-section">
          <div className="section-header">
            <GraduationCap size={32} />
            <h2 className="section-title">Education</h2>
          </div>
          <div className="education-grid">
            {profileData.education.map((edu) => (
              <div key={edu.id} className="education-card">
                <div className="education-icon">
                  <GraduationCap size={24} />
                </div>
                <div className="education-content">
                  <h3>{edu.degree}</h3>
                  <p>{edu.university}</p>
                  <span className="education-year">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="content-section">
          <div className="section-header">
            <Award size={32} />
            <h2 className="section-title">Achievements & Awards</h2>
          </div>
          <div className="achievements-grid">
            {profileData.achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">
                  <Award size={24} />
                </div>
                <div className="achievement-content">
                  <h3>{achievement.name}</h3>
                  <p>{achievement.organization}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Videos Section */}
        <section id="videos" className="content-section">
          <div className="section-header">
            <Video size={32} />
            <h2 className="section-title">Videos & Media</h2>
          </div>
          <div className="videos-grid">
            {profileData.videos.map((video) => (
              <div key={video.id} className="video-card">
                <div className="video-thumbnail">
                  <Play size={32} />
                </div>
                <div className="video-content">
                  <h3>{video.title}</h3>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="video-link">
                    Watch Video
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="files-section">
            <h3>Documents</h3>
            <div className="files-list">
              {profileData.files.map((file) => (
                <div key={file.id} className="file-item">
                  <FileText size={20} />
                  <span>{file.name}</span>
                  <Download size={16} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="content-section">
          <div className="section-header">
            <Image size={32} />
            <h2 className="section-title">Gallery</h2>
          </div>
          <div className="gallery-grid">
            {profileData.gallery.map((item, index) => (
              <div key={item.id} className="gallery-item" onClick={() => openLightbox(item)}>
                <div className="gallery-image-placeholder">
                  <Image size={32} />
                </div>
                <div className="gallery-overlay">
                  <p>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interests Section */}
        <section id="interests" className="content-section">
          <div className="section-header">
            <Heart size={32} />
            <h2 className="section-title">Interests</h2>
          </div>
          <div className="interests-container">
            {profileData.interests.map((interest, index) => (
              <div key={index} className="interest-chip">
                <Heart size={14} />
                <span>{interest}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={closeLightbox}>
              <X size={24} />
            </button>
            <div className="lightbox-image-placeholder">
              <Image size={64} />
            </div>
            <p>{selectedImage.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
