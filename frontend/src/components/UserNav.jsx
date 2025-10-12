import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Navigation links (customized for user dashboard)
  const navLinks = [
    { to: "/UserHomePage", label: "🏠 Home" },
    { to: "/BulkWaste", label: "🕒 Schedule Collection" },
    { to: "/Profile", label: "🗑️ Waste Request History" },
    { to: "/notifications", label: "🔔 Notifications" },
    { to: "/membership", label: "💳 Subscription" },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0c343d] text-white flex flex-col transition-transform duration-300 z-50 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Logo + Close Button */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          <Link to="/" className="text-2xl font-bold text-white">
            ClearWaste
          </Link>
          <button onClick={toggleMenu} className="md:hidden text-white hover:text-yellow-400" aria-label="Close menu">
            <FaTimes size={22} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === link.to
                  ? "bg-[#134c4c] text-yellow-400"
                  : "hover:text-yellow-400 hover:bg-[#134c4c]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="px-4 py-4 border-t border-gray-700">
          {auth?.user ? (
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 bg-red-500 rounded-md text-sm font-medium hover:bg-red-600 transition-all duration-200"
            >
              Logout
            </button>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className="block w-full text-center px-3 py-2 bg-yellow-400 text-[#0c343d] rounded-md text-sm font-medium hover:bg-yellow-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-center px-3 py-2 border border-yellow-400 rounded-md text-sm font-medium hover:bg-yellow-400 hover:text-[#0c343d]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#0c343d] text-white flex items-center justify-between px-4 py-3 sticky top-0 z-40">
        <Link to="/" className="text-xl font-bold">
          ClearWaste
        </Link>
        <button onClick={toggleMenu} aria-label="Open menu">
          <FaBars size={22} />
        </button>
      </div>
    </>
  );
};

export default UserNav;
