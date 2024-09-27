import React from 'react';
import { Link } from 'react-router-dom';

const SertifikatU = () => {
  // Contoh data sertifikat (bisa diambil dari API atau database)
  const sertifikatList = [
    {
      id: 1,
      judul: 'Sertifikat Pelatihan Dasar',
      tanggal: '1 Januari 2024',
      deskripsi: 'Sertifikat untuk pelatihan dasar penggunaan perangkat lunak.',
    },
    {
      id: 2,
      judul: 'Sertifikat Pelatihan Lanjutan',
      tanggal: '15 Februari 2024',
      deskripsi: 'Sertifikat untuk pelatihan lanjutan penggunaan perangkat lunak.',
    },
    // Tambahkan sertifikat lainnya sesuai kebutuhan
  ];

  return (
    <div className="container md:ml-72 mt-24 min-h-screen mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Halaman Sertifikat</h1>
      <Link to="/dashboard/pengguna/kursus" className="text-blue-500 mb-4 inline-block">
        Kembali ke Kursus Saya
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sertifikatList.map(sertifikat => (
          <div key={sertifikat.id} className="bg-white border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{sertifikat.judul}</h2>
            <p className="text-gray-600">{sertifikat.tanggal}</p>
            <p className="mt-2">{sertifikat.deskripsi}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SertifikatU;
