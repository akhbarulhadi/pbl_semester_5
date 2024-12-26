import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaHistory, FaCertificate, FaCog, FaSignOutAlt } from 'react-icons/fa';

function SidebarPengguna() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/auth/profile', {
          method: 'GET',
          credentials: 'include', // penting jika menggunakan cookie untuk autentikasi
        });

        if (!response.ok) {
          throw new Error('Error: ' + response.statusText);
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

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
    <div>
      {/* Sidebar fixed */}
      <div className="fixed top-0 left-0 z-30 w-64 h-full bg-[#84D68E] text-white">
        {/* Profil Section */}
        <div className="flex flex-col items-center bg-[#6EBE7B] text-white py-8 shadow-md">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover shadow-lg border-4 border-white"
          />
          {error ? (
            <div className="text-red-500 font-semibold mt-4">Gagal memuat data profil</div>
          ) : (
            <>
              <h2 className="mt-4 text-xl font-semibold">
                {loading ? 'Loading...' : profileData?.name || 'Nama Tidak Ditemukan'}
              </h2>
              <p className="text-sm text-gray-200">
                {loading ? 'Memuat email...' : profileData?.email || 'Email Tidak Ditemukan'}
              </p>
            </>
          )}
        </div>

        {/* Menu Sidebar */}
        <nav className="mt-8 px-6">
          <ul>
            <li className="p-4 rounded-md mt-3 hover:bg-[#6EBE7B] transition-colors duration-300">
              <Link to="/pengguna/dashboardU" className="flex items-center">
                <FaHome className="text-2xl mr-3" />
                Beranda
              </Link>
            </li>
            <li className="p-4 rounded-md mt-3 hover:bg-[#6EBE7B] transition-colors duration-300">
              <Link to="/pengguna/profile" className="flex items-center">
                <FaUser className="text-2xl mr-3" />
                Profil Saya
              </Link>
            </li>
            <li className="p-4 rounded-md mt-3 hover:bg-[#6EBE7B] transition-colors duration-300">
              <Link to="/pengguna/transaksi" className="flex items-center">
                <FaHistory className="text-2xl mr-3" />
                Riwayat Transaksi
              </Link>
            </li>
            <li className="p-4 rounded-md mt-3 hover:bg-[#6EBE7B] transition-colors duration-300">
              <Link to="/pengguna/sertifikat" className="flex items-center">
                <FaCertificate className="text-2xl mr-3" />
                Sertifikat Anda
              </Link>
            </li>
            <li className="p-4 rounded-md mt-3 hover:bg-[#6EBE7B] transition-colors duration-300">
              <Link to="/pengguna/pengaturan" className="flex items-center">
                <FaCog className="text-2xl mr-3" />
                Pengaturan
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 text-lg px-4 py-3 rounded-md text-white hover:bg-red-600 transition-all w-full"
              >
                <FaSignOutAlt className="text-2xl" />
                Keluar
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SidebarPengguna;
