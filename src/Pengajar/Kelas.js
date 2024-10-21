import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Kelas = () => {
  const [courses, setCourses] = useState([]);

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
    <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">TABLE KELAS</h2>
      <div className="mb-4">
        <Link to="/pengajar/form-kelas" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Tambah Kelas
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Nama Kelas</th>
              <th className="py-2 px-4 border-b">Harga</th>
              <th className="py-2 px-4 border-b">Format</th>
              <th className="py-2 px-4 border-b">Jumlah Pengikut</th>
              <th className="py-2 px-4 border-b">Status</th>
              {/* <th className="py-2 px-4 border-b">Foto</th> */}
              <th className="py-2 px-4 border-b">Penyelesaian Siswa</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {courses.map((course) => (
              <tr key={course.id_course} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{course.course_title}</td>
                <td className="py-2 px-4 border-b">{course.paid === false 
                ? "Gratis" 
                : course.price 
                ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(course.price)
                : ""}
                </td>
                <td className="py-2 px-4 border-b">{course.online ? "Online" : "Offline"}</td>
                <td className="py-2 px-4 border-b">{course.joined_count}</td>
                <td className="py-2 px-4 border-b">{course.status_course}</td>
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
                <td className="py-2 px-4 border-b">
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
  );
};

export default Kelas;
