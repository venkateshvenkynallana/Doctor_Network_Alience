import React, { useState, useRef, useContext, useEffect } from 'react';

import { User, Upload, Plus, X, Award, BookOpen, Briefcase, Camera, Video, FileText, MapPin, Mail, Phone, Calendar, GraduationCap, Star, Trash2, Edit, Eye } from 'lucide-react';

import './Profile.css';

import { AuthContext } from '../../../../context/AuthContext';



const Profile = ({ onMenuClick }) => {


  const { updateProfile, authUser } = useContext(AuthContext);



  const [profileData, setProfileData] = useState({

    profileImage: '',

    fullName: '',

    email: '',

    phone: '',

    bio: '',

    designation: '',

    hospitalName: '',

    totalExperience: '',

    introVideo: '',

    workExperience: [],

    education: [],

    achievements: [],


    videos: [],

    mediaImages: [],


  });



  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitMessage, setSubmitMessage] = useState('');



  const [newInterest, setNewInterest] = useState('');

  const [newSkill, setNewSkill] = useState('');

  const fileInputRef = useRef(null);

  const awardImagesRef = useRef(null);

  const filesRef = useRef(null);



  // Populate profile data with authUser data when component loads or authUser changes
  useEffect(() => {
    if (authUser) {
      console.log('Populating profile with authUser data:', authUser);
      setProfileData(prev => ({
        ...prev,
        profileImage: authUser.profilepic || '',
        fullName: authUser.fullName || '',
        email: authUser.email || '',
        phone: authUser.phoneNo || '',
        bio: authUser.bio || '',
        designation: authUser.designation || '',
        hospitalName: '',
        totalExperience: authUser.profile?.yearsOfExperience || '',
        introVideo: authUser.profile?.introVideo || '',
        workExperience: authUser.profile?.experience ? authUser.profile.experience.map(exp => ({
          id: exp._id || Date.now(),
          hospital: exp.hospital || '',
          duration: {
            from: exp.from || '',
            to: exp.to || ''
          }
        })) : [],
        education: authUser.profile?.education ? [{
          id: Date.now(),
          degree: authUser.profile.education.degree || '',
          university: authUser.profile.education.university || '',
          year: authUser.profile.education.year || ''
        }] : [],
        achievements: authUser.profile?.achievements ? [{
          id: Date.now(),
          name: authUser.profile.achievements.achievementsName || '',
          organization: authUser.profile.achievements.issuingOrganization || ''
        }] : [],
        // interests: authUser.profile?.Interests || [],
        videos: authUser.profile?.mediaUpload ? authUser.profile.mediaUpload.map(video => ({
          id: video._id || Date.now(),
          url: video.Link || video.Video || ''
        })) : []
      }));
    }
  }, [authUser]);



  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setProfileData(prev => ({

      ...prev,

      [name]: value

    }));

  };



  const handleProfileImageUpload = (e) => {

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



  const addWorkExperience = () => {

    setProfileData(prev => ({

      ...prev,

      workExperience: [

        ...prev.workExperience,

        { id: Date.now(), hospital: '', duration: { from: '', to: '' } }

      ]

    }));

  };



  const updateWorkExperience = (id, field, value) => {

    setProfileData(prev => ({

      ...prev,

      workExperience: prev.workExperience.map(exp =>

        exp.id === id ? { ...exp, [field]: value } : exp

      )

    }));

  };



  const removeWorkExperience = (id) => {

    setProfileData(prev => ({

      ...prev,

      workExperience: prev.workExperience.filter(exp => exp.id !== id)

    }));

  };



  const addEducation = () => {

    setProfileData(prev => ({

      ...prev,

      education: [

        ...prev.education,

        { id: Date.now(), degree: '', university: '', year: '' }

      ]

    }));

  };



  const updateEducation = (id, field, value) => {

    setProfileData(prev => ({

      ...prev,

      education: prev.education.map(edu =>

        edu.id === id ? { ...edu, [field]: value } : edu

      )

    }));

  };



  const removeEducation = (id) => {

    setProfileData(prev => ({

      ...prev,

      education: prev.education.filter(edu => edu.id !== id)

    }));

  };



  const addAchievement = () => {

    setProfileData(prev => ({

      ...prev,

      achievements: [

        ...prev.achievements,

        { id: Date.now(), name: '', organization: '' }

      ]

    }));

  };



  const updateAchievement = (id, field, value) => {

    setProfileData(prev => ({

      ...prev,

      achievements: prev.achievements.map(ach =>

        ach.id === id ? { ...ach, [field]: value } : ach

      )

    }));

  };



  const removeAchievement = (id) => {

    setProfileData(prev => ({

      ...prev,

      achievements: prev.achievements.filter(ach => ach.id !== id)

    }));

  };



  const handleAwardImagesUpload = (e) => {
    const files = Array.from(e.target.files);

    setProfileData(prev => ({
      ...prev,
      mediaImages: [...prev.mediaImages, ...files]
    }));
  };




  const removeAwardImage = (index) => {

    setProfileData(prev => ({

      ...prev,

      mediaImages: prev.mediaImages.filter((_, i) => i !== index)
    }));

  };



  const addVideo = () => {

    setProfileData(prev => ({

      ...prev,

      videos: [...prev.videos, { id: Date.now(), url: '' }]

    }));

  };



  const updateVideo = (id, url) => {

    setProfileData(prev => ({

      ...prev,

      videos: prev.videos.map(video =>

        video.id === id ? { ...video, url } : video

      )

    }));

  };



  const removeVideo = (id) => {

    setProfileData(prev => ({

      ...prev,

      videos: prev.videos.filter(video => video.id !== id)

    }));

  };





  // const addInterest = () => {

  //   if (newInterest.trim()) {

  //     setProfileData(prev => ({

  //       ...prev,

  //       interests: [...prev.interests, newInterest.trim()]

  //     }));

  //     setNewInterest('');

  //   }

  // };



  // const removeInterest = (index) => {

  //   setProfileData(prev => ({

  //     ...prev,

  //     interests: prev.interests.filter((_, i) => i !== index)

  //   }));

  // };



  const handleInterestKeyPress = (e) => {

    if (e.key === 'Enter') {

      e.preventDefault();

      addInterest();

    }

  };



  const validateForm = () => {

    const newErrors = {};



    if (!profileData.fullName.trim()) {

      newErrors.fullName = 'Full name is required';

    }



    if (!profileData.email.trim()) {

      newErrors.email = 'Email is required';

    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {

      newErrors.email = 'Email is invalid';

    }



    if (!profileData.phone.trim()) {

      newErrors.phone = 'Phone number is required';

    } else if (!/^\+?[\d\s\-\(\)]+$/.test(profileData.phone)) {

      newErrors.phone = 'Phone number is invalid';

    }



    if (!profileData.designation.trim()) {

      newErrors.designation = 'Designation is required';

    }



    if (!profileData.hospitalName.trim()) {

      newErrors.hospitalName = 'Hospital name is required';

    }



    if (profileData.totalExperience && (isNaN(profileData.totalExperience) || profileData.totalExperience < 0)) {

      newErrors.totalExperience = 'Years of experience must be a positive number';

    }



    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };



  const handleSubmit = async (e) => {

    e.preventDefault();



    console.log("🚀 Save Profile clicked");



    if (!validateForm()) {

      console.log(" Validation failed");

      return;

    }



    const formData = new FormData();



    // Basic info

    formData.append("fullName", profileData.fullName);

    formData.append("email", profileData.email);

    formData.append("phoneNo", profileData.phone);

    formData.append("bio", profileData.bio);

    formData.append("designation", profileData.designation);

    formData.append("yearsOfExperience", profileData.totalExperience);

    formData.append("introVideo", profileData.introVideo);


    // Profile image

    if (fileInputRef.current?.files[0]) {

      formData.append("profilepic", fileInputRef.current.files[0]);

    }



    // Complex data → stringify

    formData.append("experience", JSON.stringify(profileData.workExperience));

    formData.append("education", JSON.stringify(profileData.education));

    formData.append("achievements", JSON.stringify(profileData.achievements));

    // videos
    profileData.videos.forEach(video => {
      formData.append("mediaUpload", JSON.stringify({
        type: "video",
        url: video.url
      }));
    });

    // gallery images
    profileData.mediaImages.forEach(file => {
      formData.append("mediaUploadImages", file);
    });






    console.log("FormData built, calling AuthContext");



    await updateProfile(formData);

  };





  return (

    <div className="profile-container">

      <div className="profile-header">

        <h1 className="profile-title">Doctor Profile</h1>

        <p className="profile-subtitle">Manage your professional information</p>

      </div>



      <div className="card profile-header-section">

        <div className="profile-image-container">

          <div className="profile-image-wrapper">

            {profileData.profileImage ? (

              <img src={profileData.profileImage} alt="Profile" className="profile-image" />

            ) : (

              <div className="profile-image-placeholder">

                <User size={48} />

              </div>

            )}

            <button

              className="profile-image-upload-btn"

              onClick={() => fileInputRef.current?.click()}

            >

              <Camera size={20} />

            </button>

          </div>

          <input

            ref={fileInputRef}

            type="file"

            accept="image/*"

            onChange={handleProfileImageUpload}

            className="hidden"

          />

        </div>

        <div className="profile-info">

          <h2 className="doctor-name">{profileData.fullName || 'Dr. John Doe'}</h2>

          <p className="doctor-designation">{profileData.designation || 'Cardiologist'}</p>

        </div>

      </div>



      <div className="card">

        <h3 className="section-title">

          <User size={20} />

          Personal Information

        </h3>

        <div className="form-grid">

          <div className="form-group">

            <label>Full Name</label>

            <input

              type="text"

              name="fullName"

              value={profileData.fullName}

              onChange={handleInputChange}

              placeholder="Dr. John Doe"

              className={errors.fullName ? 'error' : ''}

            />

            {errors.fullName && <span className="error-message">{errors.fullName}</span>}

          </div>

          <div className="form-group">

            <label>Email</label>

            <input

              type="email"

              name="email"

              value={profileData.email}

              onChange={handleInputChange}

              placeholder="john.doe@hospital.com"

              className={errors.email ? 'error' : ''}

            />

            {errors.email && <span className="error-message">{errors.email}</span>}

          </div>

          <div className="form-group">

            <label>Phone Number</label>

            <input

              type="tel"

              name="phone"

              value={profileData.phone}

              onChange={handleInputChange}

              placeholder="+1 (555) 123-4567"

              className={errors.phone ? 'error' : ''}

            />

            {errors.phone && <span className="error-message">{errors.phone}</span>}

          </div>

        </div>

      </div>



      <div className="card">

        <h3 className="section-title">

          <Briefcase size={20} />

          Professional Information

        </h3>

        <div className="form-grid">

          <div className="form-group full-width">

            <label>Bio / About</label>

            <textarea

              name="bio"

              value={profileData.bio}

              onChange={handleInputChange}

              placeholder="Tell us about your professional background and expertise..."

              rows={4}

            />

          </div>

          <div className="form-group full-width">

            <label>Intro Video URL</label>

            <input

              type="url"

              name="introVideo"

              value={profileData.introVideo || ''}

              onChange={handleInputChange}

              placeholder="https://youtube.com/watch?v=..."

              className="intro-video-input"

            />

            <small className="input-hint">Add a YouTube or Vimeo video link to introduce yourself</small>

          </div>

          <div className="form-group">

            <label>Designation</label>

            <input

              type="text"

              name="designation"

              value={profileData.designation}

              onChange={handleInputChange}

              placeholder="Senior Cardiologist"

              className={errors.designation ? 'error' : ''}

            />

            {errors.designation && <span className="error-message">{errors.designation}</span>}

          </div>

          <div className="form-group">

            <label>Hospital Name</label>

            <input

              type="text"

              name="hospitalName"

              value={profileData.hospitalName}

              onChange={handleInputChange}

              placeholder="City Medical Center"

              className={errors.hospitalName ? 'error' : ''}

            />

            {errors.hospitalName && <span className="error-message">{errors.hospitalName}</span>}

          </div>

          <div className="form-group">

            <label>Total Years of Experience</label>

            <input

              type="number"

              name="totalExperience"

              value={profileData.totalExperience}

              onChange={handleInputChange}

              placeholder="15"

              className={errors.totalExperience ? 'error' : ''}

            />

            {errors.totalExperience && <span className="error-message">{errors.totalExperience}</span>}

          </div>

        </div>

      </div>



      <div className="card">

        <h3 className="section-title">

          <Briefcase size={20} />

          Work Experience

        </h3>

        <div className="experience-list">

          {profileData.workExperience.map((exp) => (

            <div key={exp.id} className="experience-item">

              <div className="experience-header">

                <h4>Experience Entry</h4>

                <button

                  className="remove-btn"

                  onClick={() => removeWorkExperience(exp.id)}

                >

                  <Trash2 size={16} />

                </button>

              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>Hospital Name</label>

                  <input

                    type="text"

                    value={exp.hospital}

                    onChange={(e) => updateWorkExperience(exp.id, 'hospital', e.target.value)}

                    placeholder="Hospital Name"

                  />

                </div>

                <div className="form-group">

                  <label>From</label>

                  <input

                    type="month"

                    value={exp.duration?.from || ''}

                    min="1950-01"

                    max="2030-12"

                    onChange={(e) => updateWorkExperience(exp.id, 'duration', { ...(exp.duration || {}), from: e.target.value })}

                  />

                </div>

                <div className="form-group">

                  <label>To</label>

                  <input

                    type="month"

                    value={exp.duration?.to || ''}

                    min="1950-01"

                    max="2030-12"

                    onChange={(e) => updateWorkExperience(exp.id, 'duration', { ...(exp.duration || {}), to: e.target.value })}

                  />

                </div>

              </div>

            </div>

          ))}

        </div>

        <button className="add-btn" onClick={addWorkExperience}>

          <Plus size={16} />

          Add Experience

        </button>

      </div>



      <div className="card">

        <h3 className="section-title">

          <GraduationCap size={20} />

          Education Details

        </h3>

        <div className="education-list">

          {profileData.education.map((edu) => (

            <div key={edu.id} className="education-item">

              <div className="education-header">

                <h4>Education Entry</h4>

                <button

                  className="remove-btn"

                  onClick={() => removeEducation(edu.id)}

                >

                  <Trash2 size={16} />

                </button>

              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>Degree Name</label>

                  <input

                    type="text"

                    value={edu.degree}

                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}

                    placeholder="MBBS, MD, etc."

                  />

                </div>

                <div className="form-group">

                  <label>University Name</label>

                  <input

                    type="text"

                    value={edu.university}

                    onChange={(e) => updateEducation(edu.id, 'university', e.target.value)}

                    placeholder="University Name"

                  />

                </div>

                <div className="form-group">

                  <label>Year of Completion</label>

                  <input

                    type="number"

                    value={edu.year}

                    onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}

                    placeholder="2020"

                    min="1950"

                    max={new Date().getFullYear()}

                  />

                </div>

              </div>

            </div>

          ))}

        </div>

        <button className="add-btn" onClick={addEducation}>

          <Plus size={16} />

          Add Education

        </button>

      </div>



      <div className="card">

        <h3 className="section-title">

          <Award size={20} />

          Achievements & Awards

        </h3>

        <div className="achievements-list">

          {profileData.achievements.map((ach) => (

            <div key={ach.id} className="achievement-item">

              <div className="achievement-header">

                <h4>Award Entry</h4>

                <button

                  className="remove-btn"

                  onClick={() => removeAchievement(ach.id)}

                >

                  <Trash2 size={16} />

                </button>

              </div>

              <div className="form-grid">

                <div className="form-group">

                  <label>Award / Achievement Name</label>

                  <input

                    type="text"

                    value={ach.name}

                    onChange={(e) => updateAchievement(ach.id, 'name', e.target.value)}

                    placeholder="Best Doctor Award"

                  />

                </div>

                <div className="form-group">

                  <label>Organization</label>

                  <input

                    type="text"

                    value={ach.organization}

                    onChange={(e) => updateAchievement(ach.id, 'organization', e.target.value)}

                    placeholder="Medical Association"

                  />

                </div>

              </div>

            </div>

          ))}

        </div>

        <button className="add-btn" onClick={addAchievement}>

          <Plus size={16} />

          Add Achievement

        </button>




      </div>



      <div className="card">

        <h3 className="section-title">

          <Video size={20} />

          Media Upload

        </h3>



        <div className="videos-section">

          <h4>Videos</h4>

          {profileData.videos.map((video) => (

            <div key={video.id} className="video-item">

              <input

                type="url"

                value={video.url}

                onChange={(e) => updateVideo(video.id, e.target.value)}

                placeholder="https://youtube.com/watch?v=..."

              />

              <button

                className="remove-btn"

                onClick={() => removeVideo(video.id)}

              >

                <Trash2 size={16} />

              </button>

            </div>

          ))}

          <button className="add-btn" onClick={addVideo}>

            <Plus size={16} />

            Add Video

          </button>

        </div>



        <div className="award-images-section">

          <h4>Gallery</h4>

          <button

            className="upload-btn"

            onClick={() => awardImagesRef.current?.click()}

          >

            <Upload size={16} />

            Upload Gallery Images

          </button>

          <input

            ref={awardImagesRef}

            type="file"

            accept="image/*"

            multiple

            onChange={handleAwardImagesUpload}

            className="hidden"

          />

          <div className="image-gallery">

            {profileData.mediaImages.map((file, index) => (
              <div key={index} className="image-item">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Gallery ${index + 1}`}
                />
                <button
                  className="image-remove-btn"
                  onClick={() => removeMediaImage(index)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}


          </div>

        </div>

      </div>







      {submitMessage && (

        <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>

          {submitMessage}

        </div>

      )}

      <div className="save-section">

        <button

          className="save-btn"

          onClick={handleSubmit}

          disabled={isSubmitting}

        >

          {isSubmitting ? 'Saving...' : 'Save Profile'}

        </button>

        <button

          className="view-profile-btn"

          onClick={() => onMenuClick('Settings > Profile')}

        >

          <Eye size={16} />

          View Profile

        </button>

      </div>

    </div>

  );

};



export default Profile;

