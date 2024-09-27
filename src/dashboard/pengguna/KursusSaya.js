import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const KursusSaya = () => {
  // Data dummy untuk kursus, bisa diganti dengan data dari API atau database
  const courses = [];

  // State untuk pencarian
  const [searchTerm, setSearchTerm] = useState('');

  // Filter kursus berdasarkan pencarian
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="w-full h-full bg-[#f0f9ff] px-4 py-16 md:px-8 md:py-20">
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

        {/* Daftar kursus atau pesan jika belum ada kursus */}
        <div className="md:ml-72 mt-24 min-h-screen mx-auto p-4">
          {filteredCourses.length > 0 ? (
            <ul className="space-y-6">
              {filteredCourses.map(course => (
                <li key={course.id} className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow duration-300">
                  <Link to={`/dashboard/pengguna/kursus/${course.id}`}>
                    <h3 className="text-2xl font-semibold text-blue-600 mb-2">{course.title}</h3>
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
            <div className="text-center">
              <p className="text-gray-500 mb-6">Kamu belum mengikuti kursus apa pun.</p>
              <Link to="/semuakursus">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
                  Cari Kursus Sekarang
                </button>
              </Link>

            </div>
          )}
        </div> 
      </div>
  );
};

export default KursusSaya;
