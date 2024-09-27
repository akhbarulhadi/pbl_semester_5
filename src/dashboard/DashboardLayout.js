import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarSidebar from '../dashboard/pengguna/Usidebar'; // Sesuaikan dengan path yang benar

const DashboardLayout = () => {
  return (
    <div className="flex">
      <NavbarSidebar /> {/* Menyertakan Sidebar Navbar */}
      <div className="flex-1 p-4">
        <Outlet /> {/* Ini akan me-render child routes */}
      </div>
    </div>
  );
};

export default DashboardLayout;
