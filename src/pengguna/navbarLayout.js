import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Usidebar'; // Pastikan Anda sudah punya komponen Navbar

const NavbarLayout = () => {
  return (
    <div>
      <Navbar />  {/* Ini adalah navbar yang ingin Anda gunakan */}
      <main>
        <Outlet />  {/* Di sini konten halaman akan dirender */}
      </main>
    </div>
  );
};

export default NavbarLayout;
