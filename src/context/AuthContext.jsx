import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);


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

    //Register function to handle user registration
    const register = async (credentials) => {
        try {
            const { data } = await axios.post("/api/auth/signup", credentials);
            if (data.success) {
                toast.success("Registration successful. Please login to continue.");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //Login function to handle user authentication
    const login = async (credentials) => {
        try {
            const { data } = await axios.post("/api/auth/login", credentials);
            if (data.success) {
                setAuthUser(data.userData);
                setToken(data.token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                localStorage.setItem("token", data.token);
                toast.success("Login successful.");

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //Logout function to handle user logout
    const logout = async () => {
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        axios.defaults.headers.common["Authorization"] = null;
        toast.success("Logged out successfully.");
    }

    //Update profile function to handle user profile updates
    const updateProfile = async (formData) => {
        try {
            console.log('Sending profile update request...');
            
            // Always use FormData for consistency
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Don't set Content-Type for FormData - let browser set it with boundary
                }
            };

            console.log('Request config:', config);
            console.log('FormData contents:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value instanceof File ? `File: ${value.name} (${value.size} bytes)` : value);
            }

            const { data } = await axios.put("/api/auth/update-profile", formData, config);
            
            console.log('Response data:', data);
            
            if (data.success) {
                console.log('Profile update successful, updating user state...');
                setAuthUser(data.user);
                toast.success("Profile Updated successfully");
                
                // If profile image was updated, update the user's profileImageUrl
                if (data.user.profilepic || data.user.profileImageUrl) {
                    console.log('Updating profile image URL...');
                    setAuthUser(prev => ({
                        ...prev,
                        profilepic: data.user.profilepic || data.user.profileImageUrl,
                        profileImageUrl: data.user.profilepic || data.user.profileImageUrl
                    }));
                }
                
                // Force a re-render by updating the state
                setTimeout(() => {
                    console.log('AuthUser state updated:', authUser);
                }, 100);
            } else {
                toast.error(data.message || "Profile update failed");
            }
        } catch (error) {
            console.error('Profile update error:', error);
            const errorMessage = error.response?.data?.message || error.message || "Error updating profile";
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        const initAuth = async () => {
            const localToken = localStorage.getItem("token");
            if (localToken) {
                setToken(localToken); // Just set state
                checkAuth(); // New checkAuth handles header
            }
        };
        initAuth();
    }, []);

    const value = {
        token,
        authUser,
        login,
        register,
        logout,
        updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
