import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user data in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  //Check if user is authenticated and if so , set the user data
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axios.get("/api/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (data.success) {
        setAuthUser(data.user);
      }
    } catch (error) {
      console.error("checkAuth error:", error.response?.data || error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        checkAuth();
      }
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    console.log('Login function called with:', credentials);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: credentials.email,
        password: credentials.password
      });

      console.log('Login response:', response.data);

      if (response.data.success) {
        // Set token and authUser for compatibility
        setAuthUser(response.data.userData);
        setToken(response.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        localStorage.setItem("token", response.data.token);

        // Transform backend user data to frontend format
        const backendUser = response.data.userData;
        const userData = {
          ...backendUser,
          token: response.data.token,
          // Map backend fields to frontend expected fields
          phone: backendUser.phoneNo || '',
          professionalSummary: backendUser.bio || '',
          profileImage: backendUser.profilepic || null,
          professionalTitle: backendUser.profile?.professionalHeadline || '',
          keySkills: backendUser.profile?.skills || [],
          workingHospital: backendUser.profile?.experience?.hospital || '',
          yearsOfExperience: backendUser.profile?.experience?.duration || '',
          interests: backendUser.profile?.professionalInterests || [],
          achievements: backendUser.profile?.achievements || [],
          // Transform nested objects to arrays for frontend
          education: backendUser.profile?.education ? [{
            degree: backendUser.profile.education.degree,
            institution: backendUser.profile.education.university,
            year: backendUser.profile.education.year,
            id: Date.now()
          }] : [],
          certifications: backendUser.profile?.certifications ? [{
            name: backendUser.profile.certifications.name,
            organization: backendUser.profile.certifications.issuingOrganization,
            validUntil: backendUser.profile.certifications.validUntil,
            id: Date.now()
          }] : [],
          experience: backendUser.profile?.experience ? [{
            hospitalName: backendUser.profile.experience.hospital,
            duration: backendUser.profile.experience.duration,
            years: backendUser.profile.experience.duration,
            description: backendUser.profile.experience.description,
            jobTitle: backendUser.profile.experience.jobTitle,
            id: Date.now()
          }] : []
        };

        console.log('Setting user data:', userData);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('Login successful! Welcome back.');
        return userData;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
      throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  const register = async (userData) => {
    console.log('Register function called with:', userData);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        phoneNo: userData.phoneNo,
        designation: userData.designation
      });

      console.log('Register response:', response.data);

      if (response.data.success) {
        toast.success('Registration successful! Please login to continue.');
        return { success: true, message: response.data.message || 'Registration successful' };
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Register error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    setAuthUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    toast.success("Logged out successfully.");
  };

  const updateUserProfile = async (profileData) => {
    console.log('Updating profile with data:', profileData);
    try {
      // Transform frontend data to backend format
      const transformedData = {
        fullName: profileData.fullName,
        email: profileData.email,
        bio: profileData.professionalSummary,
        phoneNo: profileData.phone,
        designation: profileData.designation,
        profile: {
          professionalHeadline: profileData.professionalTitle || '',
          skills: profileData.keySkills || [],
          professionalInterests: profileData.interests || [],
          achievements: profileData.achievements || [],
          experience: {
            jobTitle: profileData.designation || '',
            hospital: profileData.workingHospital || '',
            duration: profileData.yearsOfExperience || '',
            description: profileData.professionalSummary || ''
          },
          education: profileData.education && profileData.education.length > 0 ? {
            degree: profileData.education[0]?.degree || '',
            university: profileData.education[0]?.institution || '',
            year: profileData.education[0]?.year || ''
          } : {
            degree: '',
            university: '',
            year: ''
          },
          certifications: profileData.certifications && profileData.certifications.length > 0 ? {
            name: profileData.certifications[0]?.name || '',
            issuingOrganization: profileData.certifications[0]?.organization || '',
            validUntil: ''
          } : {
            name: '',
            issuingOrganization: '',
            validUntil: ''
          }
        }
      };

      const token = user?.token || localStorage.getItem("token");
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.put(
        'http://localhost:5000/api/auth/update-profile',
        transformedData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Profile update response:', response.data);

      if (response.data.success) {
        const backendUpdatedUser = response.data.user;

        // Update authUser for compatibility
        setAuthUser(backendUpdatedUser);

        // Transform backend data to frontend format
        const updatedUser = {
          ...backendUpdatedUser,
          token: token,
          // Map backend fields to frontend expected fields
          phone: backendUpdatedUser.phoneNo || '',
          professionalSummary: backendUpdatedUser.bio || '',
          profileImage: backendUpdatedUser.profilepic || null,
          professionalTitle: backendUpdatedUser.profile?.professionalHeadline || '',
          keySkills: backendUpdatedUser.profile?.skills || [],
          workingHospital: backendUpdatedUser.profile?.experience?.hospital || '',
          yearsOfExperience: backendUpdatedUser.profile?.experience?.duration || '',
          interests: backendUpdatedUser.profile?.professionalInterests || [],
          achievements: backendUpdatedUser.profile?.achievements || [],
          // Transform nested objects to arrays for frontend
          education: backendUpdatedUser.profile?.education ? [{
            degree: backendUpdatedUser.profile.education.degree,
            institution: backendUpdatedUser.profile.education.university,
            year: backendUpdatedUser.profile.education.year,
            id: Date.now()
          }] : [],
          certifications: backendUpdatedUser.profile?.certifications ? [{
            name: backendUpdatedUser.profile.certifications.name,
            organization: backendUpdatedUser.profile.certifications.issuingOrganization,
            validUntil: backendUpdatedUser.profile.certifications.validUntil,
            id: Date.now()
          }] : [],
          experience: backendUpdatedUser.profile?.experience ? [{
            hospitalName: backendUpdatedUser.profile.experience.hospital,
            duration: backendUpdatedUser.profile.experience.duration,
            years: backendUpdatedUser.profile.experience.duration,
            description: backendUpdatedUser.profile.experience.description,
            jobTitle: backendUpdatedUser.profile.experience.jobTitle,
            id: Date.now()
          }] : []
        };

        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully!');
        return updatedUser;
      } else {
        throw new Error(response.data.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Profile update failed. Please try again.');
      throw new Error(error.response?.data?.message || 'Profile update failed. Please try again.');
    }
  };

  // Update profile function for FormData (for Profile component)
  const updateProfile = async (formData) => {
    try {
      console.log('Sending profile update request...');

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      console.log('Request config:', config);
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value instanceof File ? `File: ${value.name} (${value.size} bytes)` : value);
      }

      const { data } = await axios.put(
        `${backendUrl}/api/auth/update-profile`,
        formData,
        config
      );


      console.log('Response data:', data);

      if (data?.success && data?.user) {
        const updatedUser = {
          ...data.user,
          token: token,
          phone: data.user.phoneNo || '',
          professionalSummary: data.user.bio || '',
          profileImage: data.user.profilepic || null,
          professionalTitle: data.user.profile?.professionalHeadline || '',
          keySkills: data.user.profile?.skills || [],
          workingHospital: data.user.profile?.experience?.hospital || '',
          yearsOfExperience: data.user.profile?.experience?.duration || '',
          interests: data.user.profile?.professionalInterests || [],
          achievements: data.user.profile?.achievements || []
        };

        setAuthUser(updatedUser);        //  updates profile page
        setUser(updatedUser);            //  updates dashboard
        localStorage.setItem('user', JSON.stringify(updatedUser));

        toast.success("Profile Updated successfully");
      }
      else {
        toast.error(data.message || "Profile update failed");
      }
    } catch (error) {
      console.error('Profile update error:', error);
      const errorMessage = error.response?.data?.message || error.message || "Error updating profile";
      toast.error(errorMessage);
    }
  };

  const value = {
    user,
    token,
    authUser,
    login,
    register,
    logout,
    updateUserProfile,
    updateProfile,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
