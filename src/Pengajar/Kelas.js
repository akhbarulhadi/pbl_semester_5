import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


const Kelas = () => {
  const [courses, setCourses] = useState([]);
  const location = useLocation();

  // Data contoh kelas
  // const kelasTable = [
  //   {
  //     namaKelas: "Kelas Pemrograman Dasar",
  //     jumlahPengikut: 150,
  //     status: "Aktif",
  //     penyelesaian: 75, // Persentase
  //   },
  //   {
  //     namaKelas: "Kelas Desain Grafis",
  //     jumlahPengikut: 200,
  //     status: "Selesai",
  //     penyelesaian: 100,
  //   },
  //   {
  //     namaKelas: "Kelas Pemasaran Digital",
  //     jumlahPengikut: 120,
  //     status: "Aktif",
  //     penyelesaian: 50,
  //   },
  //   // Tambahkan lebih banyak data sesuai kebutuhan
  // ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let response = await fetch('/api/pengajar/courses', {
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
            response = await fetch('/api/pengajar/courses', {
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
        setCourses(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchCourses();
  }, []);

  return (
    <section>
      <div className="overflow-x-auto p-4">
        <div className="text-center mb-2">
          <Link to ="/pengajar/kelas" className={`text-lg font-bold px-2 py-1 ml-4 transition-all duration-200 hover:bg-gray-200 hover:rounded-lg ${
            location.pathname === "/pengajar/kelas"
            ? "bg-gray-200 rounded-lg"
            : "hover:bg-gray-600"
          }`}
          >
            List Kelas
          </Link>
          
          <Link to ="/pengajar/form-kelas" className={`text-lg font-bold px-2 py-1 ml-4 transition-all duration-200 hover:bg-gray-200 hover:rounded-lg ${
            location.pathname === "/pengajar/form-kelas"
            ? "bg-gray-200 rounded-lg"
            : "hover:bg-gray-600"
          }`}
          >
            Tambah Kelas
          </Link>
        </div>

      <div className="overflow-x-auto max-w-4xl">
        <table className="w-full table-auto text-sm">
          <thead className="bg-[#F1F3F9]">
            <tr className="text-black">
              <th className="h-[30px] px-5 rounded-tl-lg">Nama Kelas</th>
              <th className="px-5 h-[30px]">Harga</th>
              <th className="px-5 h-[30px]">Format</th>
              <th className="px-5 h-[30px]">Pengikut</th>
              <th className="px-5 h-[30px]">Status</th>
               {/* <th className="py-2 px-4 border-b">Foto</th> */}
              <th className="h-[30px] px-5 rounded-tr-lg">Penyelesaian</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {courses.map((course) => (
              <tr key={course.id_course} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Link to={`/pengajar/detail-kelas/${course.id_course}`} className="text-blue-500 hover:underline">
                    {course.course_title}
                  </Link>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{course.paid === false 
                ? "Gratis" 
                : course.price 
                ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(course.price)
                : ""}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{course.online ? "Online" : "Offline"}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{course.joined_count}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{course.status_course}</td>
                {/* <td className="py-2 px-4 border-b">
                {course.image_url ? (
                <img 
                    src={`/api/uploads/${course.image_url}`} // Ganti dengan URL yang benar
                    alt={course.course_title} 
                    style={{ width: '100px', height: 'auto' }} 
                  />
                ) : (
                  <span>Tidak ada gambar</span> // Pesan jika gambar tidak tersedia
                )}
                </td> */}
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="relative w-full">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-300 rounded h-2">
                        <div
                          className={`bg-green-500 h-2 rounded`}
                          style={{ width: `${course.completion_percentage}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-semibold">{course.completion_percentage}%</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </section>
  );
};

export default Kelas;
