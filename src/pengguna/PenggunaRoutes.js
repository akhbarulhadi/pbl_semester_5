import React from 'react';
import { Routes, Route } from 'react-router-dom';
import KursusSaya from './KursusSaya';
import DetailKursus from './DetailKursus';
import Transaksi from './Transaksi';
import SertifikatU from './SertifikatU';
import PengaturanU from './PengaturanU';
import SemuaKursus from './Semuakursus';
import ProfileU from './ProfilePage'; // Pastikan ProfileU diimpor
import DashboardU from './DashboardU';
import DashboardLayout from './DashboardLayout';
import Usidebar from './Usidebar';
import LihatKelasDetail from './LihatDetailKelas';
import MulaiKelas from './MulaiKelas';
import DetailTransaksi from './DetailTransaksi';
import Pembelian from './Pembelian';
import DetailPembelian from './DetailPembelian';
import ProfileLayoutComponent from './ProfileLayout'; // Impor ProfileLayout
import NavbarLayout from './navbarLayout'; // Impor NavbarLayout
import KursusDetail from './KursusDetail'; // Impor KursusDetail
import ProfilePage from './ProfilePage';  // Pastikan pathnya sesuai dengan lokasi file ProfilePage

const PenggunaRoutes = () => {
  return (
    <main>
    <Routes>
      {/* Rute dengan DashboardLayout (untuk sidebar) */}
      <Route path="/" element={<DashboardLayout />}>
        <Route path="kursus" element={<KursusSaya />} />
        <Route path="dashboardU" element={<DashboardU />} />
        <Route path="Usidebar" element={<Usidebar />} />
      </Route>

      {/* Rute untuk halaman profile tanpa navbar layout */}
      <Route element={<ProfileLayoutComponent />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="sertifikat" element={<SertifikatU />} />
        <Route path="transaksi" element={<Transaksi />} />
        <Route path="pengaturan" element={<PengaturanU />} />
      </Route>

      {/* Rute tanpa sidebar dengan navbar khusus */}
      <Route element={<NavbarLayout />}>
        <Route path="lihatkelas/:id" element={<LihatKelasDetail />} />
        <Route path="mulaikelas/:id" element={<MulaiKelas />} />
        <Route path="transaksi/:id" element={<DetailTransaksi />} />
        <Route path="kursus/:id_course" element={<DetailKursus />} />
        <Route path="semua-kursus" element={<SemuaKursus />} />
        <Route path="pembelian/:id_course" element={<Pembelian />} />
        <Route path="KursusDetail/:id_course" element={<KursusDetail />} />
        <Route path="detailpembelian/:id" element={<DetailPembelian />} />
      </Route>
    </Routes>
    </main>
  );
};

export default PenggunaRoutes;
