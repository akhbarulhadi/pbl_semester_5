import React from 'react';
import { Routes, Route } from 'react-router-dom';
import KursusSaya from './KursusSaya'; // Import komponen KursusSaya
import Transaksi from './Transaksi'; // Import komponen Transaksi
import SertifikatU from './SertifikatU'; // Import komponen SertifikatU
import PengaturanU from './PengaturanU'; // Import komponen PengaturanU
import SemuaKursus from './Semuakursus'; // Import komponen SemuaKursus
import ProfileU from './ProfileU';
import DetailKursus from './DetailKursus'; // Import komponen DetailKursus
import DashboardLayout from './DashboardLayout'; // Import layout DashboardLayout
import Usidebar from './Usidebar'; // Import Sidebar jika perlu

const PenggunaRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* Rute untuk halaman "Kursus Saya" */}
        <Route path="kursus" element={<KursusSaya />} />
        {/* Rute untuk halaman Transaksi */}
        <Route path="transaksi" element={<Transaksi />} />
        {/* Rute untuk halaman Sertifikat */}
        <Route path="sertifikat" element={<SertifikatU />} />
        {/* Rute untuk halaman Pengaturan */}
        <Route path="pengaturan" element={<PengaturanU />} />
        {/* Rute untuk halaman Semua Kursus */}
        <Route path="semua-kursus" element={<SemuaKursus />} />
        {/* Rute untuk halaman Detail Kursus berdasarkan ID */}
        <Route path="kursus/:id" element={<DetailKursus />} />
        {/* Rute untuk halaman Usidebar */}
        <Route path="Usidebar" element={<Usidebar />} />
        {/* Rute untuk halaman ProifleU */}
        <Route path="profile" element={<ProfileU />} />
      </Route>
    </Routes>
  );
};

export default PenggunaRoutes;
