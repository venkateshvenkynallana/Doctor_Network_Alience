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
                  } bg-transparent border-0 text-white font-medium py-2 px-3 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-10 hover:shadow-lg hover:shadow-white/10 hover:scale-105 active:scale-95 flex items-center justify-between w-full text-left`}
                >
                  <div className="navigation-item-content flex items-center gap-3">
                    <Icon className="navigation-item-icon w-5 h-5 text-white transition-colors duration-300" />
                    <span className="navigation-item-text text-sm font-medium text-white">{item.name}</span>
                  </div>
                  
                  <div className="navigation-item-right flex items-center gap-2">
                    {item.badge && (
                      <span className="navigation-badge bg-red-500 bg-opacity-20 text-white text-xs px-2 py-1 rounded-full border border-red-500 border-opacity-30">
                        {item.badge}
                      </span>
                    )}
                    
                    {hasSubItems && (
                      <ChevronDown 
                        className={`navigation-chevron w-4 h-4 text-white transition-all duration-300 ${
                          isExpanded ? 'open rotate-180' : ''
                        } hover:text-red-400`} 
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
                          } bg-transparent border-0 text-white text-sm py-2 px-3 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-10 hover:shadow-md hover:shadow-white/5 hover:translate-x-1 active:scale-95 flex items-center justify-between w-full text-left ml-4`}
                        >
                          <span className="navigation-submenu-text text-white">{subItem.name}</span>
                          {subItem.badge && (
                            <span className="navigation-submenu-badge bg-red-500 bg-opacity-20 text-white text-xs px-2 py-1 rounded-full border border-red-500 border-opacity-30">
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
