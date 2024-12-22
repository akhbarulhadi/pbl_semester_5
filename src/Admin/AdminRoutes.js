import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import DashboardAdmin from "./DashboardAdmin";
import DaftarPengajar from "./DaftarPengajar";
import RiwayatTransaksi from "./RiwayatTransaksi";
import FormPengajar from "./FormPengajar";
import ListPeserta from "./ListPeserta";
import PengajuanKelas from "./PengajuanKelas"
import DetailKelas from "Admin/DetailKelas";
import PengajuanPenarikan from "./PengajuanPenarikan"
import Kelas from "./Kelas";

const AdminRoutes = () => {
    return (
      <Routes>
        {/* Semua halaman akan dibungkus oleh AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route path="dashboard-admin" element={<DashboardAdmin />} />
          <Route path="daftar-pengajar" element={<DaftarPengajar />} />
          <Route path="riwayat-transaksi" element={<RiwayatTransaksi />} />
          <Route path="form-pengajar" element={<FormPengajar />} />
          <Route path="list-peserta" element={<ListPeserta />} />
          <Route path="pengajuan-kelas" element={<PengajuanKelas />} />
          <Route path="detail-kelas/:id_course" element={<DetailKelas />} />
          <Route path="pengajuan-penarikan" element={<PengajuanPenarikan />} />
          <Route path="kelas" element={<Kelas />} />
          
          {/* Tambahkan rute halaman lain di sini */}
        </Route>
      </Routes>
    );
  };

export default AdminRoutes;