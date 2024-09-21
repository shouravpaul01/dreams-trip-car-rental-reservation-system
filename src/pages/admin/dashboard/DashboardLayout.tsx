import { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaCubesStacked } from "react-icons/fa6";
import CarType from "../car-type/CarType";
import Car from "../car/Car";
import PricePage from "../price/PricePage";
import DashboardPage from "./DashboardPage";
import BookingPage from "../booking/BookingPage";
import { NavLink, useSearchParams } from "react-router-dom";


const DashboardLayout = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const tab=searchParams.get("tab") 
 
  useEffect(() => {
      if (!tab) {
        setSearchParams({ tab: 'home' }); 
      }
    }, [searchParams, setSearchParams]);
  return (
    <div className="my-container min-h-screen">
      <div className="pt-8 ">
        <div className="join flex-wrap  gap-2 md:gap-0 justify-center ">
          <NavLink to={"?tab=home"}
            className={`btn btn-sm md:btn-md btn-outline  btn-success rounded-none md:rounded-s-full join-item ${tab =="home" && "btn-active"}`}
            
          >
           <FaHome /> Dashboard
          </NavLink >
        
          <NavLink to={"?tab=manage-types"}
            className={`btn btn-sm md:btn-md btn-outline btn-success join-item ${tab =="manage-types" && "btn-active"}`}
            
          >
           <BiSolidCategory />Manage Types
          </NavLink >
          <NavLink to={"?tab=manage-prices"}
            className={`btn btn-sm md:btn-md btn-outline btn-success join-item ${tab =="manage-prices" && "btn-active"}`}
            
          >
           <BiSolidCategory />Manage Prices
          </NavLink >
          <NavLink to={"?tab=manage-cars"}
            className={`btn btn-sm md:btn-md btn-outline btn-success  join-item ${tab =="manage-cars" &&  "btn-active"}`}
            
          >
           <FaCubesStacked />Manage cars
          </NavLink >
          <NavLink to={"?tab=manage-bookings"}
            className={`btn btn-sm md:btn-md btn-outline btn-success rounded-none md:rounded-e-full join-item ${tab =="manage-bookings" &&  "btn-active"}`}
            
          >
           <FaCubesStacked />Manage Bookings
          </NavLink >
        </div>
      </div>
      <div className="my-8">
        {tab=="home" && <DashboardPage/>}
         {tab=="manage-types" && <CarType/>}
         {tab=="manage-prices" && <PricePage/>}
        {tab=="manage-cars" && <Car/>} 
        {tab=="manage-bookings" && <BookingPage/>} 

      </div>
    </div>
  );
};

export default DashboardLayout;
