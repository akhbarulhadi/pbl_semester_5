import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Transaksi = () => {
  const [transactions, setTransactions] = useState([]);

  // Data dummy untuk transaksi
  // const transactions = [
  //   {
  //     id: 1,
  //     courseName: 'Belajar React untuk Pemula',
  //     amount: 'Rp 500,000',
  //     status: 'Sukses',
  //   },
  //   {
  //     id: 2,
  //     courseName: 'Membangun Aplikasi Web dengan Firebase',
  //     amount: 'Rp 750,000',
  //     status: 'Menunggu Pembayaran',
  //   },
  //   {
  //     id: 3,
  //     courseName: 'Dasar-dasar Machine Learning',
  //     amount: 'Rp 1,000,000',
  //     status: 'Dibatalkan',
  //   },
  // ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let response = await fetch('/api/pengguna/courses/list-transactions', {
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
            response = await fetch('/api/pengguna/courses/list-transactions', {
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
    <div className="container mx-auto p-3">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Riwayat Transaksi</h2>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-gray-50"> {/* Ganti bg-white dengan bg-gray-50 */}
          <thead className="bg-gray-200 text-center"> {/* Tambahkan latar belakang untuk header */}
            <tr>
              <th className="px-6 py-4 border-b">ID Transaksi</th>
              <th className="px-6 py-4 border-b">Nama Kursus</th>
              <th className="px-6 py-4 border-b">Pengajar</th>
              <th className="px-6 py-4 border-b">Snap Url Midtrans</th>
              <th className="px-6 py-4 border-b">Metode Pembayaran</th>
              <th className="px-6 py-4 border-b">Jumlah Pembayaran</th>
              <th className="px-6 py-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {transactions.map(transaction => (
              <tr key={transaction.id_user_payment_courses} className="hover:bg-gray-100"> {/* Tambahkan efek hover */}
                <td className="px-6 py-4 border-b">{transaction.transaction_id}</td>
                <td className="px-6 py-4 border-b">{transaction.course_title}</td>
                <td className="px-6 py-4 border-b">{transaction.teacher_name}</td>
                <td className="px-6 py-4 border-b">
                  <Link to={`${transaction.snap_redirect_url}`} className="text-blue-500 hover:underline">
                    Link Snap Midtrans
                  </Link>
                </td>
                <td className="px-6 py-4 border-b">{transaction.payment_method}</td>
                <td className="px-6 py-4 border-b">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.price)}</td>
                <td className={`px-6 py-4 border-b 
                  ${transaction.payment_status === 'paid' ? 'text-green-600' : 
                     transaction.payment_status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {transaction.payment_status === 'paid' ? 'Sukses' : 
                   transaction.payment_status === 'pending' ? 'Tertunda' : 'Gagal'}
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
