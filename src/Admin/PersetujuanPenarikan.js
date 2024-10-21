import React from "react";

const PersetujuanPenarikan = () => {
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
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">Rp. 1.000.000</td>
              <td className="py-2 px-4 border-b text-center">Bank BCA</td>
              <td className="py-2 px-4 border-b text-center">0192874301984</td>
              <td className="py-2 px-4 border-b text-center">Bintang</td>
              <td className="py-2 px-4 border-b text-center">Pending</td>
              <td className="py-2 px-4 border-b text-center">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-gray-200 rounded-s-lg hover:bg-blue-700">
                    Setuju
                  </button>

                  <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-gray-200 rounded-e-lg hover:bg-red-700">
                    Tolak
                  </button>
                </div>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PersetujuanPenarikan;