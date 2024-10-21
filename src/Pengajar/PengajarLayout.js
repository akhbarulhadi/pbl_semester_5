import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const PengajarLayout = () => {
  return (
    <div className="flex overflow-x-auto">
        {/* Header */}
        <Header />

        {/* Konten */}
        <main className="flex-1 overflow-y-auto p-8 bg-white mt-16 lg:ml-64">
          <Outlet />
        </main>
      </div>
  );
};

export default PengajarLayout;
