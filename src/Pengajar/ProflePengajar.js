import React, { useState, useEffect } from 'react';

const ProfilePengajar = () => {
  // State untuk menyimpan data profile
  const [profile, setProfile] = useState(null);
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
        setProfile(data); // Update state dengan data dari API
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfileData();
  }, []);

  
  // State untuk mode edit
  const [isEditing, setIsEditing] = useState(false);

  // Fungsi untuk mengupdate state saat input diubah
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Fungsi untuk menghandle upload foto
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          foto: reader.result, // Menyimpan foto dalam bentuk base64 untuk preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi untuk menyimpan perubahan
  const handleSave = () => {
    setIsEditing(false);
    alert('Profil berhasil disimpan!');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">Profil Pengajar</h2>

      <div className="flex flex-col items-center mb-4">
        {profile && profile.foto ? (
          <img
            src={`/api/${profile.foto}`}
            alt="Foto Pengajar"
            className="w-32 h-32 rounded-full object-cover mb-4 md:w-40 md:h-40 lg:w-48 lg:h-48"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center md:w-40 md:h-40 lg:w-48 lg:h-48">
            <span className="text-gray-500">Foto</span>
          </div>
        )}

        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="mb-4 w-full"
          />
        )}
      </div>
      {profile && ['name', 'email', 'portofolio', 'no_telp'].map((field, index) => (
        <div className="mb-4" key={index}>
          <label className="block text-gray-700 font-medium mb-2 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
          {isEditing ? (
            <input
              type={field === 'email' ? 'email' : field === 'portofolio' ? 'url' : 'text'}
              name={field}
              value={profile[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="text-gray-700">
              {field === 'portofolio' ? (
                <a href={profile.portofolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {profile.portofolio}
                </a>
              ) : (
                profile[field]
              )}
            </p>
          )}
        </div>
      ))}
      {isEditing ? (
        <button
          onClick={handleSave}
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          Simpan Perubahan
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          Edit Profil
        </button>
      )}
    </div>
  );
};

export default ProfilePengajar;
