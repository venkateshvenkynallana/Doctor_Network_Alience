import React, { useState, useEffect, useRef, useContext } from 'react';
import { User, Briefcase, GraduationCap, Award, Video, Image, Heart, Home, Mail, Phone, MapPin, Calendar, Download, Play, FileText, X, ChevronRight, ArrowLeft, Clock, Star, ThumbsUp, MessageCircle, Share2, Linkedin, Twitter, Globe, CheckCircle, Users, TrendingUp, BookOpen, Target, Award as Trophy, Edit } from 'lucide-react';
import './ViewProfile.css';
import { AuthContext } from '../../../../context/AuthContext';

const ViewProfile = ({ onMenuClick }) => {
  const { authUser } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(234);
  const [shareCount, setShareCount] = useState(89);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const sidebarRef = useRef(null);

  // Real profile data from authUser
  const profileData = {
    profileImage: authUser?.profilepic || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    fullName: authUser?.fullName || 'Dr. Name',
    designation: authUser?.designation || 'Doctor',
    hospitalName: authUser?.profile?.experience?.[0]?.hospital || 'Hospital Name',
    email: authUser?.email || 'email@example.com',
    phone: authUser?.phoneNo || '+1 (555) 123-4567',
    bio: authUser?.bio || 'Doctor biography will be displayed here.',
    introVideo: authUser?.profile?.introVideo || 'https://www.youtube.com/watch?v=9XFXPFjNZEc&pp=ygUIaGk5IDIwMjI%3D',
    totalExperience: authUser?.profile?.yearsOfExperience || 0,
    workExperience: authUser?.profile?.experience ? authUser.profile.experience.map(exp => ({
      id: exp._id || Date.now(),
      hospital: exp.hospital || '',
      duration: { from: exp.from || '', to: exp.to || '' },
      role: authUser?.designation || 'Doctor'
    })) : [],
    education: authUser?.profile?.education ? [{
      id: Date.now(),
      degree: authUser.profile.education.degree || '',
      university: authUser.profile.education.university || '',
      year: authUser.profile.education.year || ''
    }] : [],
    achievements: authUser?.profile?.achievements ? [{
      id: Date.now(),
      name: authUser.profile.achievements.achievementsName || '',
      organization: authUser.profile.achievements.issuingOrganization || '',
      image: authUser.profile.achievements.achievementsImages || ''
    }] : [],
    videos: authUser?.profile?.mediaUpload ? authUser.profile.mediaUpload.map(video => ({
      id: video._id || Date.now(),
      title: 'Video Content',
      url: video.Link || video.Video || ''
    })) : [],
    files: [], // Files are not stored in backend
    gallery: authUser?.profile?.achievements?.achievementsImages ? [{
      id: Date.now(),
      url: authUser.profile.achievements.achievementsImages,
      caption: 'Achievement Image'
    }] : [],
    interests: authUser?.profile?.Interests || [],
    // Enhanced profile data with defaults
    stats: {
      patientsTreated: 0,
      surgeriesPerformed: 0,
      researchPapers: 0,
      awardsWon: authUser?.profile?.achievements ? 1 : 0,
      yearsActive: authUser?.profile?.yearsOfExperience || 0,
      satisfactionRate: 0
    },
    socialLinks: {
      linkedin: '',
      twitter: '',
      website: ''
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
    specialties: [authUser?.designation || 'General Practice'],
    languages: ['English'],
    certifications: [],
    publications: [],
    testimonials: []
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

  const handleEditProfile = () => {
    onMenuClick('Settings > Edit Profile'); // Go to Profile edit page
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

  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="view-profile-container">
      {/* Sidebar */}
      <aside className="sidebar" ref={sidebarRef}>

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
        {/* Profile Actions - Top Right */}
        <div className="profile-actions-top-right">
          <button className="edit-profile-button" onClick={handleEditProfile}>
            <Edit size={20} />
            <span>Edit Profile</span>
          </button>
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
        {/* Overview Section */}
        <section id="overview" className="content-section">
          <div className="section-header">
            <div className="profile-header-row">
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
                <div className="profile-text-info">
                  <h2 className="doctor-name">{profileData.fullName}</h2>
                  <p className="doctor-designation">{profileData.designation}</p>
                </div>
              </div>
              
              {/* Intro Video */}
              {profileData.introVideo && (
                <div className="intro-video-container">
                 
                  <div className="video-player">
                    {profileData.introVideo.includes('youtube.com') || profileData.introVideo.includes('youtu.be') ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(profileData.introVideo)}`}
                        title="Intro Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="video-iframe"
                      />
                    ) : (
                      <video controls className="video-element">
                        <source src={profileData.introVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>
              )}
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
