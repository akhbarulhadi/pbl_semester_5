import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const StatistikData = () => {
  const [state, setState] = useState({
    data: [20, 60, -20, -60, 20, 40], // Data awal contoh
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mai", // Ganti May menjadi Mai
        "Jun",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0, // Nilai minimum
      max: 100,  // Nilai maksimum
      tickAmount: 4, // Jumlah garis pembagi (60, 20, -20, -60)
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Contoh fetch data API (simulasi)
        const res = await fetch("/api/admin/statistik/registered-users").then(
          (res) => res.json()
        );

        // Simulasi respons API
        const simulatedData = [20, 60, -20, -60, 20, 40]; // Data diambil dari respons API

        // Set data ke state
        setState({
          data: simulatedData,
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
