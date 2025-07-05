import { FaUserAlt } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { HiOutlineBars3 } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout } from "../../redux/features/auth/authSlice";
import { MdOutlinePassword } from "react-icons/md";
import { accounticon } from "../../constant";

export default function AdminDashboardNavbar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
}) {
    const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return (
    <div className="navbar sticky top-0  bg-base-100 shadow-sm px-3.5 md:px-8 z-30">
      <div className="navbar-start">
        <div className="flex items-center gap-2">
          <label  className="link " onClick={() => setSidebarOpen(!sidebarOpen)}> 
            <HiOutlineBars3 className="size-5 hover:animate-pulse" />
          </label>

          <label className="text-xl font-bold">Dashboard</label>
        </div>
      </div>

      <div className="navbar-end gap-4">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered rounded-full w-24 md:w-72"
        />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user?.image || accounticon}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm gap-1 dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                to={"/admin/dashboard/profile"}
                end
                className={({ isActive }) =>
                  isActive ? "menu-item-active " : "menu-item"
                }
              >
                <FaUserAlt className="text-xl me-1" />
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/dashboard/"}
                end
                className={({ isActive }) =>
                  isActive ? "menu-item-active " : "menu-item"
                }
              >
                <MdOutlinePassword className="text-xl me-1" />
                Change Password
              </NavLink>
            </li>
            <li >
              <button className="menu-item" onClick={() => dispatch(logout())}>
                <FaArrowRightFromBracket />
                Logout
              </button>
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  );
}
