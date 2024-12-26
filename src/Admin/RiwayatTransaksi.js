import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


const RiwayatTransaksi = () => {
  const [transactions, setTransactions] = useState([]);
  const location = useLocation(); // Mendapatkan lokasi saat ini


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let response = await fetch("/api/admin/withdrawal/pengajuan-dana", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          // Token mungkin kedaluwarsa, coba refresh token
          const refreshResponse = await fetch("/api/auth/refresh-token", {
            method: "POST",
            credentials: "include",
          });

          if (refreshResponse.ok) {
            response = await fetch("/api/admin/withdrawal/pengajuan-dana", {
              method: "GET",
              credentials: "include",
            });
          } else {
            throw new Error("Refresh token failed");
          }
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchTransactions();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "paid":
        return "text-green-600"; // Warna hijau
      case "pending":
        return "text-yellow-600"; // Warna kuning
      case "failed":
        return "text-red-600"; // Warna merah
      default:
        return "";
    }
  };

  return (
    <div className="p-4">
      {/* Teks Tab Transaksi | Pengajuan Penarikan di tengah */}
      <div className="text-center  mb-4">
       <Link
          to="/admin/riwayat-transaksi"
          className={`text-lg font-bold px-2 py-1 ml-4 transition-all duration-200 hover:bg-gray-200 hover:rounded-lg ${
            location.pathname === '/admin/riwayat-transaksi'
            ? 'bg-gray-200 rounded-lg'
            : 'hover:bg-gray-600'
          }`}
        >
          Transaksi
        </Link>

        <Link
          to="/admin/pengajuan-penarikan"
          className={`text-lg font-bold px-2 py-1 ml-4 transition-all duration-200 hover:tex-gray-200 hover:bg-gray-200 hover:rounded-lg ${
            location.pathname === "/pengajuan-penarikan"    
            ? 'bg-gray-200 rounded-lg'
            : 'hover:bg-gray-600'
          }`}
        >
          Pengajuan Penarikan
        </Link>
      </div>

      {/* Tabel Transaksi */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-200">
            <th className="h-[30px] px-5 rounded-tl-lg">Nama Pengajar</th>
            <th className="h-[30px] px-5 ">Nama Pemilik Bank</th>
            <th className="h-[30px] px-5 ">Nama Bank</th>
            <th className="h-[30px] px-5 ">No Rekening</th>
            <th className="h-[30px] px-5 ">Status Pengajuan</th>
            <th className="h-[30px] px-5 ">Dana Penarikan</th>
            <th className="h-[30px] px-5 ">Tanggal</th>
            <th className="h-[30px] px-5 rounded-tr-lg">Bukti Transfer</th>   
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr
                  key={transaction.id_withdraw}
                  className="hover:bg-gray-100 transition-colors duration-200 overflow-x-auto"
                >
                  <td className="py-2 px-2 truncate">
                    {transaction.user_name}
                  </td>
                  <td className="py-2 px-2 truncate">
                    {transaction.bank_account_holder_name}
                  </td>
                  <td className="py-2 px-2 truncate">
                    {transaction.bank_name}
                  </td>
                  <td className="py-2 px-2 truncate">
                    {transaction.bank_account_number}
                  </td>
                  <td
                    className={`py-2 px-2 truncate ${getStatusClass(
                      transaction.status
                    )}`}
                  >
                    {transaction.status === "Paid"
                      ? "Sukses"
                      : transaction.status === "Cancelled"
                      ? "Gagal"
                      : "Tertunda"}
                  </td>
                  <td className="py-2 px-2 truncate">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(transaction.amount)}
                  </td>
                  <td className="py-2 px-2 truncate">
                    {transaction.updated_at
                      ? new Date(transaction.updated_at).toLocaleDateString(
                          "id-ID"
                        )
                      : "Tanggal tidak tersedia"}
                  </td>
                  <td className="py-2 px-2 truncate">
                  <img src="gambar.jpg" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-4 px-4 text-center text-gray-500">
                  Tidak ada data transaksi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default RiwayatTransaksi;
