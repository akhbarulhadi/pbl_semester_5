import React, { useEffect, useState } from "react";
import DataIncome from "./DataIncome";  
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from "@fortawesome/free-solid-svg-icons";
import GrafikKunjungan from "./GrafikKunjungan";

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

  // Rating
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

const DashboardPengajar = () => {
  const [courses, setCourses] = useState([]);
  const [totalJoinedCount, setTotalJoinedCount] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalKelas, setTotalKelas] = useState(0);
  const [balance, setBalance] = useState(0);
  const [rating, setRating] = useState(0); // Nilai awal 0



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
        // setTotalJoinedCount(data.total_joined_count);
        // setTotalUser(data.total_siswa);
        // setTotalKelas(data.total_courses);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchCourses();
  }, []);



  useEffect(() => {
    fetch('/api/pengajar/courses/count', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTotalKelas(data.total_courses);
        setTotalUser(data.total_unique_joined_users);
        setTotalJoinedCount(data.total_joined_users);
        setBalance(data.balance[0].balance);
        setRating(data.rating);
      })
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <Link to="/pengajar/form-income" className="text-[#84D68E]">
          <DataIncome
            title="Total Saldo"
            total={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(balance)}
          >
          </DataIncome>
        </Link>
        
        <Link to="/pengajar/kelas" className="block text-[#845ED4]">
          <DataIncome 
            title="Total Kelas" 
            total={`${totalKelas} Kelas`}>
          </DataIncome>
        </Link>

        <div className="block text-[#C739A6]">
          <DataIncome 
            title="Total Pengikut"
            total={`${totalJoinedCount} Pengikut`}>
          </DataIncome>
        </div>

          <DataIncome
            title="Rating Saya"
            total={renderStars(rating)}>
          </DataIncome>

        
      </div>

      {/* Section: Statistics and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <GrafikKunjungan />
        </div>
        
        <div className="col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Forum Diskusi
          </h2>
          <div className="shadow rounded overflow-hidden bg-white">
            <table className="w-full table-auto text-sm">
            <thead>
                <tr className="text-white bg-[#6926D7]">
                  <th className="h-[30px] px-5 rounded-tl-lg">Nama Pengguna</th>
                  <th className="h-[30px] px-5 rounded-tr-lg">Forum Diskusi</th>
                </tr>
              </thead>
              <tbody>
                  <td className="px-4 py-2 text-gray-700"><a href="/pengajar/forum-diskusi" className="hover:text-blue-600">Lihat Selengkapnya</a></td>
              </tbody>
            </table>
          </div>
          </div>
      </div>



      {/* Responsivitas tabel untuk kelas */}
      
      <div className="mt-8 max-w-4xl">
      <h2 className="text-lg font-semibold mb-1 text-gray-900">List Kelas</h2>
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
        <table className="w-full table-auto text-md">
          <thead className="bg-[#F1F3F9]">
            <tr className="text-black bg-[#F1F3F9]">
              <th className="h-[30px] px-5 rounded-tl-lg">Nama Kelas</th>
              <th className="px-5 h-[30px]">Harga</th>
              <th className="px-5 h-[30px]">Format</th>
              <th className="px-5 h-[30px]">Jumlah Pengikut</th>
              <th className="px-5 h-[30px]">Status</th>
              <th className="h-[30px] px-5 rounded-tr-lg">Penyelesaian Siswa</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id_course} className="hover:bg-gray-100">
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white border-b">
                <Link to={`/pengajar/detail-kelas/${course.id_course}`} className="text-blue-500 hover:underline">
                    {course.course_title}
                  </Link>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white border-b">{course.paid === false 
                ? "Gratis" 
                : course.price 
                ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(course.price)
                : ""}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white border-b">{course.online ? "Online" : "Offline"}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white border-b">{course.joined_count}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white border-b">{course.status_course}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white border-b">
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
        </div>
      </div>
      </div>
    </div>
  );
};

export default DashboardPengajar;
