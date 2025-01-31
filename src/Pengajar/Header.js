import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appleLogo from '../assets/images/apple.png';

const Header = () => {
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
      credentials: 'include', // Jika token disimpan di HttpOnly cookie
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Logout failed. Status: ${response.status}`);
        }
        // Lakukan aksi logout di frontend, misalnya redirect ke halaman login
        window.location.href = '/';
      })
      .catch((error) => console.error('Logout error:', error));
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
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden p-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Profile dropdown */}
          <div className="relative ml-4">
            <button 
              onClick={toggleProfileMenu} 
              className="p-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A8.965 8.965 0 0012 20c2.485 0 4.746-.964 6.427-2.532m1.454-2.947C20.934 12.356 21 11.183 21 10c0-4.418-3.582-8-8-8S5 5.582 5 10c0 1.183.066 2.356.119 3.471m1.454 2.947C6.746 15.036 6 13.601 6 12c0-3.866 3.134-7 7-7s7 3.134 7 7c0 1.601-.746 3.036-2.573 4.316" />
              </svg>
            </button>
            
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-600 border border-gray-700 shadow-lg rounded-lg profile-menu">
                <Link 
                  to="/#" 
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsProfileMenuOpen(false)}>
                  Profil Saya
                </Link>

                <Link 
                  to="/#" 
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsProfileMenuOpen(false)}>
                  Pengaturan
                </Link>

                <Link 
                  // to="/#" 
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                  onClick={handleLogout}>
                  Keluar
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <aside className={`fixed left-0 z-40 w-64 mt-16 h-full bg-gray-700 shadow-lg border-r border-gray-600 transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 mobile-menu`}>
        <div className="h-full px-4 py-6">
          <ul className="space-y-4 font-medium text-gray-200">
            <li>
              <Link 
                to="/pengajar/dashboard-pengajar" 
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${location.pathname === '/pengajar/dashboard-pengajar' ? 'bg-gray-600' : 'hover:bg-gray-600'}`} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/pengajar/kelas" 
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${location.pathname === '/pengajar/kelas' ? 'bg-gray-600' : 'hover:bg-gray-600'}`} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex-1 ml-3">Kelas</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/pengajar/riwayat-transaksi" 
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${location.pathname === '/pengajar/riwayat-transaksi' ? 'bg-gray-600' : 'hover:bg-gray-600'}`} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="ml-3 flex-1">Riwayat Transaksi</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay untuk mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black opacity-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
};

export default Header;