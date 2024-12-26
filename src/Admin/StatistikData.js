import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const StatistikData = () => {
  const [state, setState] = useState({
    months: [], // Menyimpan bulan
    data: [],   // Menyimpan jumlah pengguna per bulan
  });

  const options = {
    legend: {
      show: false, // Tidak perlu legend karena hanya satu dataset
    },
    colors: ["#3C50E0"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      fillOpacity: 1,
      hover: {
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: state.months, // Menggunakan bulan yang sudah diproses
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0, // Nilai minimum
      max: Math.max(...state.data) + 1,  // Nilai maksimum disesuaikan dengan data
      tickAmount: 4, // Jumlah garis pembagi
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil data dari API
        const res = await fetch("/api/admin/statistik/total-users");
        const data = await res.json();

        // Proses data dari API
        const months = Object.keys(data.userPerMonth); // Bulan-bulan
        const userCounts = Object.values(data.userPerMonth); // Jumlah pengguna per bulan

        // Set data ke state
        setState({
          months: months,
          data: userCounts,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="col-span-12 rounded-md border border-stroke bg-white p-5 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-gray-800 font-medium">Akun Pengguna</h2>
        <button className="text-gray-600 text-sm focus:outline-none">
          Bulan Ini
        </button>
      </div>

      {/* Total Data */}
      <div className="mt-4">
        <h1 className="text-3xl font-semibold text-[#127B19]">
          {state.data.reduce((a, b) => a + b, 0)} Terdaftar
        </h1>
      </div>

      {/* Chart */}
      <ReactApexChart
        options={options}
        series={[{ name: "Akun Terdaftar", data: state.data }]} // Hanya satu dataset
        type="area"
        height={350}
      />
    </div>
  );
};

export default StatistikData;
