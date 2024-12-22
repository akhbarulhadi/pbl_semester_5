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

  return(
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
                    location.pathname === "/pengajar/dashboard-pengajar"
                      ? "#84D68E"
                      : "",
                }} //Menambahkan warna kustom berdasarkan pathname
                to="/pengajar/dashboard-pengajar"
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  location.pathname === "/pengajar/dashboard-pengajar"
                  ? "text-green-300"
                  : ""
                }`}
              >
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                style={{
                  color:
                    location.pathname === "/pengajar/kelas"
                      ? "#84D68E"
                      : "",
                }} //Menambahkan warna kustom berdasarkan pathname
                to="/pengajar/kelas"
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  location.pathname === "/pengajar/kelas"
                  ? "text-green-300"
                  : ""
                }`}
              >
                <span className="ml-3">Kelas</span>
              </Link>
            </li>
            
            <li>
              <Link
                style={{
                  color:
                    location.pathname === "/pengajar/riwayat-transaksi"
                      ? "#84D68E"
                      : "",
                }} //Menambahkan warna kustom berdasarkan pathname
                to="/pengajar/riwayat-transaksi"
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  location.pathname === "/pengajar/riwayat-transaksi"
                  ? "text-green-300"
                  : ""
                }`}
              >
                <span className="ml-3">Riwayat Transaksi</span>
              </Link>
            </li>

            <li>
              <Link
                style={{
                  color:
                    location.pathname === "/pengajar/forum-diskusi"
                      ? "#84D68E"
                      : "",
                }} //Menambahkan warna kustom berdasarkan pathname
                to="/pengajar/forum-diskusi"
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  location.pathname === "/pengajar/forum-diskusi"
                  ? "text-green-300"
                  : ""
                }`}
              >
                <span className="ml-3">Forum Diskusi</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Tombol Mobile Menu */}
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