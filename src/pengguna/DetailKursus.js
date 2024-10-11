import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaUser, FaInfoCircle } from 'react-icons/fa'; // Impor beberapa ikon

const DetailKursus = () => {
  const { id } = useParams();

  const kursusData = [
    {
      id: 1,
      judul: "Belajar React untuk Pemula",
      deskripsi: "Memahami dasar-dasar React, komponen, state, dan props.",
      durasi: "4 Minggu",
      tanggalMulai: "01 Oktober 2024",
      instruktur: "John Doe",
      status: "Sedang Berlangsung",
      gambar: "https://via.placeholder.com/600x300?text=React.js+untuk+Pemula",
    },
    {
      id: 2,
      judul: "Membangun Aplikasi Web dengan Firebase",
      deskripsi: "Menggunakan Firebase untuk otentikasi, database, dan hosting.",
      durasi: "6 Minggu",
      tanggalMulai: "10 Oktober 2024",
      instruktur: "Jane Smith",
      status: "Belum Dimulai",
      gambar: "https://via.placeholder.com/600x300?text=Firebase+untuk+Pemula",
    },
    {
      id: 3,
      judul: "Dasar-dasar Machine Learning",
      deskripsi: "Pengantar ke machine learning dan implementasi dasar menggunakan Python.",
      durasi: "3 Minggu",
      tanggalMulai: "05 Oktober 2024",
      instruktur: "Alex Johnson",
      status: "Sedang Berlangsung",
      gambar: "https://via.placeholder.com/600x300?text=Machine+Learning+Basics",
    }
  ];

  const kursus = kursusData.find(k => k.id === parseInt(id));

  return (
    <section className="relative mt-20 bg-gradient-to-r from-purple-100 to-blue-200 w-full min-h-screen">
      <div className="container md:ml-72 mx-auto p-6">
        {kursus ? (
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <img src={kursus.gambar} alt={kursus.judul} className="w-full h-64 object-cover rounded-lg mb-6 transition-all duration-300 ease-in-out hover:opacity-90" />
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold text-blue-700">{kursus.judul}</h1>
              <span className={`px-3 py-1 rounded-lg text-white ${kursus.status === 'Sedang Berlangsung' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                {kursus.status}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{kursus.deskripsi}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <FaClock className="text-blue-500 mr-2" />
                <p className="text-gray-700"><strong>Durasi:</strong> {kursus.durasi}</p>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-blue-500 mr-2" />
                <p className="text-gray-700"><strong>Tanggal Mulai:</strong> {kursus.tanggalMulai}</p>
              </div>
              <div className="flex items-center">
                <FaUser className="text-blue-500 mr-2" />
                <p className="text-gray-700"><strong>Instruktur:</strong> {kursus.instruktur}</p>
              </div>
              <div className="flex items-center">
                <FaInfoCircle className="text-blue-500 mr-2" />
                <p className="text-gray-700"><strong>Status:</strong> 
                  <span className={`ml-1 ${kursus.status === 'Sedang Berlangsung' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {kursus.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link to="/pengguna/dashboardU" className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                Kembali ke Dashboard
              </Link>
              <Link to={`/pengguna/mulaikelas/${kursus.id}`} className="inline-block mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105">
                Mulai Kelas
              </Link>
              <Link to={`/pengguna/kursus/${kursus.id}`} className="inline-block mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105">
                Lihat Materi
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-500">Kursus tidak ditemukan</h2>
            <Link to="/pengguna/dashboardU" className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
              Kembali ke Dashboard
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailKursus;
