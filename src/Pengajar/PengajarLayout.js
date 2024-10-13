import React, { useState } from "react";
import SidebarPengajar from "./SidebarPengajar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function LayoutSidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarPengajar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Header */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Konten */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-100 mt-16 lg:ml-64">
     <Outlet/>
        </main>
      </div>
    </div>
  );
}

export default LayoutSidebar;
