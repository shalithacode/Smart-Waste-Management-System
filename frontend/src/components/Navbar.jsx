import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaBell } from "react-icons/fa"; // Importing notification icon (FaBell)
import { useAuth } from "../context/AuthContext"; // Importing the useAuth context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Notification count (example)
  const { auth, logout } = useAuth(); // Accessing auth (user and token) and logout from AuthContext
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout(); // Logout the user
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <nav className="bg-[#0c343d] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              ClearWaste
            </Link>
          </div>

          {/* Links (hidden on mobile, visible on large screens) */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              About
            </Link>
            {auth?.user && (
              <Link
                to={auth?.user.role === "admin" ? "/AdminHomePage" : "/UserHomePage"}
                className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
              >
                DashBoard
              </Link>
            )}
            <Link
              to="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-400 hover:underline hover:underline-offset-4 transition-all duration-200"
            >
              Contact
            </Link>

            {/* Notification Icon with Badge */}
            <div className="relative">
              <Link to="/Notifications">
                {" "}
                {/* Navigate to the Notifications page when clicked */}
                <FaBell size={24} className="hover:text-yellow-400" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Link>
            </div>

            {/* Conditionally show Login/Sign Up or Logout based on auth.user */}
            {auth?.user ? (
              <>
                <Link to="/profile" className="text-white hover:text-yellow-400">
                  {/* Profile Icon with a Circle */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-yellow-400 p-1 hover:border-yellow-300 transition-all duration-200">
                    <FaUser size={24} />
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-500 rounded-md text-sm font-medium hover:bg-red-600 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 bg-yellow-400 rounded-md text-sm font-medium text-[#0c343d] hover:bg-yellow-300 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 bg-transparent border border-yellow-400 rounded-md text-sm font-medium hover:bg-yellow-400 hover:text-[#0c343d] transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Icon for mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu (Visible only when the menu is open) */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
              <Link
                to="/BulkWaste"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                BulkWaste
              </Link>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </Link>

              {/* Conditionally show Login/Sign Up or Logout */}
              {auth?.user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={toggleMenu}
                    className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      toggleMenu();
                      handleLogout();
                    }}
                    className="px-3 py-2 bg-[#ffe599] rounded-md text-sm font-medium hover:bg-yellow-300 transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={toggleMenu}
                    className="block hover:text-yellow-400 hover:bg-[#134c4c] px-3 py-2 rounded-md text-base font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
