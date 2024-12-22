import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


const PengajuanPenarikan = () => {
  const [withdraws, setWithdraws] = useState([]);
  const location = useLocation(); // Mendapatkan lokasi saat ini
  const getStatusClass = (status) => {
    switch (status) {
      case "Paid":
        return "text-green-600";
      case "Cancelled":
        return "text-red-600";
      case "Pending":
        return "text-yellow-600";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchWithdraws = async () => {
      try {
        let response = await fetch("/api/admin/withdrawal", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          const refreshResponse = await fetch("/api/auth/refresh-token", {
            method: "POST",
            credentials: "include",
          });

          if (refreshResponse.ok) {
            response = await fetch("/api/admin/withdrawal", {
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
        setWithdraws(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchWithdraws();
  }, []);

  const handleAction = async (withdraw, newStatus) => {
    const confirm = window.confirm("Apakah ingin mengubah status penarikan ini?");
    if (!confirm) return;
    try {
      const url = `/api/admin/withdrawal/${withdraw.id_withdraw}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
        credentials: "include",
      });

      if (response.ok) {
        const updatedWithdraw = await response.json();

        setWithdraws((prevWithdraws) =>
          prevWithdraws.map((c) =>
            c.id_withdraw === withdraw.id_withdraw ? { ...c, status: newStatus } : c
          )
        );
        alert(updatedWithdraw.message);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating course status:", error);
      alert("Terjadi kesalahan saat mengupdate status course.");
    }
  };

  return (
    <div className="overflow-x-auto p-4">
       <div className="text-center  mb-4">
       <Link
          to="/admin/riwayat-transaksi"
          className={`text-lg font-bold px-2 py-1 ml-4 transition-all duration-200 hover:bg-gray-200 hover:rounded-lg ${
            location.pathname === "/admin/riwaya-transaksi"   
             ? 'bg-gray-200 rounded-lg'
            : 'hover:bg-gray-600'
          }`}
        >
          Transaksi
        </Link>

        <Link
          to="/admin/pengajuan-penarikan"
          className={`text-lg font-bold px-2 py-1 ml-4 transition-all duration-200  hover:bg-gray-200 hover:rounded-lg ${
            location.pathname === "/admin/pengajuan-penarikan"  
            ? 'bg-gray-200 rounded-lg'
            : 'hover:bg-gray-600'
          }`}
        >
          Pengajuan Penarikan
        </Link>
      </div>
      

      {/* Wrapper untuk Tabel */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="py-2 px-2 border-b w-36">Jumlah Penarikan</th>
              <th className="py-2 px-2 border-b w-36">Nama Bank</th>
              <th className="py-2 px-2 border-b w-48">No. Rekening</th>
              <th className="py-2 px-2 border-b w-48">Pemilik Rekening</th>
              <th className="py-2 px-2 border-b w-24">Status</th>
              <th className="py-2 px-2 border-b w-32">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {withdraws.map((withdraw) => (
              <tr key={withdraw.id_withdraw} className="hover:bg-gray-100">
                <td className="py-2 px-2 text-center">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(withdraw.amount)}
                </td>
                <td className="py-2 px-2 text-center">{withdraw.bank_name}</td>
                <td className="py-2 px-2 text-center">
                  {withdraw.bank_account_number}
                </td>
                <td className="py-2 px-2  text-center">
                  {withdraw.bank_account_holder_name}
                </td>
                <td
                  className={`py-2 px-2 text-center ${getStatusClass(
                    withdraw.status
                  )}`}
                >
                  {withdraw.status}
                </td>
                <td className="py-2 px-2  text-center">
                  {withdraw.status === "Pending" && (
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                      <button
                        onClick={() => handleAction(withdraw, "Paid")}
                        className="px-2 py-1 text-sm font-medium text-white bg-blue-600 border border-gray-200 rounded-s-lg hover:bg-blue-700"
                      >
                        Setuju
                      </button>
                      <button
                        onClick={() => handleAction(withdraw, "Cancelled")}
                        className="px-2 py-1 text-sm font-medium text-white bg-red-600 border border-gray-200 rounded-e-lg hover:bg-red-700"
                      >
                        Tolak
                      </button>
                    </div>
                  )}
                  {(withdraw.status === "Paid" || withdraw.status === "Cancelled") && (
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                      <button
                        className="px-2 py-1 text-sm font-medium text-gray bg-gray-600 border border-gray-200 rounded-s-lg cursor-not-allowed"
                        disabled
                      >
                        Setuju
                      </button>
                      <button
                        className="px-2 py-1 text-sm font-medium text-gray bg-gray-600 border border-gray-200 rounded-e-lg cursor-not-allowed"
                        disabled
                      >
                        Tolak
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
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

export default PengajuanPenarikan;
