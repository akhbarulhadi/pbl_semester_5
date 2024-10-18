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
  ];

  // Cari transaksi yang sesuai dengan id
  const transaksi = riwayatTransaksi.find(t => t.id === parseInt(id));

  return (
    <section className="relative mt-16 w-full min-h-screen">
      <div className="container md:ml-16 mx-auto p-4">
        {/* Jika transaksi ditemukan */}
        {transaksi ? (
          <div className="bg-gray-200 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-blue-600 mb-2">Detail Transaksi</h1>
            <h2 className="text-xl font-semibold text-blue-500 mb-2">{transaksi.judulKelas}</h2>
            <p className="text-gray-700 mb-2 text-sm">Tanggal Pembelian: {transaksi.tanggalPembelian}</p>
            <p className="text-gray-700 mb-2 text-sm">Total Biaya: {transaksi.totalBiaya}</p>
            <p className="text-gray-700 mb-2 text-sm">Status: 
              <span className={`ml-1 ${transaksi.status === 'Berhasil' ? 'text-green-500' : 'text-red-500'}`}>
                {transaksi.status}
              </span>
            </p>
            <p className="text-gray-700 mb-4 text-sm">Metode Pembayaran: {transaksi.metodePembayaran}</p>

            <Link to="/pengguna/dashboardU" className="inline-block mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
              Kembali ke Dashboard
            </Link>
          </div>
        ) : (
          // Jika transaksi tidak ditemukan
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-500">Transaksi tidak ditemukan</h2>
            <Link to="/pengguna/dashboardU" className="inline-block mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
              Kembali ke Dashboard
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailTransaksi;
