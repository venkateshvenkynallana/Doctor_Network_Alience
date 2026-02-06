import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, X, Calendar, MessageCircle, AlertCircle } from 'lucide-react';
import './NotificationIcon.css';

const NotificationIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
    setIsOpen(false);
  };

  return (
    <div className="notification-icon-container" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="notification-button"
      >
        <Bell className="notification-bell" />
        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3 className="notification-title">Notifications</h3>
            <div className="notification-actions">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="notification-action-btn"
                >
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="notification-action-btn danger"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="notification-empty">
                <Bell className="notification-empty-icon" />
                <p className="notification-empty-text">No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`notification-item ${
                      !notification.read ? 'unread' : ''
                    }`}
                  >
                    <div className="notification-content">
                      <div className={`notification-icon-wrapper ${notification.type}`}>
                        <Icon className={`notification-icon ${notification.type}`} />
                      </div>
                      <div className="notification-details">
                        <div className="notification-item-header">
                          <p className="notification-item-title">
                            {notification.title}
                          </p>
                          <div className="notification-item-actions">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="notification-item-action"
                              >
                                <Check className="notification-item-action-icon" />
                              </button>
                            )}
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="notification-item-action"
                            >
                              <X className="notification-item-action-icon" />
                            </button>
                          </div>
                        </div>
                        <p className="notification-item-message">
                          {notification.message}
                        </p>
                        <p className="notification-item-time">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
