// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Drawer from './components/Drawer';
import Footer from './components/FooterComponent';
import Product from './pages/Product';
import About from './pages/About';
import FormProduct from './pages/formProduct';
import ModulPelatihan from './pages/ModulPelatihan';
import ForumDiskusi from './pages/ForumDiskusi';
import Sertifikat from './pages/sertifikat';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainContent = () => {
  const location = useLocation();
  const showDrawer = !['/forum-diskusi', '/modul-pelatihan', '/sertifikat'].includes(location.pathname);

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
        </Routes>
      </main>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <MainContent />
      <Footer />
    </Router>
  );
};

export default App;
