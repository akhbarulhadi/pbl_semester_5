import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import appleLogo from '../assets/images/apple.png'; 
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <motion.nav 
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="fixed top-0 left-0 z-50 w-full bg-gray-600 shadow-md border-b border-gray-700"
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
                <Link to="/" className="text-black font-poppins text-lg px-3 py-1 rounded-full">Home</Link>
              </li>
              <li>
                <Link to="/modul-pelatihan" className="text-black font-poppins text-lg px-3 py-1 rounded-full">Modul pelatihan</Link>
              </li>
              <li>
                <Link to="/forum-diskusi" className="text-black font-poppins text-lg px-3 py-1 rounded-full">Forum diskusi</Link>
              </li>
              <li>
                <Link to="/services" className="text-black font-poppins text-lg px-3 py-1 rounded-full">Pelaporan & Statistik</Link>
              </li>
              <li>
                <Link to="/sertifikat" className="text-black font-poppins text-lg px-3 py-1 rounded-full">Sertifikasi</Link>
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
      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-50 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 mobile-menu`}>
        <div className="relative bg-white dark:bg-gray-800 h-full w-64 p-4">
          <button onClick={toggleMobileMenu} className="absolute top-4 right-4 p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">
            <span className="sr-only">Close menu</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/modul-pelatihan" 
                className="block text-black text-center bg-[#00FFFF] hover:bg-white px-3 py-1 rounded-full"
                onClick={toggleMobileMenu} // Menutup menu setelah klik
              >
                Modul pelatihan
              </Link>
            </li>
            <li>
              <Link 
                to="/forum-diskusi" 
                className="block text-black text-center bg-[#FF00FF] hover:bg-white px-3 py-1 rounded-full"
                onClick={toggleMobileMenu} // Menutup menu setelah klik
              >
                Forum diskusi
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className="block text-black text-center bg-[#FFC83E] hover:bg-white px-3 py-1 rounded-full"
                onClick={toggleMobileMenu} // Menutup menu setelah klik
              >
                Pelaporan & Statistik
              </Link>
            </li>
            <li>
              <Link 
                to="/sertifikat" 
                className="block text-black text-center bg-[#9E9C9C] hover:bg-white px-3 py-1 rounded-full"
                onClick={toggleMobileMenu} // Menutup menu setelah klik
              >
                Sertifikasi
              </Link>
            </li>
            <li>
              <Link 
                to="/manajemen-admin" 
                className="block text-black text-center bg-blue-500 hover:bg-white px-3 py-1 rounded-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Manajemen admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
