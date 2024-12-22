import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import appleLogo from "../assets/images/apple.png";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prevState) => !prevState);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 z-40 w-64 h-full bg-white shadow-lg border-r border-green-400 transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="h-full px-4 py-6">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <img src={appleLogo} className="h-14 w-16 mr-2" alt="apple" />
            <div>
              <span className="text-lg font-bold text-black">APPLE</span>
              <span className="text-lg font-bold text-gray-300">NESIA</span>
            </div>
          </div>

          {/* Navigation */}
          <ul className="space-y-4 font-medium text-black">
            <li>
              <Link
                style={{
                  color:
                    location.pathname === "/admin/dashboard-admin"
                      ? "#84D68E"
                      : "",
                }} // Menambahkan warna kustom berdasarkan pathname
                to="/admin/dashboard-admin"
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  location.pathname === "/admin/dashboard-admin"
                    ? "text-green-300"
                    : ""
                }`}
              >
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            {/* <li>
              <Link
                to="/admin/daftar-pengajar"
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  location.pathname === "/admin/daftar-pengajar"
                    ? "bg-gray-600"
                    : "hover:bg-gray-600"
                }`}
              >
                <span className="flex-1 ml-3">Daftar Pengajar</span>
              </Link>
            </li> */}
            {/* <li>
              <Link
                to="/admin/persetujuan-buka-kelas"
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  location.pathname === "/admin/persetujuan-buka-kelas"
                  ? "#84D68E"
                  : ""
                }`}
              >
                <span className="ml-3 flex-1">Kelas</span>
              </Link>
            </li> */}
            <li>
              <Link
                style={{
                  color:
                    location.pathname === "/admin/kelas"
                      ? "#84D68E"
                      : "",
                }} // Menambahkan warna kustom berdasarkan pathname
                to="/admin/kelas"
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  location.pathname === "/admin/kelas"
                    ? "text-green-300"
                    : ""
                }`}
              >
                <span className="ml-3">Kelas</span>
              </Link>
            </li>
            {/* <li>
              <Link
                to="/admin/persetujuan-penarikan"
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  location.pathname === '/admin/persetujuan-penarikan'
                    ? 'bg-gray-600'
                    : 'hover:bg-gray-600'
                }`}
              >
                <span className="ml-3 flex-1">Persetujuan Penarikan Duit</span>
              </Link>
            </li> */}
            <li>
              <Link
                style={{
                  color:
                    location.pathname === "/admin/riwayat-transaksi"
                      ? "#84D68E"
                      : "",
                }} // Menambahkan warna kustom berdasarkan pathname
                to="/admin/riwayat-transaksi"
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  location.pathname === "/admin/riwayat-transaksi"
                    ? "text-green-300"
                    : ""
                }`}
              >
                <span className="ml-3">Riwayat Transaksi</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay untuk mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Tombol untuk Mobile Menu */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 p-2 text-gray-300 bg-gray-700 rounded-md md:hidden"
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </>
  );
};

export default Sidebar;
