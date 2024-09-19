// PengajarLayout.jsx
import React from 'react';
import HeaderPengajar from './HeaderPengajar';
import SidebarPengajar from './SidebarPengajar';
import { Outlet } from 'react-router-dom';

const PengajarLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <HeaderPengajar />
      <div className="flex">
        <SidebarPengajar />
        <main className="flex-1  p-4">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default PengajarLayout;
