import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatistikData from "./StatistikData";
import DataTotal from "Admin/DataTotal";
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

const DashboardAdmin = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalTeacher, setTotalTeacher] = useState(0);
  const [userList, setUserList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [topCourses, setTopCourses] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [pengajuanCourses, setPengajuanCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/admin/statistik/count", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTotalBalance(data.total_balance);
        setTotalCourses(data.total_courses);
        setTotalUser(data.userCount);
        setTotalTeacher(data.teacherCount);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response = await fetch('/api/admin/teacher/users', {
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
            response = await fetch('/api/admin/teacher/users', {
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
        setUserList(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchUsers();
  }, []);
  
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

  useEffect(() => {
    const fetchTopCourses = async () => {
      try {
        let response = await fetch('/api/admin/courses/dashboard/top-courses', {
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
            response = await fetch('/api/admin/courses/dashboard/top-courses', {
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
        setTopCourses(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchTopCourses();
  }, []);
  
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        let response = await fetch('/api/admin/withdrawal/dashboard/pengajuan-dana', {
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
            response = await fetch('/api/admin/withdrawal/dashboard/pengajuan-dana', {
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
        setWithdrawals(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchWithdrawals();
  }, []);

  useEffect(() => {
    const fetchPengajuanCourses = async () => {
      try {
        let response = await fetch('/api/admin/courses/dashboard/pengajuan-courses', {
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
            response = await fetch('/api/admin/courses/dashboard/pengajuan-courses', {
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
        setPengajuanCourses(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchPengajuanCourses();
  }, []);


  return (
    <div className="p-4 md:p-6">
      {/* Section: Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <Link to="/saldo"  className="text-[#84D68E]">
          <DataTotal
            title="Total Saldo"
            total={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalBalance)}
            tags={["Semua"]}
         
          />
        </Link>

        <Link to="/pembelian-kelas" className="block text-[#845ED4]">
          <DataTotal
            title="Total Pembelian Kelas"
            total={`${totalCourses} Kelas`}
            tags={["Semua"]}
           
          />
        </Link>

        <Link to="/pembelian-kelas"  className="block text-[#C739A6]">
          <DataTotal
            title="Total Peserta"
            total={`${totalCourses} Total Peserta`}           
          />
        </Link>

        <Link to="/total-pengajar" className="block text-[#3CA9C2]">
          <DataTotal
            title="Total Pengajar"
            total={`${totalTeacher} Pengajar`}           
            // total="20 Pengajar"
            className=""
          />
        </Link>
      </div>

      {/* Section: Statistics and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Statistik Data */}
        <div>
          <StatistikData />
        </div>

        {/* Top Penjualan Kelas */}
        <div className="col-span-2">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Top Penjualan Kelas
            </h2>
          </div>
          <div className="shadow rounded overflow-hidden bg-white">
            <table className="w-full table-auto text-sm">
            <thead>
                <tr className="text-white bg-[#6926D7]">
                  <th className="h-[30px] px-5 rounded-tl-lg">Nama Kelas</th>
                  <th className="px-5 h-[30px]">Harga</th>
                  <th className="h-[30px] px-5 rounded-tr-lg">
                    Total Pengikut
                  </th>
                </tr>
              </thead>
              <tbody>
              {topCourses.map((top) => (
                <tr>
                  <td className="px-4 py-2">{top.course_title}</td>
                  <td className="px-4 py-2">
                  {top.paid === false
                      ? 'Gratis'
                      : `${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", }).format(top.price)}`}
                  </td>
                  <td className="px-4 py-2">{top.join_count} Peserta</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>


          {/* Pengajuan Dana */}
          <div className="mt-8 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Pengajuan Dana
            </h2>
            <a className="" href="/admin/pengajuan-penarikan">Lihat Selengkapnya</a>
          </div>
          <div className="shadow rounded overflow-hidden bg-white">
            <table className="w-full table-auto text-sm">
            <thead>
                <tr className="text-white bg-[#6926D7]">
                  <th className="h-[30px] px-5 rounded-tl-lg">Nama Pengajar</th>
                  <th className="px-5 h-[30px]">Jumlah Pengajuan</th>
                  <th className="px-5 h-[30px]">Informasi Rekening</th>
                  <th className="h-[30px] px-5 rounded-tr-lg">
                    Nama Bank
                  </th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((withdraw) => (
                  <tr >
                    <td className="px-4 py-2">{withdraw.user_name}</td>
                    <td className="px-4 py-2">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", }).format(withdraw.amount)}
                    </td>
                    <td className="px-4 py-2">{withdraw.bank_account_holder_name} ({withdraw.bank_account_number})</td>
                    <td className="px-4 py-2">{withdraw.bank_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pengajuan Kelas */}
          <div className="mt-8 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Pengajuan Kelas
            </h2>
            <a className="" href="/admin/pengajuan-kelas">Lihat Selengkapnya</a>
          </div>
          <div className="shadow rounded overflow-hidden bg-white">
            <table className="w-full table-auto text-sm">
            <thead>
                <tr className="text-white bg-[#6926D7]">
                  <th className="h-[30px] px-5 rounded-tl-lg">Nama Kelas</th>
                  <th className="px-5 h-[30px]">Harga</th>
                  <th className="h-[30px] px-5 rounded-tr-lg">
                    Nama Pengajar
                  </th>
                </tr>
              </thead>
              <tbody>
                {pengajuanCourses.map((pengajuan_course) => (
                  <tr>
                    <td className="px-4 py-2">{pengajuan_course.course_title}</td>
                    <td className="px-4 py-2">
                      {pengajuan_course.paid === false
                          ? 'Gratis'
                          : `${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", }).format(pengajuan_course.price)}`}
                    </td>
                    <td className="px-4 py-2">{pengajuan_course.user_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
 
    {/* list Pengajar */}

  
  <div className="max-w-7xl mx-auto">
    <h2 className="text-lg font-semibold text-gray-900 mt-8">List Akun Pengajar</h2>
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="w-full table-auto text-sm">
                <thead className="bg-[#F1F3F9] ">
                  <tr className="text-black bg-[#F1F3F9]">
                    <th className="h-[30px] px-5 rounded-tl-lg">Nama</th>
                    <th className="px-5 h-[30px]">Email</th>
                    <th className="px-5 h-[30px]">Saldo</th>
                    <th className="px-5 h-[30px]">Total Kelas</th>
                    <th className="px-5 h-[30px]">Total Peserta</th>
                    <th className="px-5 h-[30px]">Rating</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {teacherList.map((teacher) => (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.name}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{teacher.email}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(teacher.balance)}</td>
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

   {/* List Pengguna */}

  <h2 className="text-lg font-semibold text-gray-900 mt-8">List Akun Pengguna</h2>
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
             <table className="w-full table-auto text-sm divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr className="text-black bg-[#F1F3F9]">
                  <th className="h-[30px] px-5 rounded-tl-lg">Nama</th>
                  <th className="px-5 h-[30px]">Email</th>
                  <th className="px-5 h-[30px]">No Telp</th>
                  <th className="h-[30px] px-5 rounded-tr-lg">Terakhir Login</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {userList.map((user) => (
                  <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.email}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.no_telp}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.last_sign_in_at}</td>
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
    </div>
  );
};

export default DashboardAdmin;