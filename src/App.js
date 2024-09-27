import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/navbar'; // Sesuaikan path dengan lokasi Navbar
import Footer from './components/FooterComponent';
import Product from './LandingPage/Product';
import ModulPelatihan from './LandingPage/ModulPelatihan';
import ForumDiskusi from './LandingPage/ForumDiskusi';
import Sertifikat from './LandingPage/sertifikat';
import Login from './LandingPage/Login';
import SignUp from './LandingPage/SignUp'; // Path yang benar
import PengajarRoutes from './Pengajar/PengajarRoutes'; // Path yang benar
import AdminRoutes from './Admin/AdminRoutes'; // Path yang benar
import NavbarSidebar from './dashboard/pengguna/Usidebar'; // Path yang benar
import Drawer from './LandingPage/Home';
import KursusSaya from './dashboard/pengguna/KursusSaya'; // Import komponen KursusSaya
import Transaksi from './dashboard/pengguna/Transaksi'; // Import komponen Transaksi
import SertifikatU from './dashboard/pengguna/SertifikatU'; // Import komponen SertifikatU
import PengaturanU from './dashboard/pengguna/PengaturanU'; // Import komponen PengaturanU
import SemuaKursus from './dashboard/pengguna/Semuakursus'; // Import komponen SemuaKursus
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Komponen Parent untuk Dashboard dengan Outlet untuk child routes
const DashboardLayout = () => {
  return (
    <div className="flex">
      <NavbarSidebar /> {/* Tambahkan NavbarSidebar di sini */}
      <div className="flex-1 p-4">
        <Outlet /> {/* Ini akan me-render child routes */}
      </div>
    </div>
  );
};

// MainContent untuk routing berdasarkan role
const MainContent = () => {
  const location = useLocation();

  // Halaman yang tidak menampilkan Drawer
  const hideDrawer = [
    "/forum-diskusi",
    "/modul-pelatihan",
    "/sertifikat",
    "/login",
    "/signup",
  ].includes(location.pathname) || location.pathname.startsWith("/pengajar") || location.pathname.startsWith("/admin")||location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideDrawer && <Drawer />}
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/product" element={<Product />} />

          {/* Parent route untuk dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Rute untuk halaman "Kursus Saya" */}
            <Route path="pengguna/kursus" element={<KursusSaya />} />
            <Route path="pengguna/transaksi" element={<Transaksi />} />
            <Route path="pengguna/sertifikatU" element={<SertifikatU />} />
            <Route path="pengguna/pengaturanU" element={<PengaturanU />} />
            {/* Halaman SemuaKursus dipindahkan ke luar dashboard */}
          </Route>

          {/* Rute khusus untuk SemuaKursus di luar dashboard */}
          <Route path="/semuakursus" element={<SemuaKursus />} />

          <Route path="/modul-pelatihan" element={<ModulPelatihan />} />
          <Route path="/forum-diskusi" element={<ForumDiskusi />} />
          <Route path="/sertifikat" element={<Sertifikat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pengajar/*" element={<PengajarRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </main>
    </>
  );
};

// Layout untuk menampilkan Navbar, MainContent, dan Footer
const Layout = () => {
  const location = useLocation();

  // Tentukan halaman-halaman tertentu yang tidak membutuhkan Navbar atau Footer
  const hideNavbarAndFooter = 
    ["/login", "/signup"].includes(location.pathname) ||
    location.pathname.startsWith("/pengajar") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith('/dashboard');

  return (
    <>
      {/* Navbar akan ditampilkan di semua halaman kecuali halaman login, signup, dan dashboard */}
      {!hideNavbarAndFooter && <Navbar />}
      <MainContent />
      {/* Footer akan ditampilkan di semua halaman kecuali halaman login, signup, dan dashboard */}
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
};

// Komponen App sebagai entry point aplikasi
const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
