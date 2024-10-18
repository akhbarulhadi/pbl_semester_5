import { Routes, Route } from "react-router-dom";
import PengajarLayout from "./PengajarLayout";
import DashboardPengajar from "./DashboardPengajar";
import FormIncome from "./FormIncome";
import FormKelas from "./FormKelas";
import Kelas from "./Kelas";
import ProfilPengajar from "./ProflePengajar";
import RiwayatTransaksi from "./RiwayatTransaksi";
import ProfilePengajar from "./ProflePengajar";
import DetailKelas from "./DetailKelas";

const PengajarRoutes = () =>   {
  return (
    <Routes>
      {/* Semua halaman pengajar akan dibungkus oleh PengajarLayout */}
      <Route element={<PengajarLayout />}>
        <Route path="dashboard-pengajar" element={<DashboardPengajar />} />
        <Route path="form-kelas" element={<FormKelas />} />
        <Route path="form-income" element={< FormIncome />} />
        <Route path="kelas" element={< Kelas />} />
        <Route path="profile-pengajar" element={< ProfilPengajar />} />
        <Route path="profile-pengajar" element={< ProfilePengajar />} />
        <Route path="riwayat-transaksi" element={< RiwayatTransaksi />} />
        <Route path="detail-kelas/:id_course" element={<DetailKelas />} />
    
      
        {/* Tambahkan rute halaman pengajar lain di sini */}
      </Route>
    </Routes>
  );
};

export default PengajarRoutes;
