import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// const listPengajar = [
//   {
//     namaPengajar: "Akhbarul Hadi",
//     jumlahPengikut: 150,
//     jumlahKelas: 3,
//     rating: 0.5, // Rating on a scale from 1 to 5
//   },
//   {
//     namaPengajar: "Tiyo Saputra",
//     jumlahPengikut: 200,
//     jumlahKelas: 4,
//     rating: 4.0, // Rating on a scale from 1 to 5
//   },
//   // Tambahkan lebih banyak data sesuai kebutuhan
// ];


const DaftarPengajar = () => {
  const [teachers, setTeachers] = useState([]);

  // Setting bintang pada rating
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

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        let response = await fetch('/api/admin/teacher/users-teacher', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 401) {
          const refreshResponse = await fetch('/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
          });

          if (refreshResponse.ok) {
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
        setTeachers(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <Link to="/admin/form-pengajar" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Tambah Pengajar
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Nama Pengajar</th>
              <th className="py-2 px-4 border-b">Jumlah Pengikut</th>
              <th className="py-2 px-4 border-b">Jumlah Kelas</th>
              <th className="py-2 px-4 border-b">Rating</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id_user} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center">{teacher.name}</td>
                <td className="py-2 px-4 border-b text-center">{teacher.total_unique_joined_users}</td>
                <td className="py-2 px-4 border-b text-center">{teacher.total_courses}</td>
                <td className="py-2 px-4 border-b text-center">{renderStars(teacher.average_rating || 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarPengajar;