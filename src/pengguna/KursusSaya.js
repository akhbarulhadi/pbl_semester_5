import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa'; // Menggunakan ikon buku dari react-icons

const KursusSaya = () => {
  // Data dummy untuk kursus
  const courses = [
    {
      id: 1,
      title: 'Belajar React untuk Pemula',
      description: 'Memahami dasar-dasar React, komponen, state, dan props.',
      progress: 75,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Membangun Aplikasi Web dengan Firebase',
      description: 'Menggunakan Firebase untuk otentikasi, database, dan hosting.',
      progress: 50,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'Dasar-dasar Machine Learning',
      description: 'Pengantar ke machine learning dan implementasi dasar menggunakan Python.',
      progress: 20,
      image: 'https://via.placeholder.com/150',
    },
  ];

  // State untuk pencarian
  const [searchTerm, setSearchTerm] = useState('');

  // Filter kursus berdasarkan pencarian
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="relative mt-20 bg-gradient-to-r from-blue-100 to-white w-full">

    <div className="w-full px-4 py-16 md:px-8 md:py-20">
      {/* Teks di atas */}
      <div className="mb-12 md:ml-72">
        <h1 className="text-5xl font-bold font-poppins text-[#030712] mb-4">Kursus Saya</h1>
        <p className="text-xl text-[#3f3f46] font-poppins">
          Upgrade terus ilmu dan pengalaman <br />
          terbaru kamu di bidang teknologi
        </p>
      </div>

      {/* Input untuk pencarian */}
      <div className="md:ml-72 mb-6">
        <input
          type="text"
          placeholder="Cari kursus..."
          className="w-full md:w-1/2 p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition-all duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Daftar kursus */}
      <div className="md:ml-72 mt-24 min-h-screen mx-auto p-4">
        {filteredCourses.length > 0 ? (
          <ul className="space-y-6">
            {filteredCourses.map(course => (
              <li key={course.id} className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow duration-300 flex items-center">
                <img src={course.image} alt={course.title} className="w-20 h-20 rounded-full mr-4" />
                <Link to={`/dashboard/pengguna/kursus/${course.id}`} className="flex-1">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-2 flex items-center">
                    <FaBookOpen className="mr-2" />
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="relative bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">{course.progress}% selesai</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Tidak ada kursus yang ditemukan.</p>
        )}
      </div>

      {/* Tombol navigasi tambahan */}
      <div className="md:ml-72 mt-8 text-center">
        <Link to="/dashboard/pengguna/semuakursus">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Lihat Semua Kursus
          </button>
        </Link>
      </div>
    </div>
    </section>
  );
};

export default KursusSaya;
