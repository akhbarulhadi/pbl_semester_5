import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Drawer from './components/Drawer';
import Footer from './components/FooterComponent';
import Product from './LandingPage/Product';
import About from './LandingPage/About';
import FormProduct from './LandingPage/formProduct';
import ModulPelatihan from './LandingPage/ModulPelatihan';
import ForumDiskusi from './LandingPage/ForumDiskusi';
import Sertifikat from './LandingPage/sertifikat';
import Login from './LandingPage/Login';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainContent = () => {
  const location = useLocation();
  const showDrawer = !['/forum-diskusi', '/modul-pelatihan', '/sertifikat', '/login'].includes(location.pathname);

  return (
    <>
      {showDrawer && <Drawer />}
      <main className="p-4">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/addproduct" element={<FormProduct />} />
          <Route path="/addproduct/:id_product" element={<FormProduct />} />
          <Route path="/modul-pelatihan" element={<ModulPelatihan />} />
          <Route path="/forum-diskusi" element={<ForumDiskusi />} />
          <Route path="/sertifikat" element={<Sertifikat />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  );
};

const Layout = () => {
  const location = useLocation();
  
  // Tentukan halaman-halaman tertentu yang tidak membutuhkan Navbar atau Footer
  const hideNavbarAndFooter = ['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <MainContent />
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
