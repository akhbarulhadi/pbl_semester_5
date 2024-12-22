import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

  const options = {
    legend: {
      show: false, // Tidak perlu legend karena hanya satu dataset
      position: 'top',
      horizontalAlign: 'left',
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
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
      max: 100,
    },
  };

  const GrafikKunjungan = () => {
    const [state, setState] = useState({
      series: [
        {
          name: 'Total Pengunjung',
          data: [80, 40, 80, 40, 80, 40, 80, 40, 80, 40, 80, 40, ],
        }
      ], // Data awal contoh
    });

  const months = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitorsRes = await Promise.all([
          fetch('/api/admin/statistik/total-visitors').then(res => res.json()),
        ]);

        // Initialize with zeroes for all months
        const visitorsData = months.map(month => visitorsRes.visitorsPerMonth[month] || 0); // Data diambil dari respons API

        // Set data ke state
        setState({
          series: [
            {
              name: 'Total Pengunjung',
              data: visitorsData,
            },
          ],
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
        <h2 className="text-gray-800 font-medium">Total Kunjungan</h2>
        <button className="text-gray-600 text-sm focus:outline-none">
          Bulan Ini
        </button>
      </div>

      {/* Total Data */}
      <div className="mt-4">
        <h1 className="text-3xl font-semibold text-[#127B19]">
          {state.series.reduce((a, b) => a + b, 0)} Kunjungan
        </h1>
      </div>

      {/* Chart */}
      <div id="chartOne" className="-ml-5">
        <ReactApexChart
          options={options}
          series={state.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default GrafikKunjungan;