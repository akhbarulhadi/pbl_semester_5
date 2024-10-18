import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import DashboardAdmin from "./DashboardAdmin";
import DaftarPengajar from "./DaftarPengajar";
import RiwayatTransaksi from "./RiwayatTransaksi";
import FormPengajar from "./FormPengajar";

const AdminRoutes = () => {
    return (
      <Routes>
        {/* Semua halaman akan dibungkus oleh AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route path="dashboard-admin" element={<DashboardAdmin />} />
          <Route path="daftar-pengajar" element={<DaftarPengajar />} />
          <Route path="riwayat-transaksi" element={<RiwayatTransaksi />} />
          <Route path="form-pengajar" element={<FormPengajar />} />
          
          {/* Tambahkan rute halaman lain di sini */}
        </Route>
      </Routes>
    );
  };

export default AdminRoutes;