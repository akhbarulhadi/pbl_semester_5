import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import appleLogo from '../assets/images/apple.png'; 
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get current location

  const toggleDropdown = () => setIsDropdownOpen(prevState => !prevState);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prevState => !prevState);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown') && !event.target.closest('.mobile-menu')) {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to check if the path matches
  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="fixed top-0 left-0 z-50 w-full bg-white shadow-md border-b"
    >
      <div className="px-2 py-2 lg:px-3 lg:pl-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <a href="/" className="flex ms-2 md:me-16">
              <img src={appleLogo} className="h-14 w-16 me-2" alt="apple" />
              <span className="self-center text-lg font-bold sm:text-xl whitespace-nowrap text-white">APPLE</span>
              <span className="self-center text-lg font-bold sm:text-xl whitespace-nowrap text-gray-300">NESIA</span>
            </a>
            <ul className="hidden lg:flex items-center space-x-3">
              <li>
                <Link 
                  to="/" 
                  className={`text-lg px-3 py-1 rounded-full ${isActive('/') ? 'text-green-500' : 'text-black hover:text-green-500'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/modul-pelatihan" 
                  className={`text-lg px-3 py-1 rounded-full ${isActive('/modul-pelatihan') ? 'text-green-500' : 'text-black hover:text-green-500'}`}
                >
                  Modul Pelatihan
                </Link>
              </li>
              <li>
                <Link 
                  to="/forum-diskusi" 
                  className={`text-lg px-3 py-1 rounded-full ${isActive('/forum-diskusi') ? 'text-green-500' : 'text-black hover:text-green-500'}`}
                >
                  Forum Diskusi
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className={`text-lg px-3 py-1 rounded-full ${isActive('/services') ? 'text-green-500' : 'text-black hover:text-green-500'}`}
                >
                  Pelaporan & Statistik
                </Link>
              </li>
              <li>
                <Link 
                  to="/sertifikat" 
                  className={`text-lg px-3 py-1 rounded-full ${isActive('/sertifikat') ? 'text-green-500' : 'text-black hover:text-green-500'}`}
                >
                  Sertifikasi
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/login" className="text-white bg-[#007BFF] hover:bg-black px-3 py-1 rounded-full text-lg">Log In</Link>
            <Link to="/signup" className="text-white bg-[#007BFF] hover:bg-black px-3 py-1 rounded-full text-lg">Sign Up</Link>
            <button 
              onClick={toggleMobileMenu} 
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
              aria-controls="navbar-default" 
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
