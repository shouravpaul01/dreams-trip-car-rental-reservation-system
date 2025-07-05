import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardSideBar from "../sidebar/AdminDashboardSideBar";
import AdminDashboardNavbar from "../header/AdminDashboardNavbar";

export default function AdminDashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    setIsSidebarOpen(!isMobile); 
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-base-100 ">
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 inset-y-0 left-0 bg-base-100 shadow-md transition-all duration-300 ease-in-out
          w-64 transform
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full hidden"}
          lg:translate-x-0 lg:static
        `}
      >
        <AdminDashboardSideBar  />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminDashboardNavbar
          sidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
