import React from "react";

const dataKelas = [
  {
    namaPengajar: "John Doe",
    namaKelas: "Reparasi iPhone XR",
    deskripsiKelas: "Cara membongkar iPhone XR",
    hargaKelas: 40000,
    statusKelas: "Disetujui",
    aksi: "",
  },
  {
    namaPengajar: "Romeo Santos",
    namaKelas: "Reparasi iPhone 13",
    deskripsiKelas: "Cara mengganti LCD iPhone 13",
    hargaKelas: 50000,
    statusKelas: "Menunggu",
    aksi: "",
  },
  {
    namaPengajar: "Lorem Ipsum",
    namaKelas: "Reparasi iPhone 6s",
    deskripsiKelas: "Cara membongkar iPhone 6s",
    hargaKelas: 100000,
    statusKelas: "Ditolak",
    aksi: "",
  },
  // Tambahkan lebih banyak data sesuai kebutuhan
];

const PersetujuanKelas = () => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Disetujui":
        return "text-green-600"; // Warna hijau
      case "Ditolak":
        return "text-red-600"; // Warna merah
      case "Menunggu":
        return "text-yellow-600"; // Warna kuning
      default:
        return "";
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Nama Pengajar</th>
            <th className="py-2 px-4 border-b">Nama Kelas</th>
            <th className="py-2 px-4 border-b">Deskripsi Kelas</th>
            <th className="py-2 px-4 border-b">Harga</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataKelas.map((kelas, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{kelas.namaPengajar}</td>
              <td className="py-2 px-4 border-b">{kelas.namaKelas}</td>
              <td className="py-2 px-4 border-b">{kelas.deskripsiKelas}</td>
              <td className="py-2 px-4 border-b text-center">{kelas.hargaKelas}</td>
              <td className={`py-2 px-4 border-b text-center ${getStatusClass(kelas.statusKelas)}`}>{kelas.statusKelas}</td>
              <td className="py-2 px-4 border-b text-center">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    onClick={() => handleAction(kelas)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-gray-200 rounded-s-lg hover:bg-blue-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    Setuju
                  </button>
                  <button
                    onClick={() => handleAction(kelas)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-gray-200 rounded-e-lg hover:bg-red-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    Tolak
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const handleAction = (kelas) => {
  alert(`Aksi untuk kelas: ${kelas.namaKelas}`);
};

export default PersetujuanKelas;
