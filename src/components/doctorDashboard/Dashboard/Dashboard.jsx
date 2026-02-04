import React, { useState } from 'react';
import DNALogo from '../Common/DNALogo';
import ProfileIcon from '../Common/ProfileIcon';
import NotificationIcon from '../Common/NotificationIcon';
import NavigationMenu from '../Navigation/NavigationMenu';
import Events from '../Events/Events';
import Upcoming from '../Events/Upcoming/Upcoming';
import Past from '../Events/Past/Past';
import Network from '../Network/Network';
import Settings from '../Settings/Settings';
import Profile from '../Settings/Profile/Profile';
import ViewProfile from '../Settings/Profile/ViewProfile';
import Privacy from '../Settings/Privacy/Privacy';
import Notifications from '../Settings/Notifications/Notifications';
import Security from '../Settings/Security/Security';
import CompactProfileWidget from './CompactProfileWidget/CompactProfileWidget';
import { FileText, Menu, X, Users, Calendar, User, Settings as SettingsIcon } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = (item) => {
    setActiveMenuItem(item);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <div className="dashboard-container">
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <div className={`dashboard-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="dashboard-sidebar-header">
          <div className="dashboard-logo-container">
            <DNALogo size={42} />
            <span className="dashboard-logo-text">Doctors Network Alliance</span>
           </div>
        </div>
        <NavigationMenu activeItem={activeMenuItem} onItemClick={handleMenuClick} />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="dashboard-header-content">
            <div className="dashboard-header-left">
              <h1 className="dashboard-title text-black">{activeMenuItem}
              </h1>
              <p className="dashboard-subtitle">
                Welcome back
              </p>
            </div>
            
            <div className="dashboard-header-right">
              <NotificationIcon />
              <ProfileIcon onMenuClick={handleMenuClick} />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="dashboard-content">
          {activeMenuItem === 'Dashboard' && (
            <div className="dashboard-section">
              {/* Stats Grid */}
              <div className="stats-grid">
                <CompactProfileWidget />
                
                <div className="stats-card">
                  <div className="stats-card-content">
                    <div className="stats-card-info">
                      <div className="stats-card-title">Total Patients</div>
                      <div className="stats-card-value">1,284</div>
                      <div className="stats-card-change">
                        <span className="stats-card-change-text positive">+12%</span>
                        <span className="stats-card-change-label">from last month</span>
                      </div>
                    </div>
                    <div className="stats-card-icon red">
                      <Users size={24} />
                    </div>
                  </div>
                </div>
                
                <div className="stats-card">
                  <div className="stats-card-content">
                    <div className="stats-card-info">
                      <div className="stats-card-title">Appointments Today</div>
                      <div className="stats-card-value">24</div>
                      <div className="stats-card-change">
                        <span className="stats-card-change-text positive">+8%</span>
                        <span className="stats-card-change-label">from yesterday</span>
                      </div>
                    </div>
                    <div className="stats-card-icon black">
                      <Calendar size={24} />
                    </div>
                  </div>
                </div>
                
                <div className="stats-card">
                  <div className="stats-card-content">
                    <div className="stats-card-info">
                      <div className="stats-card-title">Pending Requests</div>
                      <div className="stats-card-value">7</div>
                      <div className="stats-card-change">
                        <span className="stats-card-change-text negative">-2</span>
                        <span className="stats-card-change-label">from last week</span>
                      </div>
                    </div>
                    <div className="stats-card-icon white">
                      <FileText size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Grid */}
              <div className="dashboard-grid">
                <div className="dashboard-card">
                  <div className="dashboard-card-header">
                    <h3 className="dashboard-card-title">Recent Appointments</h3>
                    <Calendar className="dashboard-card-icon" />
                  </div>
                  <div className="dashboard-card-content">
                    <div className="appointments-list">
                      <div className="appointment-item">
                        <div className="appointment-left">
                          <div className="appointment-avatar">
                            <User className="appointment-avatar-icon" />
                          </div>
                          <div className="appointment-info">
                            <div className="appointment-patient">Sarah Johnson</div>
                            <div className="appointment-type">General Checkup</div>
                          </div>
                        </div>
                        <div className="appointment-right">
                          <div className="appointment-time">10:30 AM</div>
                          <span className="appointment-status confirmed">Confirmed</span>
                        </div>
                      </div>
                      
                      <div className="appointment-item">
                        <div className="appointment-left">
                          <div className="appointment-avatar">
                            <User className="appointment-avatar-icon" />
                          </div>
                          <div className="appointment-info">
                            <div className="appointment-patient">Michael Chen</div>
                            <div className="appointment-type">Follow-up</div>
                          </div>
                        </div>
                        <div className="appointment-right">
                          <div className="appointment-time">2:00 PM</div>
                          <span className="appointment-status pending">Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="dashboard-card">
                  <div className="dashboard-card-header">
                    <h3 className="dashboard-card-title">Quick Actions</h3>
                    <SettingsIcon className="dashboard-card-icon" />
                  </div>
                  <div className="dashboard-card-content">
                    <div className="quick-actions-grid">
                      <button className="quick-action-btn red">
                        <Calendar className="quick-action-icon red" />
                        <span className="quick-action-text">Schedule</span>
                      </button>
                      <button className="quick-action-btn black">
                        <Users className="quick-action-icon black" />
                        <span className="quick-action-text">Patients</span>
                      </button>
                      <button className="quick-action-btn white">
                        <FileText className="quick-action-icon white" />
                        <span className="quick-action-text">Reports</span>
                      </button>
                      <button className="quick-action-btn black">
                        <SettingsIcon className="quick-action-icon black" />
                        <span className="quick-action-text">Settings</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenuItem === 'Events' && <Events />}
          {activeMenuItem === 'Events > Upcoming' && <Upcoming />}
          {activeMenuItem === 'Events > Past Events' && <Past />}
          {activeMenuItem === 'Network' && <Network />}
          {activeMenuItem === 'Network > Connections' && <Network />}
          {activeMenuItem === 'Network > Find Doctors' && <Network />}
          {activeMenuItem === 'Network > Groups' && <Network />}
          {activeMenuItem === 'Network > Messages' && <Network />}
          {activeMenuItem === 'Settings' && <Settings />}
          {activeMenuItem === 'Settings > Profile' && <ViewProfile onMenuClick={handleMenuClick} />}
          {activeMenuItem === 'Settings > Edit Profile' && <Profile onMenuClick={handleMenuClick} />}
          {activeMenuItem === 'Settings > View Profile' && <ViewProfile onMenuClick={handleMenuClick} />}
          {activeMenuItem === 'Settings > Privacy' && <Privacy />}
          {activeMenuItem === 'Settings > Notifications' && <Notifications />}
          {activeMenuItem === 'Settings > Security' && <Security />}

          {activeMenuItem !== 'Dashboard' && 
           !activeMenuItem.startsWith('Events') && 
           !activeMenuItem.startsWith('Network') && 
           !activeMenuItem.startsWith('Settings') && (
            <div className="dashboard-empty-state">
              <div className="dashboard-empty-icon">
                <FileText className="dashboard-empty-icon-inner" />
              </div>
              <h2 className="dashboard-empty-title">{activeMenuItem}</h2>
              <p className="dashboard-empty-text">This section is under development. Check back soon!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
