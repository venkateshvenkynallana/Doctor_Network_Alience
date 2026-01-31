import React from 'react';
import { Calendar } from 'lucide-react';
import './Events.css';

const Events = () => {
  return (
    <div className="events-container">
      <div className="events-header">
        <h1>Events</h1>
        <p>Manage your events and appointments</p>
      </div>

      <div className="events-content">
        <div className="events-info">
          <div className="info-card">
            <Calendar className="info-icon" />
            <h3>Upcoming Events</h3>
            <p>View and manage your upcoming events and appointments</p>
            <p className="info-note">Use the navigation menu to access upcoming events</p>
          </div>
          
          <div className="info-card">
            <Calendar className="info-icon" />
            <h3>Past Events</h3>
            <p>View your historical events and past activities</p>
            <p className="info-note">Use the navigation menu to access past events</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
