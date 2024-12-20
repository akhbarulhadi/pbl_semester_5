import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarSidebar from '../pengguna/Usidebar'; // Sesuaikan dengan path yang benar

const DashboardLayout = () => {
  return (
    <div className="flex">
      <NavbarSidebar /> {/* Menyertakan Sidebar Navbar */}
      <div className="flex-1 overflow-y-auto p-8 bg-white mt-16 ">
        <Outlet /> {/* Ini akan me-render child routes */}
      </div>
    </div>
  );
};

export default DashboardLayout;
