import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa';

// Data dummy untuk kursus (sama seperti di halaman KursusSaya)
const courses = [
  {
    id: 1,
    title: 'Belajar React untuk Pemula',
    description: 'Memahami dasar-dasar React, komponen, state, dan props.',
    progress: 75,
    image: 'https://via.placeholder.com/150',
    content: 'Ini adalah kursus yang mendalam tentang dasar-dasar React. Kamu akan belajar tentang komponen, state, props, dan banyak lagi.',
  },
  {
    id: 2,
    title: 'Membangun Aplikasi Web dengan Firebase',
    description: 'Menggunakan Firebase untuk otentikasi, database, dan hosting.',
    progress: 50,
    image: 'https://via.placeholder.com/150',
    content: 'Kursus ini akan mengajarkanmu cara menggunakan Firebase untuk otentikasi, database, dan hosting aplikasi web modern.',
  },
  {
    id: 3,
    title: 'Dasar-dasar Machine Learning',
    description: 'Pengantar ke machine learning dan implementasi dasar menggunakan Python.',
    progress: 20,
    image: 'https://via.placeholder.com/150',
    content: 'Pelajari dasar-dasar machine learning, mulai dari konsep hingga implementasi dasar dengan Python.',
  },
];

const DetailKursus = () => {
  // Mengambil id dari URL
  const { id } = useParams();

  // Mencari kursus berdasarkan id
  const course = courses.find(course => course.id === parseInt(id));

  if (!course) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold">Kursus tidak ditemukan</h1>
        <p className="text-gray-500 mt-4">Kursus dengan ID tersebut tidak tersedia.</p>
        <Link to="/dashboard/pengguna/kursus" className="text-blue-500 underline mt-8 block">
          Kembali ke Kursus Saya
        </Link>
      </div>
    );
  }

  return (
    <section className="relative mt-20 bg-gradient-to-r from-blue-100 to-white w-full">
      <div className="w-full px-4 py-16 md:px-8 md:py-20">
        {/* Gambar dan Detail Kursus */}
        <div className="md:ml-72 bg-white shadow-lg rounded-lg p-8 md:flex">
          <img src={course.image} alt={course.title} className="w-48 h-48 rounded-lg mb-6 md:mb-0 md:mr-6" />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-blue-600 mb-4 flex items-center">
              <FaBookOpen className="mr-2" />
              {course.title}
            </h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="relative bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-500 mb-6 block">{course.progress}% selesai</span>
            <p className="text-gray-700 leading-relaxed">{course.content}</p>
          </div>
        </div>

        {/* Tombol Navigasi */}
        <div className="md:ml-72 mt-8 text-center">
          <Link to="/dashboard/pengguna/kursus">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              Kembali ke Kursus Saya
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DetailKursus;
