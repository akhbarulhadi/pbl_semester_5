import React from 'react';
import { Outlet } from 'react-router-dom';
import Profile from './ProfileU'; // Pastikan Anda sudah punya komponen Navbar


const ProfileLayout = () => {
  console.log('ProfileLayout rendered');
  return (
    <div className="flex overflow-x-auto">
    <Profile />  {/* Ini adalah navbar yang ingin Anda gunakan */}
    <main className="flex-1 overflow-y-auto ">
    <Outlet />  {/* Di sini konten halaman akan dirender */}
    </main>
  </div>
  );
};

export default ProfileLayout;
