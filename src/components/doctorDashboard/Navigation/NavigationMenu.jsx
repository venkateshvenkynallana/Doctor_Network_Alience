import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings,
  ChevronDown
} from 'lucide-react';
import './NavigationMenu.css';

const NavigationMenu = ({ activeItem = 'Dashboard', onItemClick }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const menuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      subItems: []
    },
    {
      name: 'Events',
      icon: Calendar,
      badge: null,
      subItems: [
        { name: 'Upcoming', badge: null },
        { name: 'Past Events', badge: null }
      ]
    },
    {
      name: 'Network',
      icon: Users,
      badge: null,
      subItems: [
        { name: 'Connections', badge: null },
        { name: 'Find Doctors', badge: null },
        { name: 'Groups', badge: null },
        { name: 'Messages', badge: null }
      ]
    },
    {
      name: 'Settings',
      icon: Settings,
      badge: null,
      subItems: [
        { name: 'Profile', badge: null },
        { name: 'Privacy', badge: null },
        { name: 'Notifications', badge: null },
        { name: 'Security', badge: null }
      ]
    }
  ];

  const toggleExpanded = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const handleItemClick = (itemName, isSubItem = false, parentItem = null) => {
    if (onItemClick) {
      if (isSubItem && parentItem) {
        onItemClick(`${parentItem} > ${itemName}`);
      } else {
        onItemClick(itemName);
      }
    }
    
    if (!isSubItem && menuItems.find(item => item.name === itemName)?.subItems.length > 0) {
      toggleExpanded(itemName);
    }
  };

  const isActive = (itemName, isSubItem = false, parentItem = null) => {
    if (isSubItem && parentItem) {
      return activeItem === `${parentItem} > ${itemName}`;
    }
    return activeItem === itemName;
  };

  return (
    <nav className="navigation-menu">
      <div className="navigation-content">
        <h2 className="navigation-title">Menu</h2>
        
        <ul className="navigation-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems[item.name];
            const hasSubItems = item.subItems.length > 0;
            
            return (
              <li key={item.name}>
                <button
                  onClick={() => {
                    if (hasSubItems) {
                      handleItemClick(item.name);
                    } else {
                      onItemClick(item.name);
                    }
                  }}
                  className={`navigation-main-item ${
                    isActive(item.name) ? 'active' : ''
                  }`}
                >
                  <div className="navigation-item-content">
                    <Icon className="navigation-item-icon" />
                    <span className="navigation-item-text">{item.name}</span>
                  </div>
                  
                  <div className="navigation-item-right">
                    {item.badge && (
                      <span className="navigation-badge">
                        {item.badge}
                      </span>
                    )}
                    
                    {hasSubItems && (
                      <ChevronDown 
                        className={`navigation-chevron ${
                          isExpanded ? 'open' : ''
                        }`} 
                      />
                    )}
                  </div>
                </button>
                
                {hasSubItems && isExpanded && (
                  <ul className="navigation-submenu">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <button
                          onClick={() => handleItemClick(subItem.name, true, item.name)}
                          className={`navigation-submenu-item ${
                            isActive(subItem.name, true, item.name) ? 'active' : ''
                          }`}
                        >
                          <span className="navigation-submenu-text">{subItem.name}</span>
                          {subItem.badge && (
                            <span className="navigation-submenu-badge">
                              {subItem.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      
      <div className="navigation-footer">
        <div className="navigation-footer-text">
          © 2024 Doctors Dashboard
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
