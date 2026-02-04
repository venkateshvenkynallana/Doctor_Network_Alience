import React from 'react';
import { Shield, Eye, EyeOff, Lock, Users, Globe, Save } from 'lucide-react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Privacy Settings</h1>
        <p>Control your privacy and data sharing preferences</p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2>Profile Visibility</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <Users className="setting-icon" />
                  Profile Visibility
                </label>
                <p className="setting-description">
                  Control who can see your profile information
                </p>
              </div>
              <select className="setting-select">
                <option>Public</option>
                <option>Connections Only</option>
                <option>Private</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <Eye className="setting-icon" />
                  Show Email Address
                </label>
                <p className="setting-description">
                  Display your email on your public profile
                </p>
              </div>
              <button className="toggle-btn">
                <span className="toggle-slider"></span>
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <EyeOff className="setting-icon" />
                  Show Phone Number
                </label>
                <p className="setting-description">
                  Display your phone number on your profile
                </p>
              </div>
              <button className="toggle-btn">
                <span className="toggle-slider"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Data Sharing</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <Globe className="setting-icon" />
                  Share with Search Engines
                </label>
                <p className="setting-description">
                  Allow your profile to appear in search results
                </p>
              </div>
              <button className="toggle-btn">
                <span className="toggle-slider"></span>
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <Lock className="setting-icon" />
                  Data Analytics
                </label>
                <p className="setting-description">
                  Share anonymous usage data to improve the platform
                </p>
              </div>
              <button className="toggle-btn">
                <span className="toggle-slider"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-primary">
            <Save className="btn-icon" />
            Save Privacy Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
