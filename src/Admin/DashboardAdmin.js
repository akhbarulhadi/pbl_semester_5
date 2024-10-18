// src/pengajar/DashboardPengajar.js
import React from "react";
import { Link } from "react-router-dom";
import StatistikData from "./StatistikData";
import DaftarPengajar from "./DaftarPengajar";

const listPengguna = [
  {
    namaPengguna: "Akhbarul Hadi",
  },
  {
    namaPengguna: "Bintang Gusti",
  },
  {
    namaPengguna: "Damarjati Abdullah",
  },
  {
    namaPengguna: "Ibnu Pramudita",
  },
  {
    namaPengguna: "Tiyo Saputra",
  },
  // Tambahkan lebih banyak data sesuai kebutuhan
];

const DashboardAdmin = () => {
  return (
    <>
      <div className="p-4 dark:border-gray-700 mt-14">
        <StatistikData></StatistikData>
      </div>

      <DaftarPengajar />

      <br></br>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Nama Pengguna</th>
            </tr>
          </thead>
          <tbody>
            {listPengguna.map((list, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{list.namaPengguna}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardAdmin;
