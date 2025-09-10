// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  const menuItems = [
    {
      id: 'home',
      title: 'Home',
      path: '/',
      icon: '🏠',
      gradient: 'from-blue-500 to-blue-600',
      hoverGradient: 'from-blue-600 to-blue-700',
      description: 'Dashboard & Overview'
    },
    {
      id: 'paid-courses',
      title: 'Paid Courses',
      path: '/paid-courses',
      icon: '💎',
      gradient: 'from-purple-500 to-purple-600',
      hoverGradient: 'from-purple-600 to-purple-700',
      description: 'Premium Learning Content'
    },
    {
      id: 'free-courses',
      title: 'Free Courses',
      path: '/free-courses',
      icon: '🎓',
      gradient: 'from-green-500 to-green-600',
      hoverGradient: 'from-green-600 to-green-700',
      description: 'Free Educational Content'
    },
    {
      id: 'job-alerts',
      title: 'Job Alerts',
      path: '/job-alerts',
      icon: '🔔',
      gradient: 'from-orange-500 to-orange-600',
      hoverGradient: 'from-orange-600 to-orange-700',
      description: 'Latest Career Opportunities'
    },
    {
      id: 'about',
      title: 'About',
      path: '/about',
      icon: 'ℹ️',
      gradient: 'from-teal-500 to-teal-600',
      hoverGradient: 'from-teal-600 to-teal-700',
      description: 'Learn More About Us'
    }
  ];

  // Update active item based on current location
  useEffect(() => {
    const currentPath = location.pathname;
    const activeMenuItem = menuItems.find(item => item.path === currentPath);
    setActiveItem(activeMenuItem ? activeMenuItem.id : '');
  }, [location]);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`fixed top-20 z-50 bg-white shadow-lg rounded-r-lg p-2 transition-all duration-300 ${
          isCollapsed ? 'left-16' : 'left-60'
        } hover:bg-gray-50`}
      >
        <svg 
          className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
            isCollapsed ? 'rotate-180' : ''
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50 shadow-xl transition-all duration-300 ease-in-out z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className={`transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              MAIN MENU
            </h3>
            <p className="text-sm text-gray-500">Navigate through your learning journey</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => handleItemClick(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`group relative flex items-center rounded-xl transition-all duration-300 overflow-hidden ${
                isCollapsed ? 'p-3 justify-center' : 'p-4'
              } ${
                activeItem === item.id
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-105`
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Background Animation */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`relative z-10 text-2xl transition-transform duration-300 ${
                hoveredItem === item.id ? 'scale-110' : ''
              } ${activeItem === item.id ? 'animate-bounce' : ''}`}>
                {item.icon}
              </div>

              {/* Title and Description */}
              {!isCollapsed && (
                <div className="relative z-10 ml-4 flex-1">
                  <div className={`font-semibold transition-colors duration-300 ${
                    activeItem === item.id ? 'text-white' : 'text-gray-800 group-hover:text-white'
                  }`}>
                    {item.title}
                  </div>
                  <div className={`text-xs transition-colors duration-300 ${
                    activeItem === item.id ? 'text-blue-100' : 'text-gray-500 group-hover:text-gray-200'
                  }`}>
                    {item.description}
                  </div>
                </div>
              )}

              {/* Active Indicator */}
              {activeItem === item.id && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full animate-pulse"></div>
              )}

              {/* Ripple Effect */}
              <div className={`absolute inset-0 bg-white opacity-0 group-active:opacity-20 rounded-xl transition-opacity duration-150`}></div>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 transition-all duration-300 ${
          isCollapsed ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-gray-600">All systems operational</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">ClassWave Learning Platform</p>
          </div>
        </div>

        {/* Tooltip for collapsed state */}
        {isCollapsed && hoveredItem && (
          <div className="fixed left-20 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg z-50 pointer-events-none transition-all duration-200"
               style={{
                 top: `${menuItems.findIndex(item => item.id === hoveredItem) * 60 + 140}px`
               }}>
            <div className="text-sm font-medium">
              {menuItems.find(item => item.id === hoveredItem)?.title}
            </div>
            <div className="text-xs text-gray-300">
              {menuItems.find(item => item.id === hoveredItem)?.description}
            </div>
            {/* Arrow */}
            <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900"></div>
          </div>
        )}
      </aside>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        ></div>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;