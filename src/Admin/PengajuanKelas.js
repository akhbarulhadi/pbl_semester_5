import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";



const PengajuanKelas = () => {
  const [courses, setCourses] = useState([]);
  const location = useLocation(); // Mendapatkan lokasi saat ini


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
        let response = await fetch("/api/admin/courses", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          const refreshResponse = await fetch("/api/auth/refresh-token", {
            method: "POST",
            credentials: "include",
          });

          if (refreshResponse.ok) {
            response = await fetch("/api/admin/courses", {
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
        setCourses(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleAction = async (course, newStatus) => {
    const confirm = window.confirm("Apakah ingin mengubah status kelas ini?");
    if (!confirm) return;
    try {
      const url = `/api/admin/courses/${course.id_course}`;
      console.log(`PUT Request URL: ${url}`);

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status_course: newStatus }),
        credentials: "include",
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
      console.error("Error updating course status:", error);
      alert("Terjadi kesalahan saat mengupdate status course.");
    }
  };

  return (
   <section>
    <div className="overflow-x-auto p-4">
      <div className="text-center mb-2">
       <Link
          to="/admin/kelas"
          className={`text-lg font-bold px-2 py-1 ml-4 transition-all duration-200 hover:bg-gray-200 hover:rounded-lg ${
            location.pathname === "/admin/kelas"    ? 'bg-gray-200 rounded-lg'
            : 'hover:bg-gray-600'
          }`}
        >
          List Kelas
        </Link>

        <Link
          to="/admin/pengajuan-kelas"
          className={`text-lg font-bold px-2 py-1 ml-4 transition-all duration-200  hover:bg-gray-200 hover:rounded-lg ${
            location.pathname === "/admin/pengajuan-kelas"  
            ? 'bg-gray-200 rounded-lg'
            : 'hover:bg-gray-600'
          }`}
        >
          PengajuanKelas
        </Link>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-[] text-black">
              <th className="py-2 px-3 border-b">Pengajar</th>
              <th className="py-2 px-3 border-b">Judul</th>
              <th className="py-2 px-3 border-b">Deskripsi</th>
              <th className="py-2 px-3 border-b">Total Peserta</th>
              <th className="py-2 px-3 border-b">Harga</th>
              <th className="py-2 px-3 border-b">Status</th>
              <th className="py-2 px-3 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id_course} className="hover:bg-gray-100">
                <td className="py-2 px-3 border-b">{course.user_name}</td>
                <td className="py-2 px-3 border-b">
                  <Link
                    to={`/admin/detail-kelas/${course.id_course}`}
                    className="text-blue-500 hover:underline"
                  >
                    {course.course_title}
                  </Link>
                </td>
                <td className="py-2 px-3 border-b">{course.course_description}</td>
                <td className="py-2 px-3 border-b text-center">
                  {course.online ? "Online" : "Offline"}
                </td>
                <td className="py-2 px-3 border-b text-center">
                  {course.paid === false
                    ? "Gratis"
                    : course.price
                    ? new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(course.price)
                    : ""}
                </td>
                <td
                  className={`py-2 px-3 border-b text-center ${getStatusClass(
                    course.status_course
                  )}`}
                >
                  {course.status_course}
                </td>
                <td className="py-2 px-3 border-b text-center">
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    {course.status_course === "Pending" && (
                      <>
                        <button
                          onClick={() => handleAction(course, "Activated")}
                          className="px-3 py-1 text-xs font-medium text-white bg-blue-600 border border-gray-200 rounded-s-lg hover:bg-blue-700"
                        >
                          Setuju
                        </button>
                        <button
                          onClick={() => handleAction(course, "Deactivate")}
                          className="px-3 py-1 text-xs font-medium text-white bg-red-600 border border-gray-200 rounded-e-lg hover:bg-red-700"
                        >
                          Tolak
                        </button>
                      </>
                    )}
                    {course.status_course === "Activated" && (
                      <button
                        onClick={() => handleAction(course, "Deactivate")}
                        className="px-3 py-1 text-xs font-medium text-white bg-red-600 border border-gray-200 rounded-lg hover:bg-red-700"
                      >
                        Nonaktifkan
                      </button>
                    )}
                    {course.status_course === "Deactivate" && (
                      <button
                        onClick={() => handleAction(course, "Pending")}
                        className="px-3 py-1 text-xs font-medium text-white bg-yellow-600 border border-gray-200 rounded-lg hover:bg-yellow-700"
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
      </div>
      </div>
      </div>
      </div>
      </div>
    </section>
  );
};

export default PengajuanKelas;
