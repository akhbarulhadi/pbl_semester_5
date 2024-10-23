import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileU = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '081234567890',
    address: 'Jl. Example No. 123, Jakarta, Indonesia',
    bio: 'Web developer and lifelong learner. Passionate about technology and education.',
    socialMedia: {
      facebook: 'https://facebook.com/johndoe',
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe'
    },
    profilePicture: 'https://via.placeholder.com/150', // Placeholder untuk foto profil
    certificates: [
      {
        title: 'Certified React Developer',
        date: '2023-09-15',
        image: 'https://via.placeholder.com/120', // Gambar placeholder untuk sertifikat
      },
      {
        title: 'Firebase Expert Certificate',
        date: '2023-09-25',
        image: 'https://via.placeholder.com/120', // Gambar placeholder untuk sertifikat
      },
    ],
  };

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="relative mt-20 bg-gradient-to-r from-blue-50 to-white w-full py-12">
      <div className="container md:ml-72 mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Profil Saya</h1>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center md:items-start md:space-x-6 transition-transform hover:scale-105 duration-300">
          {/* Foto Profil */}
          <div className="mb-4 md:mb-0">
            <img
              src={profileData.foto}
              alt={`${profileData.name}'s profile`}
              className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-blue-200"
            />
          </div>
          {/* Detail Profil */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{profileData.name}</h2>
            <p className="text-gray-600">
              <strong>Email:</strong> {profileData.email}
            </p>
            <p className="text-gray-600">
              <strong>Nomor HP:</strong> {profileData.no_telp ? profileData.no_telp : '---'}
            </p>
            <p className="text-gray-600">
              <strong>Terakhir login:</strong> {new Date(profileData.last_sign_in_at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Dibuat:</strong> {new Date(profileData.created_at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}
            </p>

            {/* Media Sosial */}
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href={user.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a
                href={user.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 transition"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href={user.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition"
              >
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
            </div>

            <Link to="/edit-profile" className="mt-4 inline-block text-white bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-4 rounded-full transition">
              Edit Profil
            </Link>
          </div>
        </div>

        {/* Certificates Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sertifikat yang Dimiliki</h2>
          {user.certificates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-gray-600 mb-4">Anda belum memiliki sertifikat.</p>
              <p className="text-gray-500 mb-4">
                Mulai tingkatkan keterampilan Anda dan raih sertifikat dengan mengikuti kursus!
              </p>
              <Link to="/pengguna/semua-kursus" className="text-white bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-6 rounded-full transition">
                Lihat Kursus
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {user.certificates.map((certificate, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300">
                  <img src={certificate.image} alt={certificate.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{certificate.title}</h3>
                    <p className="text-gray-500">
                      Diperoleh pada: {new Date(certificate.date).toLocaleDateString()}
                    </p>
                    <Link to={`/certificate/${index}`} className="mt-3 inline-block text-blue-600 font-semibold hover:underline">
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileU;
