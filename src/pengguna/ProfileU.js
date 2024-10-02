import React from 'react';
import { Link } from 'react-router-dom';

const ProfileU = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Web developer and lifelong learner. Passionate about technology and education.',
    courses: [], // Kosongkan daftar kursus
  };

  return (
    <section className="relative mt-20 bg-gradient-to-r from-blue-100 to-white w-full">
      <div className="container md:ml-72 mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Profil Saya</h1>

        {/* Profile Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex items-center">
          <div>
            <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700">
              <strong>Bio:</strong> {user.bio}
            </p>
            <Link to="/edit-profile" className="mt-2 inline-block text-blue-600 font-semibold hover:underline">
              Edit Profil
            </Link>
          </div>
        </div>

        {/* My Courses */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Kursus Saya</h2>
          {user.courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <p className="text-gray-700 mb-4">Anda belum memiliki kursus.</p>
              <p className="text-gray-600 text-center">
                Mulai petualangan belajar Anda dengan mengikuti kursus menarik! 
                <br />
                <Link to="/pengguna/semua-kursus" className="text-blue-600 font-semibold hover:underline">
                  Klik di sini untuk melihat kursus yang tersedia.
                </Link>
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {user.courses.map((course, index) => (
                <li key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm">
                  <span className="text-gray-800">{course.title}</span>
                  <span className="text-gray-600">{new Date(course.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>  
  );
};

export default ProfileU;
