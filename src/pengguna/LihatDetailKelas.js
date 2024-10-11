import React from 'react';
import { useParams, Link } from 'react-router-dom';

const LihatKelasDetail = () => {
  const { id } = useParams();

  const kelasYangDiikuti = [
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
      gambar: "https://via.placeholder.com/600x300?text=Node.js+Intermediate",
    },
    {
      id: 3,
      judul: "Dasar-dasar Machine Learning",
      deskripsi: "Pengantar ke machine learning dan implementasi dasar menggunakan Python.",
      durasi: "3 Minggu",
      tanggalMulai: "05 Oktober 2024",
      instruktur: "Alex Johnson",
      status: "Sedang Berlangsung",
      gambar: "https://via.placeholder.com/600x300?text=UI/UX+Design+Basics",
    }
  ];

  const kelas = kelasYangDiikuti.find(k => k.id === parseInt(id));

  return (
    <section className="relative mt-20 bg-gradient-to-r from-purple-100 to-blue-200 w-full min-h-screen">
      <div className="container md:ml-72 mx-auto p-6">
        {kelas ? (
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <img src={kelas.gambar} alt={kelas.judul} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h1 className="text-4xl font-bold text-blue-700 mb-4">{kelas.judul}</h1>
            <p className="text-gray-700 mb-4">{kelas.deskripsi}</p>

            <div className="mb-4">
              <p className="text-gray-700"><strong>Durasi:</strong> {kelas.durasi}</p>
              <p className="text-gray-700"><strong>Tanggal Mulai:</strong> {kelas.tanggalMulai}</p>
              <p className="text-gray-700"><strong>Instruktur:</strong> {kelas.instruktur}</p>
              <p className="text-gray-700"><strong>Status:</strong> 
                <span className={`ml-1 ${kelas.status === 'Sedang Berlangsung' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {kelas.status}
                </span>
              </p>
            </div>

            <Link to="/pengguna/dashboardU" className="inline-block mt-4 mr-3 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
              Kembali ke Dashboard
            </Link>

          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-500">Kelas tidak ditemukan</h2>
            <Link to="/pengguna/dashboardU" className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
              Kembali ke Dashboard
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LihatKelasDetail;
