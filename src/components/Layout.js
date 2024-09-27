// components/Layout.js
import React from 'react';
import Drawer from '../LandingPage/Home';  // Pastikan jalur ini benar
import Navbar from './navbar';  // Pastikan jalur ini benar
import Footer from './FooterComponent';  // Pastikan jalur ini benar

const Layout = ({ children, showDrawer = true }) => {
  return (
    <div>
      <Navbar />
      {showDrawer && <Drawer />} {/* Menampilkan Drawer berdasarkan prop showDrawer */}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
