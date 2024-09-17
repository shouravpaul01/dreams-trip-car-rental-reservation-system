import { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaCubesStacked } from "react-icons/fa6";
import CarType from "../car-type/CarType";
import Car from "../car/Car";
import PricePage from "../price/PricePage";
import DashboardPage from "./DashboardPage";


const DashboardLayout = () => {
  const [tabActive, setTabActive] = useState<string>("dashboard");
  return (
    <div className="my-container min-h-screen">
      <div className="pt-8 ">
        <div className="join flex-wrap  gap-2 md:gap-0 justify-center ">
          <button
            className={`btn btn-sm md:btn-md btn-outline  btn-success rounded-none md:rounded-s-full join-item ${tabActive =="dashboard" && "btn-active"}`}
            onClick={() => setTabActive("dashboard")}
          >
           <FaHome /> Dashboard
          </button>
        
          <button
            className={`btn btn-sm md:btn-md btn-outline btn-success join-item ${tabActive =="carType" && "btn-active"}`}
            onClick={() => setTabActive("carType")}
          >
           <BiSolidCategory />Manage Types
          </button>
          <button
            className={`btn btn-sm md:btn-md btn-outline btn-success join-item ${tabActive =="prices" && "btn-active"}`}
            onClick={() => setTabActive("prices")}
          >
           <BiSolidCategory />Manage Prices
          </button>
          <button
            className={`btn btn-sm md:btn-md btn-outline btn-success rounded-none md:rounded-e-full join-item ${tabActive =="cars" &&  "btn-active"}`}
            onClick={() => setTabActive("cars")}
          >
           <FaCubesStacked />Manage cars
          </button>
        </div>
      </div>
      <div className="my-8">
        {tabActive=="dashboard" && <DashboardPage/>}
         {tabActive=="carType" && <CarType/>}
         {tabActive=="prices" && <PricePage/>}
        {tabActive=="cars" && <Car/>} 


      </div>
    </div>
  );
};

export default DashboardLayout;
