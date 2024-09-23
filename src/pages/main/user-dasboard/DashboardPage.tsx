import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import { NavLink, useSearchParams } from "react-router-dom";
import { FaRegCircleCheck, FaUserLarge, FaXmark } from "react-icons/fa6";
import { TbBrandBooking, TbPasswordUser } from "react-icons/tb";
import ProfileInfo from "./ProfileInfo";
import MyBookings from "./MyBookings";

const DashboardPage = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const tab=searchParams.get("tab") 
    const paymentSuccessParam=searchParams.get("payment")
    useEffect(() => {
        if (!tab) {
          setSearchParams({ tab: 'profile' }); 
        }
      }, [searchParams, setSearchParams]);
    
  return (
    <div>
      <Breadcrumbs title="My Dasboard" />
      <div className="py-16 my-container relative">
        {
        paymentSuccessParam=="success" && <div role="alert" className="alert alert-success rounded-lg font-bold">
          <FaRegCircleCheck className="text-xl"/>
          <span>Payment Sucessful</span>
          <button className="btn btn-sm btn-circle " onClick={()=>{searchParams.delete("payment"),setSearchParams(searchParams)}}><FaXmark />
          </button>
        </div>
        }
        <div className="flex flex-col md:flex-row gap-8 mt-8 ">
          <div className="w-full md:w-[25%]  space-y-5 ">
            <ul className="main-menu bg-green-100 p-4 rounded-lg sticky top-20">
              <li className="border-t pt-1">
                <NavLink
                  to={"/dashboard?tab=profile"}
                  className={
                    `${tab=="profile"  ? "menu-item-active" : "menu-item"}`
                  }
                >
                 <FaUserLarge /> Profile
                </NavLink>
              </li>
              <li className="border-y py-1">
                <NavLink
                     to={"/dashboard?tab=my-bookings"}
                  className={
                    `${tab=="my-bookings"  ? "menu-item-active" : "menu-item"}`
                  }
                >
                 <TbBrandBooking /> My Bookings
                </NavLink>
              </li>
              <li className="border-b pb-1">
                <NavLink
                     to={"/dashboard?tab=my-bookings"}
                  className={
                    `${tab=="change-password"  ? "menu-item-active" : "menu-item"}`
                  }
                >
                <TbPasswordUser /> Change Password
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-[75%]">
          <div className=" bg-green-100 gap-2 py-2 px-4">
          <p className="font-bold text-black ">
            {tab=="profile" && "Profile"}
            {tab=="my-bookings" && "My Bookings"}
            {tab=="change-password" && "Change Password"}
          </p>
          
        </div>
            {tab=="profile" && <ProfileInfo/>}
            {tab=="my-bookings" && <MyBookings/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
