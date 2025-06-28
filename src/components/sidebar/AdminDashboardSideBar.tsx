import { BiSolidCategory } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaCubesStacked } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { dreamstripLogo, dreamstripLogo2 } from "../../constant";

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
         <img src={dreamstripLogo2} alt="dreamstrip logo" className="w-[170px]" />
      </div>
      <ul className="menu space-y-2 p-0 w-full">
         <li>
          <NavLink to={"/admin/dashboard"} end className={({ isActive }) => (isActive ? "menu-item-active " : "menu-item")}>
              <FaHome className="text-xl me-1"/>
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
            <BiSolidCategory className="text-xl  me-1"/>
            Manage Types
          </NavLink>
        </li>
         <li>
          <NavLink to={"/admin/dashboard/manage-prices"} className={({ isActive }) => (isActive ? "menu-item-active " : "menu-item")}>
            <BiSolidCategory className="text-xl  me-1"/>
            Manage Prices
          </NavLink>
        </li>
        <li>
          <NavLink to={"/admin/dashboard/manage-cars"} className={({ isActive }) => (isActive ? "menu-item-active " : "menu-item")}>
            <FaCubesStacked className="text-xl  me-1"/>
            Manage Cars
          </NavLink>
        </li>

       
      </ul>
    </div>
  );
}
