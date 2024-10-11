import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const DashboardU = () => {
  const navigate = useNavigate();

  // Data kelas yang diikuti pengguna
  const kelasYangDiikuti = [
    {
      id: 3,
      judul: "Dasar-dasar Machine Learning",
      status: "Sedang Berlangsung",
      tanggalMulai: "05 Oktober 2024",
      gambar: "https://via.placeholder.com/150",
    }
  ]; // Kosongkan untuk menunjukkan tidak ada kursus yang diikuti

  // Data riwayat transaksi
  const riwayatTransaksi = [
    {
      id: 1234567890,
      judulKelas: "Belajar React untuk Pemula",
      tanggalPembelian: "30 September 2024",
      totalBiaya: "Rp 500.000",
      status: "Berhasil",
    },
  ]; // Kosongkan untuk menunjukkan tidak ada transaksi

  return (
    <section className="relative mt-20 bg-gradient-to-r from-purple-100 to-blue-200 w-full min-h-screen">
      <div className="container md:ml-72 mx-auto p-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-700">Welcome to Your Dashboard</h1>
          <p className="text-lg text-gray-600">Berikut adalah kelas yang sedang Anda ikuti.</p>
        </div>

        {/* Cek apakah ada kelas yang diikuti */}
        {kelasYangDiikuti.length === 0 && riwayatTransaksi.length === 0 ? (
          <div className="text-center mt-20">
            <img
              src="https://via.placeholder.com/150" // Ganti dengan URL gambar yang sesuai
              alt="Belum ada kursus"
              className="mx-auto mb-4 w-32 h-32 object-cover"
            />
            <h2 className="text-2xl font-semibold text-gray-800">Anda belum mengikuti kursus atau melakukan transaksi.</h2>
            <p className="text-gray-600 mt-2">Silakan cari kursus baru untuk memulai.</p>
            <button
              className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
              onClick={() => navigate('/pengguna/semua-kursus')}
            >
              Temukan Kursus
            </button>
          </div>
        ) : (
          <>
            {/* Grid Layout for classes */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Kursus Saya</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Render kelas yang diikuti */}
              {kelasYangDiikuti.map(kelas => (
                <div 
                  key={kelas.id} 
                  className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl relative cursor-pointer" 
                  onClick={() => navigate(`/pengguna/LihatKelas/${kelas.id}`)}
                >
                  <img src={kelas.gambar} alt={kelas.judul} className="w-full h-40 object-cover rounded-lg mb-4" />
                  <h2 className="text-2xl font-semibold text-blue-600 mb-2">{kelas.judul}</h2>
                  <p className="text-gray-700 mb-2">
                    Status: 
                    <span className={`ml-2 ${kelas.status === 'Sedang Berlangsung' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {kelas.status === 'Sedang Berlangsung' ? <FaCheckCircle className="inline mr-1" /> : <FaTimesCircle className="inline mr-1" />}
                      {kelas.status}
                    </span>
                  </p>
                  <p className="text-gray-700">Tanggal Mulai: {kelas.tanggalMulai}</p>
                </div>
              ))}
            </div>

            {/* Riwayat Transaksi */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Riwayat Transaksi</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Render riwayat transaksi */}
                {riwayatTransaksi.map(transaksi => (
                  <div 
                    key={transaksi.id} 
                    className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl relative cursor-pointer" 
                    onClick={() => navigate(`/pengguna/transaksi/${transaksi.id}`)}
                  >
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">{transaksi.judulKelas}</h3>
                    <p className="text-gray-700">Tanggal Pembelian: {transaksi.tanggalPembelian}</p>
                    <p className="text-gray-700">Total Biaya: {transaksi.totalBiaya}</p>
                    <p className="text-gray-700">Status: 
                      <span className={`ml-2 ${transaksi.status === 'Berhasil' ? 'text-green-500' : 'text-red-500'}`}>
                        {transaksi.status}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DashboardU;
