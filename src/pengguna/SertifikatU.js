import React from 'react';
import { Link } from 'react-router-dom';

const SertifikatU = () => {
  // Contoh data sertifikat (bisa diambil dari API atau database)
  const sertifikatList = []; // Kosongkan untuk menunjukkan tidak ada sertifikat

  return (
    <section className="relative mt-20 bg-gradient-to-r from-purple-100 to-blue-200 w-full min-h-screen">
      <div className="container md:ml-72 mt-24 min-h-screen mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Halaman Sertifikat</h1>
        <Link to="/pengguna/kursus" className="text-blue-500 mb-4 inline-block">
          Kembali ke Kursus Saya
        </Link>

        {sertifikatList.length === 0 ? ( // Cek jika sertifikatList kosong
          <div className="bg-white border rounded-lg p-4 shadow-md text-center">
            <h2 className="text-xl font-semibold text-red-500">Anda belum memiliki sertifikat</h2>
            <p className="text-gray-600 mt-2">Selesaikan kursus untuk mendapatkan sertifikat.</p>
            <Link to="/pengguna/semua-kursus" className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Lihat Kursus
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sertifikatList.map(sertifikat => (
              <div key={sertifikat.id} className="bg-white border rounded-lg p-4 shadow-md">
                <h2 className="text-xl font-semibold">{sertifikat.judul}</h2>
                <p className="text-gray-600">{sertifikat.tanggal}</p>
                <p className="mt-2">{sertifikat.deskripsi}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SertifikatU;
