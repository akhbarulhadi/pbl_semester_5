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
    <section className="relative mt-16 w-full min-h-screen">
      <div className="container md:ml-16 mx-auto p-4">
        {kelas ? (
          <div className="bg-gray-200 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <img src={kelas.gambar} alt={kelas.judul} className="w-full h-48 object-cover rounded-lg mb-3" />
            <h1 className="text-2xl font-bold text-black mb-3">{kelas.judul}</h1>
            <p className="text-black mb-3 text-sm">{kelas.deskripsi}</p>

            <div className="mb-3">
              <p className="text-black text-sm"><strong>Durasi:</strong> {kelas.durasi}</p>
              <p className="text-black text-sm"><strong>Tanggal Mulai:</strong> {kelas.tanggalMulai}</p>
              <p className="text-black text-sm"><strong>Instruktur:</strong> {kelas.instruktur}</p>
              <p className="text-black text-sm"><strong>Status:</strong> 
                <span className={`ml-1 ${kelas.status === 'Sedang Berlangsung' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {kelas.status}
                </span>
              </p>
            </div>

            <Link to="/pengguna/dashboardU" className="inline-block mt-3 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out text-sm">
              Kembali ke Dashboard
            </Link>

          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-500">Kelas tidak ditemukan</h2>
            <Link to="/pengguna/dashboardU" className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out text-sm">
              Kembali ke Dashboard
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LihatKelasDetail;
