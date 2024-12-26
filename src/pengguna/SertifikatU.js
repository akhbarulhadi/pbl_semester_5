import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SertifikatU = () => {
  const [sertifikatList, setSertifikatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi sederhana untuk memformat tanggal ke WIB
const formatToWIB = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
};

  useEffect(() => {
    // Fungsi untuk mengambil data sertifikat dari API
    const fetchSertifikat = async () => {
      try {
        const response = await fetch('/api/pengguna/certificate'); // Ganti dengan URL endpoint API Anda
        const data = await response.json();

        if (response.ok) {
          setSertifikatList(data); // Set data sertifikat jika sukses
        } else {
          setError('Gagal memuat sertifikat.');
        }
      } catch (err) {
        setError('Terjadi kesalahan dalam pengambilan data.');
      } finally {
        setLoading(false); // Set loading ke false setelah request selesai
      }
    };

    fetchSertifikat();
  }, []); // Efek ini dijalankan sekali setelah komponen dimuat

  // Menampilkan loading atau error jika ada
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-3 pl-64">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Sertifikat Anda</h1>

      {error && <div className="text-red-500">{error}</div>}

      {sertifikatList.length === 0 ? ( // Cek jika sertifikatList kosong
        <div className="bg-gray-200 p-6 shadow-lg rounded-lg text-center mx-auto max-w-md mt-36"> {/* Kartu informasi */}
          <h2 className="text-xl font-semibold text-red-500">Anda belum memiliki sertifikat</h2>
          <p className="text-gray-600 mt-2">Selesaikan kursus untuk mendapatkan sertifikat.</p>
          <Link to="/pengguna/DashboardU" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Lihat Kursus
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 grid-cols-2 gap-6 mt-8">
          {sertifikatList.map(sertifikat => (
            <div key={sertifikat.id} className="bg-gray-200 border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-lg font-semibold text-gray-800">{sertifikat.courses.course_title}</h2>
              <p className="text-gray-600">{formatToWIB(sertifikat.created_at)}</p>
              <p className="mt-1 text-gray-700">
                {sertifikat.status_certificate === 'Waiting' ? (
                  <span className="text-yellow-500">Menunggu Konfirmasi</span>
                ) : (
                  <span></span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SertifikatU;
