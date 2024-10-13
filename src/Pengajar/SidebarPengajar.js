import React, { useState } from "react";
import { Link } from "react-router-dom";
import appleLogo from "../assets/images/apple.png";

function SidebarPengajar({ sidebarOpen, setSidebarOpen }) {
  // State untuk menyimpan link yang aktif
  const [activeLink, setActiveLink] = useState("");

  // Fungsi untuk mengatur link yang aktif saat diklik
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setSidebarOpen(false); // Menutup sidebar setelah link diklik
  };

  return (
    <div>
      {/* Sidebar fixed */}
      <div
        className={`fixed top-0 left-0 z-30 w-64 h-full bg-gray-800 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4">
          <img
            src={appleLogo}
            className="h-30 w-16 mr-3 bg-white"
            alt="apple"
          />
          <span className="text-xl font-bold sm:text-2xl whitespace-nowrap dark:text-white">
            APPLE
          </span>
          <span className="text-xl font-bold sm:text-2xl whitespace-nowrap text-gray-500 dark:text-gray-300">
            NESIA
          </span>
        </div>
        <nav className="mt-8">
          <ul>
            <li
              className={`p-4 rounded-md mt-3 hover:bg-gray-700 transition-colors duration-300 ${
                activeLink === "/pengajar/dashboard-pengajar"
                  ? "bg-gray-700"
                  : ""
              }`}
            >
              <Link
                to="/pengajar/dashboard-pengajar"
                onClick={() => handleLinkClick("/pengajar/dashboard-pengajar")}
                className="flex items-center"
              >
                {/* Ikon Dashboard */}
                <svg className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 mr-3"
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
                    d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                  />
                </svg>
                Dashboard
              </Link>
            </li>
            <li
              className={`p-4 rounded-md mt-3 hover:bg-gray-700 transition-colors duration-300 ${
                activeLink === "/pengajar/kelas" ? "bg-gray-700" : ""
              }`}
            >
              <Link
                to="/pengajar/kelas"
                onClick={() => handleLinkClick("/pengajar/kelas")}
                className="flex items-center"
              >
                {/* Ikon Kelas */}
                <svg className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                  <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                  <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                </svg>
                Kelas
              </Link>
            </li>
            <li
              className={`p-4 rounded-md mt-3 hover:bg-gray-700 transition-colors duration-300 ${
                activeLink === "/pengajar/riwayat-transaksi"
                  ? "bg-gray-700"
                  : ""
              }`}
            >
              <Link
                to="/pengajar/riwayat-transaksi"
                onClick={() => handleLinkClick("/pengajar/riwayat-transaksi")}
                className="flex items-center"
              >
                {/* Ikon riwayat */}
                <svg className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Riwayat Transaksi
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile, only for content */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
        style={{ marginLeft: "16rem" }} // Adjust the margin to accommodate the sidebar width
      ></div>
    </div>
  );
}

export default SidebarPengajar;
