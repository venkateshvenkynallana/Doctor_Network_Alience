import React, { useState } from 'react';
import { Users, UserPlus, MessageCircle, Search, Filter, Star, MapPin, Briefcase } from 'lucide-react';
import './Network.css';

const Network = () => {
  const [activeTab, setActiveTab] = useState('connections');
  const [searchTerm, setSearchTerm] = useState('');

  const connections = [];

  const findDoctors = [];

  const groups = [];

  const messages = [];

  const renderConnections = () => (
    <div className="network-grid">
      {connections.map((connection) => (
        <div key={connection.id} className="network-card">
          <div className="network-avatar">
            {connection.avatar ? (
              <img src={connection.avatar} alt={connection.name} />
            ) : (
              <Users className="network-avatar-icon" />
            )}
          </div>
          <div className="network-info">
            <h3 className="network-name">{connection.name}</h3>
            <p className="network-specialty">{connection.specialty}</p>
            <div className="network-meta">
              <div className="network-meta-item">
                <MapPin className="network-meta-icon" />
                <span>{connection.location}</span>
              </div>
              <div className="network-meta-item">
                <Briefcase className="network-meta-icon" />
                <span>{connection.experience}</span>
              </div>
            </div>
            <div className="network-rating">
              <Star className="network-rating-icon" />
              <span>{connection.rating}</span>
            </div>
          </div>
          <div className="network-actions">
            {connection.status === 'connected' ? (
              <button className="network-btn message">
                <MessageCircle />
                Message
              </button>
            ) : connection.status === 'pending' ? (
              <button className="network-btn pending" disabled>
                Pending
              </button>
            ) : (
              <button className="network-btn connect">
                <UserPlus />
                Connect
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderFindDoctors = () => (
    <div className="network-grid">
      {findDoctors.map((doctor) => (
        <div key={doctor.id} className="network-card">
          <div className="network-avatar">
            {doctor.avatar ? (
              <img src={doctor.avatar} alt={doctor.name} />
            ) : (
              <Users className="network-avatar-icon" />
            )}
          </div>
          <div className="network-info">
            <h3 className="network-name">{doctor.name}</h3>
            <p className="network-specialty">{doctor.specialty}</p>
            <div className="network-meta">
              <div className="network-meta-item">
                <MapPin className="network-meta-icon" />
                <span>{doctor.location}</span>
              </div>
              <div className="network-meta-item">
                <Briefcase className="network-meta-icon" />
                <span>{doctor.experience}</span>
              </div>
            </div>
            <div className="network-rating">
              <Star className="network-rating-icon" />
              <span>{doctor.rating}</span>
            </div>
          </div>
          <div className="network-actions">
            <button className="network-btn connect">
              <UserPlus />
              Connect
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGroups = () => (
    <div className="groups-list">
      {groups.map((group) => (
        <div key={group.id} className="group-card">
          <div className="group-header">
            <div className="group-info">
              <h3 className="group-name">{group.name}</h3>
              <p className="group-description">{group.description}</p>
            </div>
            <div className="group-stats">
              <span className="group-members">{group.members.toLocaleString()} members</span>
              <span className={`group-category ${group.category.toLowerCase()}`}>
                {group.category}
              </span>
            </div>
          </div>
          <div className="group-actions">
            {group.joined ? (
              <button className="group-btn joined">
                Joined
              </button>
            ) : (
              <button className="group-btn join">
                Join Group
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderMessages = () => (
    <div className="messages-list">
      {messages.map((message) => (
        <div key={message.id} className={`message-card ${message.unread ? 'unread' : ''}`}>
          <div className="message-avatar">
            <Users className="message-avatar-icon" />
          </div>
          <div className="message-content">
            <div className="message-header">
              <h4 className="message-sender">{message.sender}</h4>
              <span className="message-time">{message.time}</span>
            </div>
            <h5 className="message-subject">{message.subject}</h5>
            <p className="message-preview">{message.preview}</p>
          </div>
          <div className="message-actions">
            <button className="message-btn">
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'connections':
        return renderConnections();
      case 'find-doctors':
        return renderFindDoctors();
      case 'groups':
        return renderGroups();
      case 'messages':
        return renderMessages();
      default:
        return renderConnections();
    }
  };

  return (
    <div className="network-container">
      <div className="network-header">
        <h1 className="network-title">Network</h1>
        <p className="network-subtitle">Connect with healthcare professionals</p>
      </div>

      <div className="network-controls">
        <div className="network-search">
          <Search className="network-search-icon" />
          <input
            type="text"
            placeholder="Search network..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="network-search-input"
          />
        </div>
        
        <div className="network-filters">
          <button className="network-filter-btn">
            <Filter className="network-filter-icon" />
            Filter
          </button>
        </div>
      </div>

      <div className="network-tabs">
        <button
          className={`network-tab ${activeTab === 'connections' ? 'active' : ''}`}
          onClick={() => setActiveTab('connections')}
        >
          Connections
        </button>
        <button
          className={`network-tab ${activeTab === 'find-doctors' ? 'active' : ''}`}
          onClick={() => setActiveTab('find-doctors')}
        >
          Find Doctors
        </button>
        <button
          className={`network-tab ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          Groups
        </button>
        <button
          className={`network-tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
      </div>

      <div className="network-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Network;
