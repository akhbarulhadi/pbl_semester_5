// src/Dashboard/Pengguna/DetailPembelian.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DetailPembelian = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (

    <div className="min-h-screen bg-white p-8 mt-16">
      <div className="max-w-4xl mx-auto bg-gray-200 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Detail Pembelian</h1>
        
        {course ? (
          <div>
            <h2 className="text-2xl font-semibold">{course.title}</h2>
            <p className="text-lg text-gray-600">Diajarkan oleh: {course.author}</p>
            <p className="text-xl text-green-600 mt-2"><strong>Harga:</strong> {course.price}</p>
            <p className="mt-4">{course.description}</p>

            {/* Tambahkan informasi pembayaran atau langkah-langkah selanjutnya */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Informasi Pembayaran</h3>
              <p className="text-gray-600">Silakan lanjutkan untuk menyelesaikan pembayaran.</p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700">
                Lanjutkan Pembayaran
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-red-500">Kursus tidak ditemukan.</p>
            <button onClick={handleBack} className="mt-4 text-blue-500 underline">
              Kembali
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPembelian;
