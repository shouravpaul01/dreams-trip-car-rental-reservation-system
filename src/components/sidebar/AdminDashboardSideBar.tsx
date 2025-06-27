import { BiSolidCategory } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaCubesStacked } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function AdminDashboardSideBar({
  sidebarOpen,
}: {
  sidebarOpen: boolean;
}) {
  return (
    <div
      className={`bg-deepgreen text-white min-h-full w-64 p-4  ${
        sidebarOpen ? "flex" : "hidden"
      }`}
    >
      <ul className="menu w-full">
         <li>
          <NavLink to={"/admin/dashboard"}>
              <FaHome />
           Dashboard
          </NavLink>
        </li>
          <li>
          <NavLink to={"/admin/dashboard/manage-users"}>
              <IoIosPeople  />
           Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink to={"/admin/dashboard/manage-category"}>
            <BiSolidCategory />
            Manage Category
          </NavLink>
        </li>
        <li>
          <NavLink to={"/admin/dashboard/manage-products"}>
            <FaCubesStacked />
            Manage Products
          </NavLink>
        </li>

       
      </ul>
    </div>
  );
}
