import React from 'react';
import { useParams, Link } from 'react-router-dom';

const DetailTransaksi = () => {
  // Ambil id dari parameter URL
  const { id } = useParams();

  // Data dummy untuk riwayat transaksi
  const riwayatTransaksi = [
    {
      id: 1234567890,
      judulKelas: "React.js untuk Pemula",
      tanggalPembelian: "30 September 2024",
      totalBiaya: "Rp 500.000",
      status: "Berhasil",
      metodePembayaran: "Transfer Bank",
    },
    {
      id: 1234567891,
      judulKelas: "Node.js Intermediate",
      tanggalPembelian: "25 September 2024",
      totalBiaya: "Rp 600.000",
      status: "Dibatalkan",
      metodePembayaran: "Kartu Kredit",
    },
    // Tambahkan lebih banyak data transaksi jika perlu
  ];

  // Cari transaksi yang sesuai dengan id
  const transaksi = riwayatTransaksi.find(t => t.id === parseInt(id));

  return (
    <section className="relative mt-20 bg-gradient-to-r from-purple-100 to-blue-200 w-full min-h-screen">
      <div className="container md:ml-72 mx-auto p-6">
        {/* Jika transaksi ditemukan */}
        {transaksi ? (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-blue-700 mb-4">Detail Transaksi</h1>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">{transaksi.judulKelas}</h2>
            <p className="text-gray-700 mb-4">Tanggal Pembelian: {transaksi.tanggalPembelian}</p>
            <p className="text-gray-700 mb-4">Total Biaya: {transaksi.totalBiaya}</p>
            <p className="text-gray-700 mb-4">Status: 
              <span className={`ml-1 ${transaksi.status === 'Berhasil' ? 'text-green-500' : 'text-red-500'}`}>
                {transaksi.status}
              </span>
            </p>
            <p className="text-gray-700 mb-4">Metode Pembayaran: {transaksi.metodePembayaran}</p>

            <Link to="/pengguna/dashboardU" className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
              Kembali ke Dashboard
            </Link>
          </div>
        ) : (
          // Jika transaksi tidak ditemukan
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-500">Transaksi tidak ditemukan</h2>
            <Link to="/pengguna/dashboardU" className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
              Kembali ke Dashboard
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailTransaksi;
