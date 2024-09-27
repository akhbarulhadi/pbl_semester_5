import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Komponen PrivateRoute untuk proteksi rute berdasarkan role pengguna
const PrivateRoute = ({ element: Component, allowedRoles, ...rest }) => {
  // Simulasi role login pengguna
  const currentUser = {
    role: null, // 'pengguna', 'admin', 'pengajar' atau null jika belum login
  };

  // Periksa apakah pengguna memiliki role yang diizinkan
  const hasAccess = currentUser.role && allowedRoles.includes(currentUser.role);

  return hasAccess ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
