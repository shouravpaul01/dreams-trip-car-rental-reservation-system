
import { HiOutlineBars3 } from "react-icons/hi2";

export default function AdminDashboardNavbar({toggleSidebar}:{toggleSidebar:()=>void}) {
  return (
    <div className="navbar sticky top-0  bg-base-100 shadow-sm px-3.5 md:px-8 z-30">
      <div className="navbar-start">
       <div className="flex items-center gap-2">
        <label htmlFor="my-drawer-2" className="link ">
      <HiOutlineBars3  className="size-5"/>
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
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
        </div>
    </div>
  );
}
