import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import DashboardAdmin from "./DashboardAdmin";

const AdminRoutes = () => {
    return (
      <Routes>
        {/* Semua halaman akan dibungkus oleh AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route path="dashboard-admin" element={<DashboardAdmin />} />
          
          {/* Tambahkan rute halaman lain di sini */}
        </Route>
      </Routes>
    );
  };

export default AdminRoutes;