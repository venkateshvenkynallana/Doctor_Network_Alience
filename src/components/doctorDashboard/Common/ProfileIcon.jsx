import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Edit, Settings } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import './ProfileIcon.css';

const ProfileIcon = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleEditProfile = () => {
    if (onMenuClick) {
      onMenuClick('Settings > Profile');
    }
    setIsOpen(false);
  };

  const handleSettings = () => {
    console.log('Opening settings...');
    setIsOpen(false);
  };

  return (
    <div className="profile-icon-container" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="profile-button"
      >
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="profile-avatar"
          />
        ) : (
          <div className="profile-avatar-placeholder">
            <User className="w-6 h-6 text-white" />
          </div>
        )}
        <span className="profile-name">
          {user?.fullName || user?.email || 'User'}
        </span>
        <svg
          className={`profile-dropdown-arrow ${isOpen ? 'open' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="profile-dropdown">
          <div className="profile-dropdown-header">
            <p className="profile-dropdown-name">{user?.fullName || 'User'}</p>
            <p className="profile-dropdown-email">{user?.email || 'user@example.com'}</p>
          </div>
          
          <button
            onClick={handleEditProfile}
            className="profile-dropdown-item"
          >
            <Edit className="profile-dropdown-item-icon" />
            <span>Edit Profile</span>
          </button>
          
                 
          <div className="profile-dropdown-divider"></div>
          
          <button
            onClick={handleLogout}
            className="profile-dropdown-item logout"
          >
            <LogOut className="profile-dropdown-item-icon" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
