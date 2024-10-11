import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa';

const KursusSaya = () => {
  // Data dummy untuk kursus
  const courses = []; // Kosongkan untuk menunjukkan tidak ada kursus yang diikuti

  // State untuk pencarian
  const [searchTerm, setSearchTerm] = useState('');

  // Filter kursus berdasarkan pencarian
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="relative mt-20 bg-gradient-to-r from-purple-100 to-blue-200 w-full min-h-screen">
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
        <div className="md:ml-72 mt-10 mx-auto p-4">
          {filteredCourses.length > 0 ? (
            <ul className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <li key={course.id} className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <img src={course.image} alt={course.title} className="w-full h-40 rounded-lg mb-4 object-cover" />
                  <Link to={`/pengguna/kursus/${course.id}`} className="flex-1">
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
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150" // Ganti dengan URL gambar yang diinginkan
                alt="Belum ada kursus"
                className="mx-auto mb-4 w-32 h-32 object-cover"
              />
              <p className="text-gray-500 text-xl font-semibold">Anda belum mengikuti kursus.</p>
             </div>
          )}
        </div>

        {/* Tombol navigasi tambahan */}
        <div className="md:ml-72 mt-8 text-center">
          <Link to="/pengguna/semua-kursus">
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
