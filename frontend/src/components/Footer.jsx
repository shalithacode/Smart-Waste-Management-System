import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = ({ isHome }) => {
  return (
    <footer className={`bg-[#175E5E] text-white py-6 ${!isHome ? "md:ml-64" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-6">
            <Link to="/" className="hover:underline hover:text-yellow-300 transition">
              Home
            </Link>
            <Link to="/about" className="hover:underline hover:text-yellow-300 transition">
              About
            </Link>
            <Link to="/services" className="hover:underline hover:text-yellow-300 transition">
              Services
            </Link>
            <Link to="/contact" className="hover:underline hover:text-yellow-300 transition">
              Contact
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-5">
            <a
              href="https://facebook.com"
              className="hover:text-yellow-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-yellow-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={22} />
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-yellow-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={22} />
            </a>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-4 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} <span className="font-semibold text-white">ClearWaste</span>. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
