# Components Structure

This directory contains all React components organized by functionality:

## 📁 Folder Structure

```
components/
├── Common/           # Shared/reusable components
│   ├── DNALogo.jsx
│   ├── DNALogo.css
│   ├── ProfileIcon.jsx
│   ├── ProfileIcon.css
│   ├── NotificationIcon.jsx
│   └── NotificationIcon.css
├── Dashboard/        # Dashboard-related components
│   ├── Dashboard.jsx
│   └── Dashboard.css
├── Events/          # Events management components
│   ├── Events.jsx
│   └── Events.css
├── Navigation/      # Navigation and menu components
│   ├── NavigationMenu.jsx
│   └── NavigationMenu.css
├── Network/         # Network and social components
│   ├── Network.jsx
│   └── Network.css
└── Settings/        # Settings and configuration components
    ├── Settings.jsx
    └── Settings.css
```

## 🎯 Menu Categories

### Dashboard
- Main dashboard view with stats and overview

### Events
- **Upcoming** - Future events and appointments
  - `Upcoming/Upcoming.jsx` - Individual upcoming events component
- **Past Events** - Historical events data
  - `Past/Past.jsx` - Individual past events component

### Network
- **Connections** - Professional network connections
- **Find Doctors** - Doctor discovery and search
- **Groups** - Professional groups and communities
- **Messages** - Communication and messaging

### Settings
- **Profile** - User profile management
- **Privacy** - Privacy settings and controls
- **Notifications** - Notification preferences
- **Security** - Security and authentication settings

## 🔧 Common Components
- **DNALogo** - Application logo component
- **ProfileIcon** - User profile avatar
- **NotificationIcon** - Notification bell with badge

## 📱 Navigation
- **NavigationMenu** - Main sidebar navigation with expandable submenus
