import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Filter, Search } from 'lucide-react';
import './Upcoming.css';

const Upcoming = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const upcomingEvents = [];

  const getEventTypeColor = (type) => {
    const colors = {
      conference: 'blue',
      meeting: 'green',
      workshop: 'purple',
      symposium: 'orange',
      social: 'pink'
    };
    return colors[type] || 'gray';
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'green',
      tentative: 'yellow',
      completed: 'gray',
      cancelled: 'red'
    };
    return colors[status] || 'gray';
  };

  const filteredEvents = upcomingEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="events-container">
      <div className="events-header">
        <h1>Upcoming Events</h1>
        <p>Manage and view your upcoming events and appointments</p>
      </div>

      <div className="events-controls">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <Filter className="filter-icon" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="conference">Conferences</option>
            <option value="meeting">Meetings</option>
            <option value="workshop">Workshops</option>
            <option value="symposium">Symposiums</option>
            <option value="social">Social</option>
          </select>
        </div>
      </div>

      <div className="events-content">
        {filteredEvents.length === 0 ? (
          <div className="no-events">
            <Calendar className="no-events-icon" />
            <h3>No upcoming events</h3>
            <p>There are no upcoming events scheduled. Check back later!</p>
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <div className={`event-type ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </div>
                  <div className={`event-status ${getStatusColor(event.status)}`}>
                    {event.status}
                  </div>
                </div>
                
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  
                  <div className="event-details">
                    <div className="event-detail">
                      <Calendar className="event-detail-icon" />
                      <span>{event.date}</span>
                    </div>
                    <div className="event-detail">
                      <Clock className="event-detail-icon" />
                      <span>{event.time}</span>
                    </div>
                    <div className="event-detail">
                      <MapPin className="event-detail-icon" />
                      <span>{event.location}</span>
                    </div>
                    <div className="event-detail">
                      <Users className="event-detail-icon" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upcoming;
