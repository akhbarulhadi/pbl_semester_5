import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex-1 p-8  min-h-screen pl-72">
      <h1 className="text-3xl font-bold ">Profile</h1>
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">{profileData?.name || 'Nama Tidak Ditemukan'}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Email:</strong> {profileData?.email || 'Email Tidak Ditemukan'}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Nomor HP:</strong> {profileData?.no_telp || '---'}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Terakhir login:</strong>{' '}
          {profileData?.last_sign_in_at
            ? new Date(profileData.last_sign_in_at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
            : 'Belum ada data'}
        </p>
        <p className="text-gray-700">
          <strong>Dibuat:</strong>{' '}
          {profileData?.created_at
            ? new Date(profileData.created_at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
            : 'Belum ada data'}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
