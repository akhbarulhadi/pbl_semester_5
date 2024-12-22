// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import appleLogo from "../assets/images/apple.png";

// function SidebarAdmin({ sidebarOpen, setSidebarOpen }) {
//   // State untuk menyimpan link yang aktif
//   const [activeLink, setActiveLink] = useState("");

//   // Fungsi untuk mengatur link yang aktif saat diklik
//   const handleLinkClick = (link) => {
//     setActiveLink(link);
//     setSidebarOpen(false); // Menutup sidebar setelah link diklik
//   };

//   return (
//     <div>
//       {/* Sidebar fixed */}
//       <div
//         className={`fixed top-0 left-0 z-30 w-64 h-full bg-gray-800 text-white transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:translate-x-0`}
//       >
//         <div className="flex items-center justify-between p-4">
//           <img
//             src={appleLogo}
//             className="h-30 w-16 mr-3 bg-white"
//             alt="apple"
//           />
//           <span className="text-xl font-bold sm:text-2xl whitespace-nowrap dark:text-white">
//             APPLE
//           </span>
//           <span className="text-xl font-bold sm:text-2xl whitespace-nowrap text-gray-500 dark:text-gray-300">
//             NESIA
//           </span>
//         </div>
//         <nav className="mt-8">
//           <ul>
//             <li
//               className={`p-4 rounded-md mt-3 hover:bg-gray-700 transition-colors duration-300 ${
//                 activeLink === "/admin/dashboard-admin" ? "bg-gray-700" : ""
//               }`}
//             >
//               <Link
//                 to="/admin/dashboard-admin"
//                 onClick={() => handleLinkClick("/admin/dashboard-admin")}
//                 className="flex items-center"
//               >
//                 {/* Ikon Dashboard */}
//                 <svg
//                   className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 mr-3"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke-width="1.5"
//                   stroke="currentColor"
//                   class="size-6"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
//                   />
//                 </svg>
//                 Dashboard
//               </Link>
//             </li>
//             <li
//               className={`p-4 rounded-md mt-3 hover:bg-gray-700 transition-colors duration-300 ${
//                 activeLink === "/admin/daftar-pengajar" ? "bg-gray-700" : ""
//               }`}
//             >
//               <Link
//                 to="/admin/daftar-pengajar"
//                 onClick={() => handleLinkClick("/admin/daftar-pengajar")}
//                 className="flex items-center"
//               >
//                 {/* Ikon Kelas */}
//                 <svg
//                   className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 mr-3"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   class="size-6"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z"
//                     clip-rule="evenodd"
//                   />
//                 </svg>
//                 Daftar Pengajar
//               </Link>
//             </li>
//             <li
//               className={`p-4 rounded-md mt-3 hover:bg-gray-700 transition-colors duration-300 ${
//                 activeLink === "/admin/persetujuan-buka-kelas"
//                   ? "bg-gray-700"
//                   : ""
//               }`}
//             >
//               <Link
//                 to="/admin/persetujuan-buka-kelas"
//                 onClick={() => handleLinkClick("/admin/persetujuan-buka-kelas")}
//                 className="flex items-center"
//               >
//                 {/* Ikon riwayat */}
//                 <svg
//                   className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 mr-3"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   class="size-6"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm4.996 2a1 1 0 0 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 8a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 11a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 14a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Z"
//                     clip-rule="evenodd"
//                   />
//                 </svg>
//                 Persetujuan Buka Kelas
//               </Link>
//             </li>
//             <li
//               className={`p-4 rounded-md mt-3 hover:bg-gray-700 transition-colors duration-300 ${
//                 activeLink === "/admin/riwayat-transaksi" ? "bg-gray-700" : ""
//               }`}
//             >
//               <Link
//                 to="/admin/riwayat-transaksi"
//                 onClick={() => handleLinkClick("/admin/riwayat-transaksi")}
//                 className="flex items-center"
//               >
//                 {/* Ikon riwayat */}
//                 <svg
//                   className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 mr-3"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   class="size-6"
//                 >
//                   <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
//                   <path
//                     fill-rule="evenodd"
//                     d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
//                     clip-rule="evenodd"
//                   />
//                 </svg>
//                 Riwayat Transaksi
//               </Link>
//             </li>
//             <li
//               className={`p-4 rounded-md mt-3 hover:bg-gray-700 transition-colors duration-300 ${
//                 activeLink === "/admin/riwayat-transaksi" ? "bg-gray-700" : ""
//               }`}
//             >
//               <Link
//                 to="/admin/riwayat-transaksi"
//                 onClick={() => handleLinkClick("/admin/riwayat-transaksi")}
//                 className="flex items-center"
//               >
//                 {/* Ikon riwayat */}
//                 <svg
//                   className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 mr-3"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   class="size-6"
//                 >
//                   <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
//                   <path
//                     fill-rule="evenodd"
//                     d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
//                     clip-rule="evenodd"
//                   />
//                 </svg>
//                 Riwaya
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Overlay for mobile, only for content */}
//       <div
//         className={`fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden ${
//           sidebarOpen ? "block" : "hidden"
//         }`}
//         onClick={() => setSidebarOpen(false)}
//         style={{ marginLeft: "16rem" }} // Adjust the margin to accommodate the sidebar width
//       ></div>
//     </div>
//   );
// }

// export default SidebarAdmin;
