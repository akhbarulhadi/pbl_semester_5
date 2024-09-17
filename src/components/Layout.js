// components/Layout.js
import React from 'react';
import Navbar from './navbar';
import Footer from './FooterComponent';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
