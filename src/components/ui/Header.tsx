import {
  FaArrowRightFromBracket,
  FaBars,
  FaDeleteLeft,
  FaHouseLock,
  FaUnlockKeyhole,
  FaUserLock,
} from "react-icons/fa6";
import dreamstrip_logo from "/dreamstrip-logo.png";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { MdAccountCircle } from "react-icons/md";
import { logout } from "../../redux/features/auth/authSlice";

const Header = ({ isScroll }: { isScroll: number }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div className="drawer z-50">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div
          className={`navbar w-full h-[50px] transition-all duration-300 ${
            isScroll > 70
              ? "fixed top-0 bg-white border-b border-success shadow-lg"
              : ""
          }`}
        >
          <div className="my-container ">
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
              <ul className="nav-menu font-semibold">
                {/* Navbar menu content here */}
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "nav-item-active" : "nav-item-hover"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/car-listings"
                    className={({ isActive }) =>
                      isActive ? "nav-item-active" : "nav-item-hover"
                    }
                  >
                    Booking
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive ? "nav-item-active" : "nav-item-hover"
                    }
                  >
                    About
                  </NavLink>
                </li>
                {user ? (
                  <li>
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-circle btn-outline btn-success"
                      >
                        <MdAccountCircle className="text-4xl" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content main-menu bg-base-100 rounded-box z-[1] w-60 p-2 shadow"
                      >
                        <li >
                         {
                          user.role=="admin"? <NavLink
                          to={"/admin-dashboard"}
                          className={({ isActive }) =>
                            isActive ? "menu-item-active" : "menu-item"
                          }
                        >
                          <FaHouseLock /> Admin Dashboard
                        </NavLink>: <NavLink
                            to={"/dashboard"}
                            className={({ isActive }) =>
                              isActive ? "menu-item-active" : "menu-item"
                            }
                          >
                            <FaHouseLock />Dashboard
                          </NavLink>
                         }
                        </li>
                        <li className="">
                          <button
                            className="menu-item"
                            onClick={() => dispatch(logout())}
                          >
                            <FaArrowRightFromBracket />
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/signin"
                        className={({ isActive }) =>
                          isActive
                            ? "btn btn-sm btn-success rounded-full transition"
                            : "btn btn-sm btn-outline btn-success rounded-full transition"
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
                            ? "btn btn-sm btn-success rounded-full  transition"
                            : "btn btn-sm btn-outline btn-success rounded-full transition"
                        }
                      >
                        <FaUserLock /> Sign Up
                      </NavLink>
                    </li>
                  </>
                )}
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
