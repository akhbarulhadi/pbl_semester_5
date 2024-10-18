import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Impor Link dari react-router-dom
import appleLogo from '../assets/images/apple.png';

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 z-50 w-full bg-gray-600 shadow-md border-b border-gray-700">
        <div className="px-3 py-3 lg:px-4 lg:pl-2 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={appleLogo} className="h-14 w-16 mr-2" alt="apple" />
            <span className="text-lg font-bold sm:text-xl whitespace-nowrap text-white">APPLE</span>
            <span className="text-lg font-bold sm:text-xl whitespace-nowrap text-gray-300">NESIA</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden p-1 text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-600"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Profile dropdown */}
          <div className="relative ml-3">
            <button 
              onClick={toggleProfileMenu} 
              className="p-1 text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A8.965 8.965 0 0012 20c2.485 0 4.746-.964 6.427-2.532m1.454-2.947C20.934 12.356 21 11.183 21 10c0-4.418-3.582-8-8-8S5 5.582 5 10c0 1.183.066 2.356.119 3.471m1.454 2.947C6.746 15.036 6 13.601 6 12c0-3.866 3.134-7 7-7s7 3.134 7 7c0 1.601-.746 3.036-2.573 4.316" />
              </svg>
            </button>
            
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-600 shadow-lg rounded-lg profile-menu">
                <Link 
                  to="/pengguna/profile" 
                  className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Profil Saya
                </Link>
                <Link 
                  to="/pengguna/dashboardU" 
                  className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/pengguna/pengaturan" 
                  className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Pengaturan
                </Link>
                <Link 
                  to="/logout" 
                  className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Keluar
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
