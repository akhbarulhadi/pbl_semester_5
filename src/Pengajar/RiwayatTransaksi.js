import React, { useEffect, useState } from "react";

const RiwayatTransaksi = () => {
  const [transactions, setTransactions] = useState([]);

  // Data contoh transaksi
  // const transactions = [
  //   {
  //     idTransaksi: "TRX001",
  //     idPengajar: "PGJ001",
  //     idPengguna: "PNG001",
  //     norekening: "1234567890",
  //     namarekening: "John Doe",
  //     namabank: "Bank A",
  //     waktu: "13:02",
  //     pemasukan: 500000,
  //     pengeluaran: 200000,
  //   },
  //   {
  //     idTransaksi: "TRX002",
  //     idPengajar: "PGJ002",
  //     idPengguna: "PNG002",
  //     norekening: "0987654321",
  //     namarekening: "Jane Smith",
  //     namabank: "Bank B",
  //     waktu: "08:20",
  //     pemasukan: 750000,
  //     pengeluaran: 300000,
  //   },
  //   // Tambahkan lebih banyak data sesuai kebutuhan
  // ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let response = await fetch('/api/pengajar/courses/list-transactions', {
          method: 'GET',
          credentials: 'include',
        });
  
        if (response.status === 401) { // Token mungkin kedaluwarsa
          // Panggil refresh token
          const refreshResponse = await fetch('/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
          });
  
          if (refreshResponse.ok) {
            // Coba ulang fetch courses setelah token diperbarui
            response = await fetch('/api/pengajar/courses/list-transactions', {
              method: 'GET',
              credentials: 'include',
            });
          } else {
            throw new Error('Refresh token failed');
          }
        }
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchTransactions();
  }, []);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">RiwayatTransaksi</h2>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">ID Transaksi</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Kursus</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Pengajar</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Pengguna</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Metode Pembayaran</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Status Pembayaran</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Harga</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Tanggal Pembayaran</th>
            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Dibuat Pada</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
              <tr key={transaction.id_user_payment_courses} className="hover:bg-gray-100 transition-colors duration-200">
              <td className="py-2 px-4 border-b border-gray-300">{transaction.transaction_id}</td>
              <td className="py-2 px-4 border-b border-gray-300">{transaction.course_title}</td>
              <td className="py-2 px-4 border-b border-gray-300">{transaction.teacher_name}</td>
              <td className="py-2 px-4 border-b border-gray-300">{transaction.user_name}</td>
              <td className="py-2 px-4 border-b border-gray-300">{transaction.payment_method}</td>
              <td className={`py-2 px-4 border-b border-gray-300 
                ${transaction.payment_status === 'paid' ? 'text-green-600' : 
                   transaction.payment_status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                {transaction.payment_status === 'paid' ? 'Sukses' : 
                 transaction.payment_status === 'pending' ? 'Tertunda' : 'Gagal'}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.price)}</td>
              <td className="py-2 px-4 border-b border-gray-300">{transaction.payment_date ? new Date(transaction.payment_date).toLocaleDateString() : 'Tanggal tidak tersedia'}</td>
              <td className="py-2 px-4 border-b border-gray-300">{new Date(transaction.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiwayatTransaksi;
