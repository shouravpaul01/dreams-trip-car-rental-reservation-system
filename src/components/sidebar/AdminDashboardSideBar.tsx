import { NavLink, Link } from "react-router-dom";
import { dreamstripLogo2 } from "../../constant";
import { MdDashboard } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { GrTree } from "react-icons/gr";
import { RiPriceTag2Line } from "react-icons/ri";
import { FaCubesStacked } from "react-icons/fa6";
import { LuListTodo } from "react-icons/lu";

export const adminSidebarLinks = [
  {
    label: "Dashboard",
    icon: <MdDashboard className="text-xl me-1" />,
    path: "/admin/dashboard",
    exact: true,
  },
  {
    label: "Manage Users",
    icon: <IoIosPeople className="text-xl me-1" />,
    path: "/admin/dashboard/manage-users",
  },
  {
    label: "Manage Banner",
    icon: <MdDashboard className="text-xl me-1" />,
    path: "/admin/dashboard/manage-banner",
    exact: true,
  },
  {
    label: "Manage Types",
    icon: <GrTree className="text-xl me-1" />,
    path: "/admin/dashboard/manage-types",
  },
  {
    label: "Manage Prices",
    icon: <RiPriceTag2Line className="text-xl me-1" />,
    path: "/admin/dashboard/manage-prices",
  },
  {
    label: "Manage Cars",
    icon: <FaCubesStacked className="text-xl me-1" />,
    path: "/admin/dashboard/manage-cars",
  },
  {
    label: "Manage Bookings",
    icon: <LuListTodo className="text-xl me-1" />,
    path: "/admin/dashboard/manage-bookings",
  },
];

export default function AdminDashboardSideBar() {
  return (
    <div
     className="p-5"
    >
      <div className="py-6 flex justify-center items-center">
        <Link to={"/"}>
          <img
            src={dreamstripLogo2}
            alt="dreamstrip logo"
            className="w-[170px]"
          />
        </Link>
      </div>

      <ul className="menu space-y-2 p-0 w-full">
        {adminSidebarLinks.map(({ label, icon, path, exact }) => (
          <li key={label}>
            <NavLink
              to={path}
              end={exact}
              className={({ isActive }) =>
                isActive ? "menu-item-active" : "menu-item"
              }
            >
              {icon}
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
