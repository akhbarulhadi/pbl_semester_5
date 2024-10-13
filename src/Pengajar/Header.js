import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";


function Header({ sidebarOpen, setSidebarOpen }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fungsi untuk menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        {/* Tombol sidebar toggle */}
        <button
          className="lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>

        {/* Teks Selamat Datang di sebelah Profil */}
        <div className="flex-grow text-center text-lg font-semibold">
          Selamat Datang di, Dashobard Pengajar
        </div>

        {/* Menu Profil dan Pengaturan di pojok kanan */}
        <div className="relative" ref={dropdownRef}>
          {/* Gambar Profil */}
          <button
            className="focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown menu, tampil jika isDropdownOpen true */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/pengajar/profile-pengajar">Profile Saya</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <a href="/#">Pengaturan</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
