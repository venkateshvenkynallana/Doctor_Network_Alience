import React from 'react';
import { Bell, Mail, MessageSquare, Calendar, Save, Volume2 } from 'lucide-react';
import './Notifications.css';

const Notifications = () => {
  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Notification Settings</h1>
        <p>Manage how and when you receive notifications</p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2>Notification Channels</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <Mail className="setting-icon" />
                  Email Notifications
                </label>
                <p className="setting-description">
                  Receive notifications via email
                </p>
              </div>
              <button className="toggle-btn active">
                <span className="toggle-slider"></span>
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <Bell className="setting-icon" />
                  Push Notifications
                </label>
                <p className="setting-description">
                  Receive push notifications in your browser
                </p>
              </div>
              <button className="toggle-btn active">
                <span className="toggle-slider"></span>
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <MessageSquare className="setting-icon" />
                  SMS Notifications
                </label>
                <p className="setting-description">
                  Receive notifications via SMS
                </p>
              </div>
              <button className="toggle-btn">
                <span className="toggle-slider"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Event Notifications</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <Calendar className="setting-icon" />
                  Appointment Reminders
                </label>
                <p className="setting-description">
                  Get reminded about upcoming appointments
                </p>
              </div>
              <button className="toggle-btn active">
                <span className="toggle-slider"></span>
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <Bell className="setting-icon" />
                  New Connection Requests
                </label>
                <p className="setting-description">
                  Notify when someone wants to connect
                </p>
              </div>
              <button className="toggle-btn active">
                <span className="toggle-slider"></span>
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <MessageSquare className="setting-icon" />
                  New Messages
                </label>
                <p className="setting-description">
                  Notify when you receive new messages
                </p>
              </div>
              <button className="toggle-btn active">
                <span className="toggle-slider"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-primary">
            <Save className="btn-icon" />
            Save Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
