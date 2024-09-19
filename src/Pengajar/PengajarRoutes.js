import { Routes, Route } from "react-router-dom";
import PengajarLayout from "./PengajarLayout";
import DashboardPengajar from "./DashboardPengajar";
import FormIncome from "./FormIncome";
import FormKelas from "./FormKelas";

const PengajarRoutes = () => {
  return (
    <Routes>
      {/* Semua halaman pengajar akan dibungkus oleh PengajarLayout */}
      <Route element={<PengajarLayout />}>
        <Route path="dashboard-pengajar" element={<DashboardPengajar />} />
        <Route path="form-kelas" element={<FormKelas />} />
        <Route path="form-income" element={< FormIncome />} />

        {/* Tambahkan rute halaman pengajar lain di sini */}
      </Route>
    </Routes>
  );
};

export default PengajarRoutes;
