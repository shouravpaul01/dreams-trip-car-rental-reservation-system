import {
  FaArrowRightFromBracket,
  FaBars,
 
  FaHouseLock,
  FaUnlockKeyhole,
  FaUserLock,
} from "react-icons/fa6";

import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { MdAccountCircle, MdListAlt } from "react-icons/md";
import { logout } from "../../redux/features/auth/authSlice";
import { dreamstripLogo, dreamstripLogo2 } from "../../constant";
import { FaHome } from "react-icons/fa";

const Header = ({ isScroll }: { isScroll: number }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div className="drawer z-50">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content text-black flex flex-col ">
        {/* Navbar */}
        <div
          className={`navbar w-full h-[50px] transition-all duration-300 ${
            isScroll > 70
              ? "fixed top-0 bg-white border-b border-success shadow-lg"
              : ""
          }`}
        >
          <div className="my-container flex">
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
              <img src={dreamstripLogo} alt="" className="w-[250px]" />
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
                    Car-Listings
                  </NavLink>
                </li>
                {user &&  <li>
                  <NavLink
                    to="/dashboard?tab=my-bookings"
                    className={({ isActive }) =>
                      isActive ? "nav-item-active" : "nav-item-hover"
                    }
                  >
                    My Bookings
                  </NavLink>
                </li>}
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
                        <>
                          {user.role == "admin" ? (
                            <>
                            <li>
                              <NavLink
                                to={"/admin/dashboard"}
                                className={({ isActive }) =>
                                  isActive ? "menu-item-active" : "menu-item"
                                }
                              >
                                <FaHouseLock /> Admin Dashboard
                              </NavLink>
                              </li>
                              <li>
                              <NavLink
                                to={"/dashboard"}
                                className={({ isActive }) =>
                                  isActive ? "menu-item-active " : "menu-item"
                                }
                              >
                                <FaHouseLock />
                                Dashboard
                              </NavLink>
                              </li>
                            </>
                          ) : (
                            <li>
                            <NavLink
                              to={"/dashboard"}
                              className={({ isActive }) =>
                                isActive ? "menu-item-active" : "menu-item"
                              }
                            >
                              <FaHouseLock />
                              Dashboard
                            </NavLink>
                            </li>
                          )}
                       
                        </>
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

        <div className=" bg-[#f1f5f9] min-h-full w-80 p-5 ">
          {/* Sidebar content here */}
          <div className="flex justify-between items-center   py-8 px-4">
            <img src={dreamstripLogo2} alt="" className="w-[220px] " />
          </div>
          <ul className="menu space-y-2 p-0 w-full">
            <li>
              <NavLink
                to={"/"}
                end
                className={({ isActive }) =>
                  isActive ? "menu-item-active " : "menu-item"
                }
              >
                <FaHome className="text-xl me-1" />
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/car-listings"}
                end
                className={({ isActive }) =>
                  isActive ? "menu-item-active " : "menu-item"
                }
              >
                <MdListAlt className="text-xl me-1" />
                Car Listings
              </NavLink>
            </li>
            {user ? (
              <>
                <li>
                  {user.role == "admin" ? (
                    <>
                      <NavLink
                        to={"/admin/dashboard"}
                        className={({ isActive }) =>
                          isActive ? "menu-item-active" : "menu-item"
                        }
                      >
                        <FaHouseLock className="text-xl me-1" /> Admin Dashboard
                      </NavLink>{" "}
                      <NavLink
                        to={"/dashboard"}
                        className={({ isActive }) =>
                          isActive ? "menu-item-active " : "menu-item"
                        }
                      >
                        <FaHouseLock className="text-xl me-1" />
                        Dashboard
                      </NavLink>
                    </>
                  ) : (
                    <NavLink
                      to={"/dashboard"}
                      className={({ isActive }) =>
                        isActive ? "menu-item-active " : "menu-item"
                      }
                    >
                      <FaHouseLock className="text-xl me-1" />
                      Dashboard
                    </NavLink>
                  )}
                </li>
                <li>
                  <button
                    className="menu-item"
                    onClick={() => dispatch(logout())}
                  >
                    <FaArrowRightFromBracket className="text-xl me-1" />
                    Logout
                  </button>
                </li>
              </>
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
  );
};

export default Header;
