import React from 'react';
import { Lock, Key, Shield, Smartphone, Save, AlertTriangle } from 'lucide-react';
import './Security.css';

const Security = () => {
  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Security Settings</h1>
        <p>Manage your account security and authentication</p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2>Password Management</h2>
          <div className="settings-form">
            <div className="form-group">
              <label htmlFor="currentPassword">
                <Lock className="form-icon" />
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                placeholder="Enter current password"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">
                <Key className="form-icon" />
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <Key className="form-icon" />
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Two-Factor Authentication</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <Shield className="setting-icon" />
                  Enable 2FA
                </label>
                <p className="setting-description">
                  Add an extra layer of security to your account
                </p>
              </div>
              <button className="toggle-btn">
                <span className="toggle-slider"></span>
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <Smartphone className="setting-icon" />
                  Login Alerts
                </label>
                <p className="setting-description">
                  Get notified when someone logs into your account
                </p>
              </div>
              <button className="toggle-btn active">
                <span className="toggle-slider"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Session Management</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <AlertTriangle className="setting-icon" />
                  Auto-logout
                </label>
                <p className="setting-description">
                  Automatically log out after period of inactivity
                </p>
              </div>
              <select className="setting-select">
                <option>Never</option>
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-primary">
            <Save className="btn-icon" />
            Save Security Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Security;
