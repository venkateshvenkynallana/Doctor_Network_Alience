import React from 'react';
import { User, Shield, Bell, Lock } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="settings-content">
        <div className="settings-info">
          <div className="info-card">
            <User className="info-icon" />
            <h3>Profile</h3>
            <p>Manage your personal information and professional details</p>
            <p className="info-note">Use the navigation menu to access profile settings</p>
          </div>
          
          <div className="info-card">
            <Shield className="info-icon" />
            <h3>Privacy</h3>
            <p>Control your privacy and data sharing preferences</p>
            <p className="info-note">Use the navigation menu to access privacy settings</p>
          </div>
          
          <div className="info-card">
            <Bell className="info-icon" />
            <h3>Notifications</h3>
            <p>Manage how and when you receive notifications</p>
            <p className="info-note">Use the navigation menu to access notification settings</p>
          </div>
          
          <div className="info-card">
            <Lock className="info-icon" />
            <h3>Security</h3>
            <p>Manage your account security and authentication</p>
            <p className="info-note">Use the navigation menu to access security settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
