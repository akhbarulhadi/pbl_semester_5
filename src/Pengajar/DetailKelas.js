// DetailKelas.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const DetailKelas = () => {
  const location = useLocation(); // Mendapatkan state dari Link
  const kelas = location.state?.kelas; // Mengakses data kelas dari state

  if (!kelas) {
    return <p>Data kelas tidak tersedia!</p>;
  }

  return (
    <section className=" max-w-6xl mx-auto mt-20 p-6 dark:bg-gray-800 ml-64">
 <div className="overflow-x-auto">
  <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="py-3 px-6">
          Nama Kelas
        </th>
        <th scope="col" className="py-3 px-6">
          Jumlah Pengikut
        </th>
        <th scope="col" className="py-3 px-6">
          Status
        </th>
        <th scope="col" className="py-3 px-6">
          Persentase Selesai
        </th>
      </tr>
    </thead>
    <tbody>
    
        <tr
          key={kelas.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <Link
              to="/pengajar/kelas/detail"
              state={{ kelas }}
              className="hover:underline"
            >
              {kelas.nama}
            </Link>
          </th>
          <td className="py-4 px-6">{kelas.jumlahPengikut}</td>
          <td className="py-4 px-6">{kelas.status}</td>
          <td className="py-4 px-6">{kelas.persentaseSelesai}%</td>
        </tr>

    </tbody>
  </table>
</div>

    </section>
  );
};

export default DetailKelas;
