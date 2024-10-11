import React from 'react';
import { Routes, Route } from 'react-router-dom';
import KursusSaya from './KursusSaya';
import DetailKursus from './DetailKursus';
import Transaksi from './Transaksi';
import SertifikatU from './SertifikatU';
import PengaturanU from './PengaturanU';
import SemuaKursus from './Semuakursus';
import ProfileU from './ProfileU';
import DashboardU from './DashboardU';
import DashboardLayout from './DashboardLayout';
import Usidebar from './Usidebar';
import LihatKelasDetail from './LihatDetailKelas';
import MulaiKelas from './MulaiKelas';
import DetailTransaksi from './DetailTransaksi';
import NavbarLayout from './navbarLayout'; // Pastikan NavbarLayout diimpor

const PenggunaRoutes = () => {
  return (
    <Routes>
      {/* Rute dengan sidebar */}
      <Route path="/" element={<DashboardLayout />}>
        <Route path="kursus" element={<KursusSaya />} />
        <Route path="transaksi" element={<Transaksi />} />
        <Route path="sertifikat" element={<SertifikatU />} />
        <Route path="pengaturan" element={<PengaturanU />} />
        <Route path="dashboardU" element={<DashboardU />} />
        <Route path="profile" element={<ProfileU />} />
        <Route path="Usidebar" element={<Usidebar />} />

      </Route>

      {/* Rute tanpa sidebar dengan navbar khusus */}
      <Route element={<NavbarLayout />}>
        <Route path="lihatkelas/:id" element={<LihatKelasDetail />} />
        <Route path="mulaikelas/:id" element={<MulaiKelas />} />
        <Route path="transaksi/:id" element={<DetailTransaksi />} />
        <Route path="kursus/:id" element={<DetailKursus />} />
        <Route path="semua-kursus" element={<SemuaKursus />} />

      </Route>
    </Routes>
  );
};

export default PenggunaRoutes;
