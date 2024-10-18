import React from 'react';

const Transaksi = () => {
  // Data dummy untuk transaksi
  const transactions = [
    {
      id: 1,
      courseName: 'Belajar React untuk Pemula',
      amount: 'Rp 500,000',
      status: 'Sukses',
    },
    {
      id: 2,
      courseName: 'Membangun Aplikasi Web dengan Firebase',
      amount: 'Rp 750,000',
      status: 'Menunggu Pembayaran',
    },
    {
      id: 3,
      courseName: 'Dasar-dasar Machine Learning',
      amount: 'Rp 1,000,000',
      status: 'Dibatalkan',
    },
  ];

  return (
    <div className="p-4 md:ml-64 mt-16 min-h-screen mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Riwayat Transaksi</h2>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-gray-50"> {/* Ganti bg-white dengan bg-gray-50 */}
          <thead className="bg-gray-200"> {/* Tambahkan latar belakang untuk header */}
            <tr>
              <th className="px-6 py-4 border-b text-left">ID Transaksi</th>
              <th className="px-6 py-4 border-b text-left">Nama Kursus</th>
              <th className="px-6 py-4 border-b text-left">Jumlah Pembayaran</th>
              <th className="px-6 py-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id} className="hover:bg-gray-100"> {/* Tambahkan efek hover */}
                <td className="px-6 py-4 border-b">{transaction.id}</td>
                <td className="px-6 py-4 border-b">{transaction.courseName}</td>
                <td className="px-6 py-4 border-b">{transaction.amount}</td>
                <td className={`px-6 py-4 border-b 
                  ${transaction.status === 'Sukses' ? 'text-green-600' : 
                     transaction.status === 'Dibatalkan' ? 'text-red-600' : 'text-yellow-600'}`}>
                  {transaction.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaksi;
