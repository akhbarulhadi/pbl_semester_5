import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from "@fortawesome/free-solid-svg-icons";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating); // Full stars (1-5)
  const halfStar = rating % 1 >= 0.5 ? 1 : 0; // If there's a half star
  const emptyStars = 5 - fullStars - halfStar; // Total stars must be 5

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-300" />
      ))}
      {halfStar === 1 && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-300" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FontAwesomeIcon key={index + fullStars + halfStar} icon={faEmptyStar} className="text-gray-300" />
      ))}
    </>
  );
};

const Kelas = () => {
  const [courses, setCourses] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const location = useLocation(); // Mendapatkan lokasi saat ini

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        let response = await fetch('/api/admin/teacher/users-teacher', {
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
            response = await fetch('/api/admin/teacher/users-teacher', {
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
        setTeacherList(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchTeacher();
  }, []);

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
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {/* Baris Pengajar */}
                    {teacherList.map((teacher) => (
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.name}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.email}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.balance}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.total_courses}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.total_unique_joined_users}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{renderStars(teacher.average_rating)}</td>
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
