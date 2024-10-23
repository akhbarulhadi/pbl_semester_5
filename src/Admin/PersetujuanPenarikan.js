import React, { useEffect, useState } from "react";

const PersetujuanPenarikan = () => {
  const [withdraws, setWithdraws] = useState([]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Paid":
        return "text-green-600"; // Warna hijau
      case "Cancelled":
        return "text-red-600"; // Warna merah
      case "Pending":
        return "text-yellow-600"; // Warna kuning
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchWithdraws = async () => {
      try {
        let response = await fetch('/api/admin/withdrawal', {
          method: 'GET',
          credentials: 'include',
        });
  
        if (response.status === 401) {
          const refreshResponse = await fetch('/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
          });
  
          if (refreshResponse.ok) {
            response = await fetch('/api/admin/withdrawal', {
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
        setWithdraws(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchWithdraws();
  }, []);
  

  const handleAction = async (withdraw, newStatus) => {
    const confirm = window.confirm("Apakah ingin mengubah status penarikan ini?");
    if (!confirm) return;
    try {
      // console.log(`Changing course ID: ${course.id_course} to status: ${newStatus}`);
  
      const url = `/api/admin/withdrawal/${withdraw.id_withdraw}`;
      console.log(`PUT Request URL: ${url}`); 

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include',
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
      console.error('Error updating course status:', error);
      alert('Terjadi kesalahan saat mengupdate status course.');
    }
  };

  return(
    <div className="overflow-x-auto p-4">

      <h2 className="text-2xl font-bold mb-4 text-gray-700">Persetujuan Penarikan</h2>
      
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Total Duit yang Mau Ditarik</th>
            <th className="py-2 px-4 border-b">Nama Bank</th>
            <th className="py-2 px-4 border-b">Nomor Rekening</th>
            <th className="py-2 px-4 border-b">Nama Pemilik Rekening</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {withdraws.map((withdraw) => (
            <tr key={withdraw.id_withdraw} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(withdraw.amount)}</td>
              <td className="py-2 px-4 border-b text-center">{withdraw.bank_name}</td>
              <td className="py-2 px-4 border-b text-center">{withdraw.bank_account_number}</td>
              <td className="py-2 px-4 border-b text-center">{withdraw.bank_account_holder_name}</td>
              <td className="py-2 px-4 border-b text-center">{withdraw.status}</td>
              <td className="py-2 px-4 border-b text-center">
              {withdraw.status === "Pending" && (

                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button 
                  onClick={() => handleAction(withdraw, 'Paid')}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-gray-200 rounded-s-lg hover:bg-blue-700">
                    Setuju
                  </button>
                  <button 
                  onClick={() => handleAction(withdraw, 'Cancelled')}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-gray-200 rounded-e-lg hover:bg-red-700">
                    Tolak
                  </button>
                </div>
              )}
              {(withdraw.status === "Paid" || withdraw.status === "Cancelled") && (
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button 
                    className="px-4 py-2 text-sm font-medium text-gray bg-gray-600 border border-gray-200 rounded-s-lg cursor-not-allowed" 
                    disabled>
                    Setuju
                  </button>
                  <button 
                    className="px-4 py-2 text-sm font-medium text-gray bg-gray-600 border border-gray-200 rounded-e-lg cursor-not-allowed" 
                    disabled>
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
  );
};

export default PersetujuanPenarikan;