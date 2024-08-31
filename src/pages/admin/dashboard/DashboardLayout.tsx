import { useState } from "react";

import { BiSolidCategory } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaCubesStacked } from "react-icons/fa6";
import Dashboard from "./DashboardLayout";
import CarType from "../car-type/CarType";

const DashboardLayout = () => {
  const [tabActive, setTabActive] = useState<string>("LayDashboardLayout");
  return (
    <div className="my-container min-h-screen">
      <div className="pt-8 ">
        <div className="join">
          <button
            className={`btn btn-outline  btn-primary rounded-s-full join-item ${tabActive =="DashboardLayout" && "btn-active"}`}
            onClick={() => setTabActive("dashboard")}
          >
           <FaHome /> Dashboard
          </button>
          <button
            className={`btn btn-outline btn-primary join-item ${tabActive =="carType" && "btn-active"}`}
            onClick={() => setTabActive("carType")}
          >
           <BiSolidCategory /> Types
          </button>
          <button
            className={`btn btn-outline btn-primary rounded-e-full join-item ${tabActive =="product" &&  "btn-active"}`}
            onClick={() => setTabActive("product")}
          >
           <FaCubesStacked /> Product
          </button>
        </div>
      </div>
      <div className="my-8">
        {tabActive=="dashboard" && <Dashboard/>}
         {tabActive=="carType" && <CarType/>}
        {/* {tabActive=="product" && <Product/>}  */}
      </div>
    </div>
  );
};

export default DashboardLayout;
