import { useState } from "react";

import { BiSolidCategory } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaCubesStacked } from "react-icons/fa6";
import Dashboard from "./DashboardLayout";
import CarType from "../car-type/CarType";
import Car from "../car/Car";


const DashboardLayout = () => {
  const [tabActive, setTabActive] = useState<string>("LayDashboardLayout");
  return (
    <div className="my-container min-h-screen">
      <div className="pt-8 ">
        <div className="join">
          <button
            className={`btn btn-outline  btn-success rounded-s-full join-item ${tabActive =="DashboardLayout" && "btn-active"}`}
            onClick={() => setTabActive("dashboard")}
          >
           <FaHome /> Dashboard
          </button>
        
          <button
            className={`btn btn-outline btn-success join-item ${tabActive =="carType" && "btn-active"}`}
            onClick={() => setTabActive("carType")}
          >
           <BiSolidCategory />Manage Types
          </button>
          
          <button
            className={`btn btn-outline btn-success rounded-e-full join-item ${tabActive =="cars" &&  "btn-active"}`}
            onClick={() => setTabActive("cars")}
          >
           <FaCubesStacked />Manage cars
          </button>
        </div>
      </div>
      <div className="my-8">
        {tabActive=="dashboard" && <Dashboard/>}
         {tabActive=="carType" && <CarType/>}
        {tabActive=="cars" && <Car/>} 


      </div>
    </div>
  );
};

export default DashboardLayout;
