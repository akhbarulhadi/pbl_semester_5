import React from "react";

const RiwayatTransaksi = () => {
  // Data contoh transaksi
  const transactions = [
    {
      idTransaksi: "TRX001",
      idPengajar: "PGJ001",
      idPengguna: "PNG001",
      norekening: "1234567890",
      namarekening: "John Doe",
      namabank: "Bank A",
      pemasukan: 500000,
      pengeluaran: 200000,
    },
    {
      idTransaksi: "TRX002",
      idPengajar: "PGJ002",
      idPengguna: "PNG002",
      norekening: "0987654321",
      namarekening: "Jane Smith",
      namabank: "Bank B",
      pemasukan: 750000,
      pengeluaran: 300000,
    },
    // Tambahkan lebih banyak data sesuai kebutuhan
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">ID Transaksi</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">ID Pengajar</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">ID Pengguna</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">No. Rekening</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Nama Rekening</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Nama Bank</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Pemasukan</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Pengeluaran</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.idTransaksi} className="hover:bg-gray-100 transition-colors duration-200">
              <td className="py-2 px-4 border-b border-gray-300">{transaction.idTransaksi}</td>
              <td className="py-2 px-4 border-b border-gray-300">{transaction.idPengajar}</td>
              <td className="py-2 px-4 border-b border-gray-300">{transaction.idPengguna}</td>
              <td className="py-2 px-4 border-b border-gray-300">{transaction.norekening}</td>
              <td className="py-2 px-4 border-b border-gray-300">{transaction.namarekening}</td>
              <td className="py-2 px-4 border-b border-gray-300">{transaction.namabank}</td>
              <td className="py-2 px-4 border-b border-gray-300">Rp {transaction.pemasukan.toLocaleString()}</td>
              <td className="py-2 px-4 border-b border-gray-300">Rp {transaction.pengeluaran.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiwayatTransaksi;
