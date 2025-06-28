import { Outlet } from "react-router-dom";

import { useState } from "react";
import AdminDashboardSideBar from "../sidebar/AdminDashboardSideBar";
import AdminDashboardNavbar from "../header/AdminDashboardNavbar";


export default function AdminDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  console.log(sidebarOpen, "sss");
  return (
    
    <div className={`drawer lg:drawer-open `}>
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="drawer-content flex flex-col ">
        {/* Page content here */}
        <AdminDashboardNavbar toggleSidebar={toggleSidebar} />

        <main className="p-3.5 md:px-8">
          <Outlet />
        </main>
      </div>
      <div className={`drawer-side  z-40`}>
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
       <AdminDashboardSideBar sidebarOpen={sidebarOpen}/>
      </div>
    </div>
  );
}
