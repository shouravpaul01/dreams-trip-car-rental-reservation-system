import {
  FaBars,
  FaDeleteLeft,
  FaUnlockKeyhole,
  FaUserLock,
} from "react-icons/fa6";
import dreamstrip_logo from "/dreamstrip-logo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="drawer z-50">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-success border-b-4 border-warning bg-gradient-to-b w-full h-[50px]">
          <div className="my-container">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost text-2xl"
              >
                <FaBars />
              </label>
            </div>
            <div className="mx-2 flex-1">
              <img src={dreamstrip_logo} alt="" className="w-[250px]" />
            </div>
            <div className="hidden flex-none lg:block">
              <ul className="main-menu font-semibold">
                {/* Navbar menu content here */}
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "main-menu-item-active"
                        : "main-menu-item-hover"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/d"
                    className={({ isActive }) =>
                      isActive
                        ? "main-menu-item-active"
                        : "main-menu-item-hover"
                    }
                  >
                    Booking
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about-us"
                    className={({ isActive }) =>
                      isActive
                        ? "main-menu-item-active"
                        : "main-menu-item-hover"
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signin"
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-sm btn-warning rounded-full transition"
                        : "btn btn-sm btn-outline btn-warning rounded-full transition"
                    }
                  >
                    <FaUnlockKeyhole /> Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-sm btn-warning rounded-full  transition"
                        : "btn btn-sm btn-outline btn-warning rounded-full transition"
                    }
                  >
                    <FaUserLock /> Sign Up
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
       
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className=" bg-base-200 min-h-full w-80 ">
          {/* Sidebar content here */}
          <div className="flex justify-between items-center bg-success h-[60px] py-8 px-4">
            <img src={dreamstrip_logo} alt="" className="w-[220px] " />
            <span
              className="text-3xl animate-bounce"
              onClick={() => {
                const drawer = document.getElementById("my-drawer-3");
                if (drawer) {
                  (drawer as HTMLInputElement).checked = false;
                }
              }}
            >
              <FaDeleteLeft />
            </span>
          </div>
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Header;
