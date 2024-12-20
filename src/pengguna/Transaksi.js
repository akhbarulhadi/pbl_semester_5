import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Transaksi = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let response = await fetch('/api/pengguna/courses/list-transactions', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 401) {
          const refreshResponse = await fetch('/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
          });

          if (refreshResponse.ok) {
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
    <div className="pl-64"> {/* Padding-left ditambahkan untuk menghindari overlap */}
      <div className="overflow-x-auto p-4">
        <div className="container mx-auto p-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Riwayat Transaksi</h2>
          <div className="overflow-auto rounded-lg shadow-lg">
            <table className="w-full table-auto bg-white border border-gray-200">
              <thead className="bg-[#84D68E] text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">ID Transaksi</th>
                  <th className="px-6 py-4 text-left font-semibold">Nama Kursus</th>
                  <th className="px-6 py-4 text-left font-semibold">Pengajar</th>
                  <th className="px-6 py-4 text-left font-semibold">Snap URL</th>
                  <th className="px-6 py-4 text-left font-semibold">Metode Pembayaran</th>
                  <th className="px-6 py-4 text-left font-semibold">Jumlah Pembayaran</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id_user_payment_courses} className="hover:bg-gray-100 border-b">
                    <td className="px-6 py-4">{transaction.transaction_id}</td>
                    <td className="px-6 py-4">{transaction.course_title}</td>
                    <td className="px-6 py-4">{transaction.teacher_name}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`${transaction.snap_redirect_url}`}
                        className="text-blue-600 hover:underline"
                      >
                        Link
                      </Link>
                    </td>
                    <td className="px-6 py-4">{transaction.payment_method}</td>
                    <td className="px-6 py-4">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(transaction.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          transaction.payment_status === "paid"
                            ? "bg-green-100 text-green-600"
                            : transaction.payment_status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.payment_status === "paid"
                          ? "Sukses"
                          : transaction.payment_status === "pending"
                          ? "Tertunda"
                          : "Gagal"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaksi;
