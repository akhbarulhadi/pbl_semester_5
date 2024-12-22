import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatistikData from "./StatistikData";
import DataTotal from "Admin/DataTotal";

const DashboardAdmin = () => {
  const [totalUser, setTotalUser] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/admin/teacher/count", {
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
        setTotalUser(data.userCount);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  
  return (
    <div className="p-4 md:p-6">
      {/* Section: Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <Link to="/saldo"  className="text-[#84D68E]">
          <DataTotal
            title="Total Saldo"
            total="Rp.20.000.000"
            tags={["Minggu Ini"]}
         
          />
        </Link>

        <Link to="/pembelian-kelas" className="block text-[#845ED4]">
          <DataTotal
            title="Total Pembelian Kelas"
            total="350 Kelas"
            tags={["Hari Ini", "Minggu Ini", "Bulan Ini"]}
           
          />
        </Link>

        <Link to="/pembelian-kelas"  className="block text-[#C739A6]">
          <DataTotal
            title="Total Peserta"
            total="200 Peserta"
           
          />
        </Link>

        <Link to="/pembelian-kelas" className="block text-[#3CA9C2]">
          <DataTotal
            title="Total Pengajar"
            total="20 Pengajar"
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Top Penjualan Kelas
          </h2>
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
                <tr>
                  <td className="px-4 py-2">Kelas Perbaikan Xr</td>
                  <td className="px-4 py-2">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(2000000)}
                  </td>
                  <td className="px-4 py-2">30 Peserta</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Kelas Perbaikan Macbook</td>
                  <td className="px-4 py-2">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(2000000)}
                  </td>
                  <td className="px-4 py-2">20 Peserta</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Kelas Perbaikan Imac</td>
                  <td className="px-4 py-2">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(2000000)}
                  </td>
                  <td className="px-4 py-2">30 Peserta</td>
                </tr>
              </tbody>
            </table>
          </div>


          {/* Pengajuan Dana */}

          <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
            Pengajuan Dana
          </h2>
          <div className="shadow rounded overflow-hidden bg-white">
            <table className="w-full table-auto text-sm">
            <thead>
                <tr className="text-white bg-[#6926D7]">
                  <th className="h-[30px] px-5 rounded-tl-lg">Nama Pengajar</th>
                  <th className="px-5 h-[30px]">Jumlah Pengajuan</th>
                  <th className="h-[30px] px-5 rounded-tr-lg">
                    Nama Bank
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td className="px-4 py-2">Tazzz dung dung </td>
                  <td className="px-4 py-2">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(4000000)}
                  </td>
                  <td className="px-4 py-2">BCA</td>
                </tr>
                <tr >
                  <td className="px-4 py-2">Ling Ibnu</td>
                  <td className="px-4 py-2">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(3000000)}
                  </td>
                  <td className="px-4 py-2">Mandiri</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Parhan Kevbab</td>
                  <td className="px-4 py-2">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(6000000)}
                  </td>
                  <td className="px-4 py-2">BNI</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pengajuan Kelas */}

          <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
            Pengajuan Kelas
          </h2>
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
                <tr>
                  <td className="px-4 py-2">Kelas Perbaikan</td>
                  <td className="px-4 py-2">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(2000000)}
                  </td>
                  <td className="px-4 py-2">AeronShuki</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Kelas Perbaikan Macbook</td>
                  <td className="px-4 py-2">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(2000000)}
                  </td>
                  <td className="px-4 py-2">Grilong</td>
                </tr>
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
                  <th className="h-[30px] px-5 rounded-tr-lg">Status</th>

                </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
  <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">John Doe</td>
  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">john.doe@example.com</td>
  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$5</td>
  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">10</td>
  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">100</td>
  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Aktif</td>

</tr>

    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Jane Smith</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">jane.smith@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$50</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">5</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">50</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">4.0</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Aktif</td>

    </tr>
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Alice Johnson</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">alice.johnson@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$150</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">20</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">200</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">5.0</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Aktif</td>
   
    </tr>
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Robert Brown</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">robert.brown@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$200</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">80</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">4.8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Aktif</td>

    </tr>
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Robert Brown</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">robert.brown@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$200</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">80</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">4.8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Aktif</td>

    </tr>
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Robert Brown</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">robert.brown@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$200</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">80</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">4.8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Aktif</td>
    
    </tr>
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Robert Brown</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">robert.brown@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$200</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">80</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">4.8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Aktif</td>

    </tr>
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Robert Brown</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">robert.brown@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$200</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">80</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">4.8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Aktif</td>

    </tr>
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Robert Brown</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">robert.brown@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$200</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">80</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">4.8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Aktif</td>

    </tr>
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Robert Brown</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">robert.brown@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$200</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">80</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">4.8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Aktif</td>

        </tr>
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
                  <th className="h-[30px] px-5 rounded-tl-lg">Usename</th>
                  <th className="px-5 h-[30px]">Nama Lengkap</th>
                  <th className="px-5 h-[30px]">Email</th>
                  <th className="px-5 h-[30px]">Kelamin</th>
                  <th className="h-[30px] px-5 rounded-tr-lg">Terakhir Login</th>
                </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">John Doe</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">john.doe@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$5</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">10</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">100</td>
    </tr>
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Jane Smith</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">jane.smith@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$50</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">5</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">50</td>

    </tr>
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Alice Johnson</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">alice.johnson@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$150</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">20</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">200</td>
   
    </tr>
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Robert Brown</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">robert.brown@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$200</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">80</td>

    </tr>
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Robert Brown</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">robert.brown@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$200</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">80</td>

    </tr>
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Robert Brown</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">robert.brown@example.com</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$200</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">8</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">80</td>
    </tr>
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