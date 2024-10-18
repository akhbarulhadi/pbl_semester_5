import React from 'react';
import { Link } from 'react-router-dom';

const SertifikatU = () => {
  // Contoh data sertifikat (bisa diambil dari API atau database)
  const sertifikatList = []; // Kosongkan untuk menunjukkan tidak ada sertifikat

  return (
    <div className="container mx-auto p-3">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Halaman Sertifikat</h1>
        <Link to="/pengguna/kursus" className="text-blue-500 mb-6 inline-block">
          Kembali ke Kursus Saya
        </Link>

        {sertifikatList.length === 0 ? ( // Cek jika sertifikatList kosong
          <div className="bg-gray-200 p-6 shadow-lg rounded-lg text-center mx-auto max-w-md"> {/* Kartu informasi */}
            <h2 className="text-xl font-semibold text-red-500">Anda belum memiliki sertifikat</h2>
            <p className="text-gray-600 mt-2">Selesaikan kursus untuk mendapatkan sertifikat.</p>
            <Link to="/pengguna/semua-kursus" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
              Lihat Kursus
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 grid-cols-2 gap-6 mt-8">
            {sertifikatList.map(sertifikat => (
              <div key={sertifikat.id} className="bg-gray-200 border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"> 
                <h2 className="text-lg font-semibold text-gray-800">{sertifikat.judul}</h2>
                <p className="text-gray-600">{sertifikat.tanggal}</p>
                <p className="mt-1 text-gray-700">{sertifikat.deskripsi}</p>
              </div>
            ))}
          </div>
        )}
      </div>
  );
};

export default SertifikatU;
