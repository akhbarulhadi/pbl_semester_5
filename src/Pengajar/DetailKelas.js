import React from "react";
import { useParams } from "react-router-dom";

const TableKelas = [
  {
    namaKelas: "Kelas Pemrograman Dasar",
    jumlahPengikut: 150,
    status: "Aktif",
    penyelesaian: 75, // persen pengikut yang sudah selesai
    waktuPembelajaran: "2 jam",
    tipePembelajaran: "Online",
  },
  {
    namaKelas: "Kelas Desain Grafis",
    jumlahPengikut: 200,
    status: "Selesai",
    penyelesaian: 100, // persen pengikut yang sudah selesai
    waktuPembelajaran: "3 jam",
    tipePembelajaran: "Offline",
  },
  {
    namaKelas: "Kelas Pemasaran Digital",
    jumlahPengikut: 120,
    status: "Aktif",
    penyelesaian: 50, // persen pengikut yang sudah selesai
    waktuPembelajaran: "1 jam",
    tipePembelajaran: "Online",
  },
];

const DetailKelas = () => {
  const { namaKelas } = useParams();
  const kelas = TableKelas.find(
    (k) => k.namaKelas === decodeURIComponent(namaKelas)
  );

  if (!kelas) {
    return (
      <div className="text-center mt-8 text-xl text-red-500">
        Kelas tidak ditemukan.
      </div>
    );
  }

  const pengikutSelesai = Math.round(
    (kelas.jumlahPengikut * kelas.penyelesaian) / 100
  );
  const pengikutBelumSelesai = kelas.jumlahPengikut - pengikutSelesai;

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl max-w-3xl mx-auto">
      {/* Header Title */}
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800">
        Detail Kelas
      </h2>

      {/* Nama Kelas */}
      <h1 className="text-3xl font-medium text-gray-900 mb-6">{kelas.namaKelas}</h1>

      {/* Informasi Kelas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-1 rounded-lg shadow-md">
          <p className="text-medium">
            <strong>Jumlah Pengikut:</strong> {kelas.jumlahPengikut}
          </p>
        </div>
        <div className="bg-gray-50 p-1 rounded-lg shadow-md">
          <p className="text-medium">
            <strong>Status:</strong> {kelas.status}
          </p>
        </div>
        <div className="bg-gray-50 p-1 rounded-lg shadow-md">
          <p className="text-medium">
            <strong>Waktu Pembelajaran:</strong> {kelas.waktuPembelajaran}
          </p>
        </div>
        <div className="bg-gray-50 p-1 rounded-lg shadow-md">
          <p className="text-medium">
            <strong>Tipe Pembelajaran:</strong> {kelas.tipePembelajaran}
          </p>
        </div>
      </div>

      {/* Penyelesaian & Progress Bar */}
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Progress Penyelesaian</h3>
        <div className="w-full bg-gray-300 rounded-full h-4 mb-2">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${kelas.penyelesaian}%` }}
          ></div>
        </div>
        <p className="text-medium text-gray-600">{kelas.penyelesaian}% Selesai</p>
      </div>

      {/* Informasi Pengikut */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-medium font-medium text-green-600">
            Pengikut yang Selesai: {pengikutSelesai}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-medium font-medium text-red-500">
            Pengikut yang Belum Selesai: {pengikutBelumSelesai}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailKelas;
