import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Kelas = () => {
  const [courses, setCourses] = useState([]);
  const location = useLocation(); // Mendapatkan lokasi saat ini

  return (
    <section>
      {/* Navigasi Link */}
    <div className="overflow-x-auto p-4">

      <div className="text-center mb-2">
        <Link
          to="/admin/kelas"
          className={`text-lg font-bold px-2 py-1 ml-4 transition-all duration-200 hover:bg-gray-200 hover:rounded-lg ${
            location.pathname === "/admin/kelas"
              ? "bg-gray-200 rounded-lg"
              : "hover:bg-gray-600"
          }`}
        >
          List Kelas
        </Link>

        <Link
          to="/admin/pengajuan-kelas"
          className={`text-lg font-bold px-2 py-1 ml-4 transition-all duration-200 hover:bg-gray-200 hover:rounded-lg ${
            location.pathname === "/admin/pengajuan-kelas"
              ? "bg-gray-200 rounded-lg"
              : "hover:bg-gray-600"
          }`}
        >
          Pengajuan Kelas
        </Link>
      </div>

      {/* Tabel Daftar Pengajar */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="w-full table-auto text-sm">
                  <thead className="bg-[#F1F3F9]">
                    <tr className="text-black ">
                      <th className="h-[30px] px-5 rounded-tl-lg">Nama</th>
                      <th className="px-5 h-[30px]">Email</th>
                      <th className="px-5 h-[30px]">Saldo</th>
                      <th className="px-5 h-[30px]">Total Kelas</th>
                      <th className="px-5 h-[30px]">Total Peserta</th>
                      <th className="px-5 h-[30px]">Rating</th>
                      <th className="h-[30px] px-5 rounded-tr-lg">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {/* Baris Pengajar */}
                    {[
                      {
                        name: "John Doe",
                        email: "john.doe@example.com",
                        saldo: "$5",
                        totalClasses: 10,
                        totalParticipants: 100,
                        rating: 4.5,
                        status: "Aktif",
                      },
                      {
                        name: "Jane Smith",
                        email: "jane.smith@example.com",
                        saldo: "$50",
                        totalClasses: 5,
                        totalParticipants: 50,
                        rating: 4.0,
                        status: "Aktif",
                      },
                      {
                        name: "Alice Johnson",
                        email: "alice.johnson@example.com",
                        saldo: "$150",
                        totalClasses: 20,
                        totalParticipants: 200,
                        rating: 5.0,
                        status: "Aktif",
                      },
                      {
                        name: "Robert Brown",
                        email: "robert.brown@example.com",
                        saldo: "$200",
                        totalClasses: 8,
                        totalParticipants: 80,
                        rating: 4.8,
                        status: "Aktif",
                      },
                    ].map((teacher, index) => (
                      <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.name}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.email}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.saldo}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.totalClasses}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.totalParticipants}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.rating}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.status}</td>
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
    </section>
    
  );
};

export default Kelas;
