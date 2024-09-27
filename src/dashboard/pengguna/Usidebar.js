import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appleLogo from '../../assets/images/apple.png';

const Usidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(prevState => !prevState);

  // Menutup sidebar saat klik di luar elemen sidebar pada mode mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.mobile-menu') && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Menutup sidebar saat rute berubah
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 flex justify-between items-center">
          <a href="/" className="flex items-center">
            <img src={appleLogo} className="h-30 w-16 me-3" alt="apple" />
            <span className="text-xl font-bold sm:text-2xl whitespace-nowrap dark:text-white">APPLE</span>
            <span className="text-xl font-bold sm:text-2xl whitespace-nowrap text-gray-500 dark:text-gray-300">NESIA</span>
          </a>
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden p-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed left-0 z-40 w-64 mt-16 h-full bg-gradient-to-b from-blue-700 to-blue-500 border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-y-auto transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 mobile-menu`}>
        <div className="h-full px-3 py-4">
          <ul className="space-y-4 font-medium">
            <li>
              <Link 
                to="/dashboard/pengguna" 
                className={`flex items-center p-3 rounded-lg transition-all duration-300 ${location.pathname === '/dashboard/pengguna' ? 'text-white bg-blue-800' : 'text-white hover:bg-blue-800 dark:hover:bg-gray-700'}`} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/pengguna/kursus" 
                className={`flex items-center p-3 rounded-lg transition-all duration-300 ${location.pathname === '/dashboard/pengguna/kursus' ? 'text-white bg-blue-800' : 'text-white hover:bg-blue-800 dark:hover:bg-gray-700'}`} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Kursus Saya</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/pengguna/transaksi" 
                className={`flex items-center p-3 rounded-lg transition-all duration-300 ${location.pathname === '/dashboard/pengguna/transaksi' ? 'text-white bg-blue-800' : 'text-white hover:bg-blue-800 dark:hover:bg-gray-700'}`} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="ml-3 flex-1 whitespace-nowrap">Transaksi</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/pengguna/sertifikatU" 
                className={`flex items-center p-3 rounded-lg transition-all duration-300 ${location.pathname === '/dashboard/pengguna/sertifikatU' ? 'text-white bg-blue-800' : 'text-white hover:bg-blue-800 dark:hover:bg-gray-700'}`} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="ml-3 flex-1 whitespace-nowrap">Sertifikat</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/pengguna/pengaturanU" 
                className={`flex items-center p-3 rounded-lg transition-all duration-300 ${location.pathname === '/dashboard/pengguna/settings' ? 'text-white bg-blue-800' : 'text-white hover:bg-blue-800 dark:hover:bg-gray-700'}`} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="ml-3 flex-1 whitespace-nowrap">Pengaturan</span>
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

export default Usidebar;
