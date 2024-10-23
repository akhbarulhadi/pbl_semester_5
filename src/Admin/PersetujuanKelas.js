import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


// const dataKelas = [
//   {
//     namaPengajar: "John Doe",
//     namaKelas: "Reparasi iPhone XR",
//     deskripsiKelas: "Cara membongkar iPhone XR",
//     hargaKelas: 40000,
//     statusKelas: "Disetujui",
//     aksi: "",
//   },
//   {
//     namaPengajar: "Romeo Santos",
//     namaKelas: "Reparasi iPhone 13",
//     deskripsiKelas: "Cara mengganti LCD iPhone 13",
//     hargaKelas: 50000,
//     statusKelas: "Menunggu",
//     aksi: "",
//   },
//   {
//     namaPengajar: "Lorem Ipsum",
//     namaKelas: "Reparasi iPhone 6s",
//     deskripsiKelas: "Cara membongkar iPhone 6s",
//     hargaKelas: 100000,
//     statusKelas: "Ditolak",
//     aksi: "",
//   },
//   // Tambahkan lebih banyak data sesuai kebutuhan
// ];

const PersetujuanKelas = () => {
  const [courses, setCourses] = useState([]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Activated":
        return "text-green-600"; // Warna hijau
      case "Deactivate":
        return "text-red-600"; // Warna merah
      case "Pending":
        return "text-yellow-600"; // Warna kuning
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let response = await fetch('/api/admin/courses', {
          method: 'GET',
          credentials: 'include',
        });
  
        if (response.status === 401) {
          const refreshResponse = await fetch('/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
          });
  
          if (refreshResponse.ok) {
            response = await fetch('/api/admin/courses', {
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

  const handleAction = async (course, newStatus) => {
    const confirm = window.confirm("Apakah ingin mengubah status kelas ini?");
    if (!confirm) return;
    try {
      // console.log(`Changing course ID: ${course.id_course} to status: ${newStatus}`);
  
      const url = `/api/admin/courses/${course.id_course}`;
      console.log(`PUT Request URL: ${url}`); 

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status_course: newStatus }),
        credentials: 'include',
      });
  
      if (response.ok) {
        const updatedCourse = await response.json();

        setCourses((prevCourses) =>
          prevCourses.map((c) =>
            c.id_course === course.id_course ? { ...c, status_course: newStatus } : c
          )
        );
        alert(updatedCourse.message);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error updating course status:', error);
      alert('Terjadi kesalahan saat mengupdate status course.');
    }
  };
  
  

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Nama Pengajar</th>
            <th className="py-2 px-4 border-b">Nama Kelas</th>
            <th className="py-2 px-4 border-b">Deskripsi Kelas</th>
            <th className="py-2 px-4 border-b">Format</th>
            <th className="py-2 px-4 border-b">Harga</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id_course} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{course.user_name}</td>
              <td className="py-2 px-4 border-b">
                <Link to={`/admin/detail-kelas/${course.id_course}`} className="text-blue-500 hover:underline">
                  {course.course_title}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">{course.course_description}</td>
              <td className="py-2 px-4 border-b">{course.online ? "Online" : "Offline"}</td>
              <td className="py-2 px-4 border-b text-center">{course.paid === false 
                ? "Gratis" 
                : course.price 
                ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(course.price)
                : ""}
              </td>
              <td className={`py-2 px-4 border-b text-center ${getStatusClass(course.status_course)}`}>{course.status_course}</td>
              <td className="py-2 px-4 border-b text-center">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                  {course.status_course === "Pending" && (
                    <>
                      <button
                        onClick={() => handleAction(course, 'Activated')}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-gray-200 rounded-s-lg hover:bg-blue-700"
                      >
                        Setuju
                      </button>
                      <button
                        onClick={() => handleAction(course, 'Deactivate')}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-gray-200 rounded-e-lg hover:bg-red-700"
                      >
                        Tolak
                      </button>
                    </>
                  )}
                  {course.status_course === "Activated" && (
                    <button
                      onClick={() => handleAction(course, 'Deactivate')}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-gray-200 rounded-lg hover:bg-red-700"
                    >
                      Non aktif
                    </button>
                  )}
                  {course.status_course === "Deactivate" && (
                    <button
                      onClick={() => handleAction(course, 'Pending')}
                      className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 border border-gray-200 rounded-lg hover:bg-yellow-700"
                    >
                      Atur Ke Pending
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersetujuanKelas;