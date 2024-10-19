import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import Header from "./Header";

function LayoutSidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex overflow-x-auto">
      {/* Sidebar */}
      <SidebarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Header */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Konten */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-100 mt-16 lg:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default LayoutSidebar;
