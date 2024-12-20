import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appleLogo from '../assets/images/apple.png';

const Unavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(prevState => !prevState);
  const toggleProfileMenu = () => setIsProfileMenuOpen(prevState => !prevState);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.mobile-menu') && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      if (!event.target.closest('.profile-menu') && isProfileMenuOpen) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, isProfileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Logout failed. Status: ${response.status}`);
        }
        window.location.href = '/';
      })
      .catch((error) => console.error('Logout error:', error));
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-md ">
        <div className="px-3 py-3 lg:px-4 lg:pl-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex ms-2 md:me-56">
              <img src={appleLogo} className="h-14 w-16 me-2" alt="apple" />
              <span className="self-center text-lg font-bold sm:text-xl whitespace-nowrap text-white">APPLE</span>
              <span className="self-center text-lg font-bold sm:text-xl whitespace-nowrap text-gray-300">NESIA</span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-3 ml-28 ">
              <Link
                to="/pengguna/dashboardU"
                className={`text-lg px-3 py-1 rounded-full ${location.pathname === '/pengguna/dashboardU' ? 'text-[#84D68E]' : 'text-black hover:text-green-500'}`}
              >
                Beranda
              </Link>
              <Link
                to="/pengguna/kursus"
                className={`text-lg px-3 py-1 rounded-full ${location.pathname === '/pengguna/kursus' ? 'text-[#84D68E]' : 'text-black hover:text-green-500'}`}
              >
                Kursus Saya
              </Link>
              
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden p-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>

            {/* Profile Dropdown di ujung kanan */}
            <div className="ml-auto relative">
              <button 
                onClick={toggleProfileMenu} 
                className="p-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A8.965 8.965 0 0012 20c2.485 0 4.746-.964 6.427-2.532m1.454-2.947C20.934 12.356 21 11.183 21 10c0-4.418-3.582-8-8-8S5 5.582 5 10c0 1.183.066 2.356.119 3.471m1.454 2.947C6.746 15.036 6 13.601 6 12c0-3.866 3.134-7 7-7s7 3.134 7 7c0 1.601-.746 3.036-2.573 4.316" />
                </svg>
              </button>
              
              {isProfileMenuOpen && (
  <div className="absolute right-0 mt-2 w-48 bg-[#84D68E] shadow-lg rounded-lg profile-menu">
    <Link 
      to="/pengguna/profile" 
      className="block px-4 py-2 text-white hover:text-black"
      onClick={() => setIsProfileMenuOpen(false)}
    >
      Profil Saya
    </Link>

    <Link 
      to="/pengguna/Transaksi" 
      className="block px-4 py-2 text-white hover:text-black"
      onClick={() => setIsProfileMenuOpen(false)}
    >
      Riwayat Transaksi
    </Link>
    <Link 
      to="/pengguna/Sertifikat" 
      className="block px-4 py-2 text-white hover:text-black"
      onClick={() => setIsProfileMenuOpen(false)}
    >
      Sertifikat Anda
    </Link>
    <Link 
      to="/pengguna/pengaturan" 
      className="block px-4 py-2 text-white hover:text-black"
      onClick={() => setIsProfileMenuOpen(false)}
    >
      Pengaturan
    </Link>
    <button 
      className="block px-4 py-2 text-white hover:text-black"
      onClick={handleLogout}
    >
      Keluar
    </button>
  </div>
)}

              
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute inset-0 bg-gray-700 z-40 mobile-menu">
            <ul className="p-6 space-y-4 text-gray-200">
              <li>
                <Link
                  to="/pengguna/dashboardU"
                  className="block text-green-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/pengguna/kursus"
                  className="block text-green-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Kursus Saya
                </Link>
              </li>
              <li>
                <Link
                  to="/pengguna/transaksi"
                  className="block text-green-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Transaksi
                </Link>
              </li>
              <li>
                <Link
                  to="/pengguna/sertifikat"
                  className="block text-green-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sertifikat
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Overlay untuk mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black opacity-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
};

export default Unavbar;
