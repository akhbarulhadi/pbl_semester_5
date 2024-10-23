import React, { useEffect, useState } from "react";
import DataIncome from "./DataIncome";  
import { Link } from "react-router-dom";

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


const DashboardPengajar = () => {
  const [courses, setCourses] = useState([]);
  const [totalJoinedCount, setTotalJoinedCount] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalKelas, setTotalKelas] = useState(0);
  const [balance, setBalance] = useState(0);


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
      })
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Link to="/pengajar/form-income" className="block">
          <DataIncome
            title="Total Income"
            total={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(balance)}
            // rate="-0.23%"
            // levelDown
          >
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                fill=""
              />
              <path
                d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                fill=""
              />
            </svg>
          </DataIncome>
        </Link>
        <DataIncome title="Total Siswa" total={totalUser}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
</svg>

        </DataIncome>
        <DataIncome title="Total Pengikut" total={totalJoinedCount}>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill=""
            />
          </svg>
        </DataIncome>
        <DataIncome title="Total Kelas" total={totalKelas}>
          <svg
          className="fill-primary dark:fill-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
            />
          </svg>
        </DataIncome>
      </div>
      <br></br>

      {/* Responsivitas tabel untuk kelas */}
      
      <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">TABLE KELAS</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Nama Kelas</th>
              <th className="py-2 px-4 border-b">Harga</th>
              <th className="py-2 px-4 border-b">Format</th>
              <th className="py-2 px-4 border-b">Jumlah Pengikut</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Penyelesaian Siswa</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {courses.map((course) => (
              <tr key={course.id_course} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                <Link to={`/pengajar/detail-kelas/${course.id_course}`} className="text-blue-500 hover:underline">
                    {course.course_title}
                  </Link>
                </td>
                <td className="py-2 px-4 border-b">{course.paid === false 
                ? "Gratis" 
                : course.price 
                ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(course.price)
                : ""}
                </td>
                <td className="py-2 px-4 border-b">{course.online ? "Online" : "Offline"}</td>
                <td className="py-2 px-4 border-b">{course.joined_count}</td>
                <td className="py-2 px-4 border-b">{course.status_course}</td>
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
    </>
  );
};

export default DashboardPengajar;
