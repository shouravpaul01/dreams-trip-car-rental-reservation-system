import { useEffect } from "react";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import { NavLink, useSearchParams } from "react-router-dom";
import { FaRegCircleCheck, FaUserLarge, FaXmark } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import ProfileInfo from "./ProfileInfo";
import MyBookings from "./MyBookings";
import { ChangePassword } from "../../auth/ChangePassword";
import { MdOutlinePassword } from "react-icons/md";

const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const paymentSuccessParam = searchParams.get("payment");
  useEffect(() => {
    if (!tab) {
      setSearchParams({ tab: "profile" });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div>
      <Breadcrumbs title="My Dasboard" />
      <div className="py-16 my-container relative">
        {paymentSuccessParam == "success" && (
          <div
            role="alert"
            className="alert alert-success rounded-lg font-bold"
          >
            <FaRegCircleCheck className="text-xl" />
            <span>Payment Sucessful</span>
            <button
              className="btn btn-sm btn-circle "
              onClick={() => {
                searchParams.delete("payment"), setSearchParams(searchParams);
              }}
            >
              <FaXmark />
            </button>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-8 mt-8 ">
          <div className="w-full md:w-[25%]  space-y-5 ">
            <ul className="main-menu gap-1 bg-green-100 p-4 rounded-lg sticky top-20">
              <li>
                <NavLink
                  to={"/dashboard?tab=profile"}
                  className={`${
                    tab == "profile" ? "menu-item-active" : "menu-item"
                  }`}
                >
                  <FaUserLarge /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard?tab=my-bookings"}
                  className={`${
                    tab == "my-bookings" ? "menu-item-active" : "menu-item"
                  }`}
                >
                  <TbBrandBooking /> My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard?tab=change-password"}
                  className={`${
                    tab == "change-password" ? "menu-item-active" : "menu-item"
                  }`}
                >
                  <MdOutlinePassword /> Change Password
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-[75%]">
            <div className=" bg-green-100 gap-2 py-3 px-4 rounded-lg">
              <p className="font-Spicy_Rice text-black text-xl ">
                {tab == "profile" && "Profile"}
                {tab == "my-bookings" && "My Bookings"}
                {tab == "change-password" && "Change Password"}
              </p>
            </div>
            {tab == "profile" && <ProfileInfo />}
            {tab == "my-bookings" && <MyBookings />}
            {tab == "change-password" && <ChangePassword />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
