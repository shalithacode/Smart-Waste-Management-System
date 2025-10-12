import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHistory, FaRecycle, FaUserAlt, FaBell } from 'react-icons/fa';  // Import FaBell for notifications

const Sidebar = () => {
  const location = useLocation();  // Get current location to highlight active link
  const [notificationCount, setNotificationCount] = useState(5);  // Example notification count

  const navItems = [
    { name: "Waste History", path: "/Profile", icon: <FaHistory /> },
    { name: "Recycling", path: "/Recycling", icon: <FaRecycle /> },
    { name: "Membership", path: "/Membership", icon: <FaUserAlt /> },
    { 
      name: "Notifications", 
      path: "/Notifications", 
      icon: <FaBell />, 
      count: notificationCount  // Notification count
    },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 hidden lg:block shadow-lg">
      <nav>
        <ul className="space-y-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center justify-between text-lg font-semibold transition-all duration-300 ease-in-out hover:text-yellow-400
                  ${location.pathname === item.path ? "text-yellow-400" : "text-gray-300"}
                `}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-xl">{item.icon}</span>
                  {item.name}
                </div>

                {/* Notification badge if item has a count */}
                {item.count && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
