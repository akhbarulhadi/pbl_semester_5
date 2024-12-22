import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import profile from "../assets/images/jenggot.png";

const PengajarLayout = () => {
  return (
    <div className="relative min-h-screen">
        {/* Sidebar dan Konten */}
        <div className="relative z-10 flex">
          <Sidebar />

          {/* Konten */}
          <main className="relative flex-1 lg:ml-64">
            {/* bg-green */}
            <div className="absolute top-0 left-0 w-full h-40 rounded-b-3xl lg:h-60 bg-[#94E5A5]"></div>

            {/* Konten Utama */}
            <div className="relative z-10 p-8 pt-32 h-screen overflow-y-auto">
              {/* Tambahkan Profil di Pojok Kanan */}
              <div className="absolute top-4 right-4 ">
                <div className="flex items-center space-x-3 bg-white p-2 rounded-full shadow-lg">
                  
                  <img src={profile} className="h-14 w-14 mr-2" alt="profile" />
                  <Link to="/pengajar/profile-pengajar">
                    <div className="text-sm">
                      <p className="font-semibold">Pengajar</p>
                      <p className="text-gray-500">Charles Magnussen</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Konten yang bisa disesuaikan */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="overflow-x-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          </main>
        </div>
    </div>
  );
};

export default PengajarLayout;
