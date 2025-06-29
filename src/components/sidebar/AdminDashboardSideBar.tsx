import { FaCubesStacked } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import {  dreamstripLogo2 } from "../../constant";
import { LuListTodo } from "react-icons/lu";
import { RiPriceTag2Line } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { GrTree } from "react-icons/gr";


export default function AdminDashboardSideBar({
  sidebarOpen,
}: {
  sidebarOpen: boolean;
}) {
  return (
    <div
      className={`bg-[#f1f5f9]  min-h-full w-64 p-5  ${
        sidebarOpen ? "flex flex-col " : "hidden"
      }`}
    >
      <div className="py-6 flex justify-center items-center">
         <Link to={"/"}>
           <img src={dreamstripLogo2} alt="dreamstrip logo" className="w-[170px]" />
         </Link>
      </div>
      <ul className="menu space-y-2 p-0 w-full">
         <li>
          <NavLink to={"/admin/dashboard"} end className={({ isActive }) => (isActive ? "menu-item-active " : "menu-item")}>
              <MdDashboard className="text-xl me-1"/>
           Dashboard
          </NavLink>
        </li>
          <li>
          <NavLink to={"/admin/dashboard/manage-users"} className={({ isActive }) => (isActive ? "menu-item-active " : "menu-item")}>
              <IoIosPeople  className="text-xl  me-1"/>
           Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink to={"/admin/dashboard/manage-types"} className={({ isActive }) => (isActive ? "menu-item-active " : "menu-item")}>
            <GrTree  className="text-xl  me-1"/>
            Manage Types
          </NavLink>
        </li>
         <li>
          <NavLink to={"/admin/dashboard/manage-prices"} className={({ isActive }) => (isActive ? "menu-item-active " : "menu-item")}>
            <RiPriceTag2Line  className="text-xl  me-1"/>
            Manage Prices
          </NavLink>
        </li>
        <li>
          <NavLink to={"/admin/dashboard/manage-cars"} className={({ isActive }) => (isActive ? "menu-item-active " : "menu-item")}>
            <FaCubesStacked className="text-xl  me-1"/>
            Manage Cars
          </NavLink>
        </li>

         <li>
          <NavLink to={"/admin/dashboard/manage-bookings"} className={({ isActive }) => (isActive ? "menu-item-active " : "menu-item")}>
            <LuListTodo  className="text-xl  me-1"/>
            Manage Bookings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
