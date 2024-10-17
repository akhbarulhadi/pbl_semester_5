import React from "react";
import { Link } from "react-router-dom";


const Kelas = () => {
  // Data contoh kelas
  const kelasTable = [
    {
      namaKelas: "Kelas Pemrograman Dasar",
      jumlahPengikut: 150,
      status: "Aktif",
      penyelesaian: 75, // Persentase
    },
    {
      namaKelas: "Kelas Desain Grafis",
      jumlahPengikut: 200,
      status: "Selesai",
      penyelesaian: 100,
    },
    {
      namaKelas: "Kelas Pemasaran Digital",
      jumlahPengikut: 120,
      status: "Aktif",
      penyelesaian: 50,
    },
    // Tambahkan lebih banyak data sesuai kebutuhan
  ];

  return (
    <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">TABLE KELAS</h2>
      <div className="mb-4">
        <Link to="/pengajar/form-kelas" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Tambah Kelas
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Nama Kelas</th>
              <th className="py-2 px-4 border-b">Jumlah Pengikut</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Penyelesaian</th>
            </tr>
          </thead>
          <tbody>
            {kelasTable.map((kelas, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{kelas.namaKelas}</td>
                <td className="py-2 px-4 border-b">{kelas.jumlahPengikut}</td>
                <td className="py-2 px-4 border-b">{kelas.status}</td>
                <td className="py-2 px-4 border-b">
                  <div className="relative w-full">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-300 rounded h-2">
                        <div
                          className={`bg-green-500 h-2 rounded`}
                          style={{ width: `${kelas.penyelesaian}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-semibold">{kelas.penyelesaian}%</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Kelas;
