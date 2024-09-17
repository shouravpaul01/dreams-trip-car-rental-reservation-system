import React from "react";
import { useGetAllCarsQuery } from "../../../redux/features/car/carApi";
import { FaCubesStacked } from "react-icons/fa6";

const DashboardPage = () => {
  const { data: cars, isLoading: isCarsLoading } =
    useGetAllCarsQuery(undefined);
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="flex bg-purple-300 p-4 rounded-xl">
        <p className="text-3xl flex items-center grow">
          <FaCubesStacked />
        </p>
        <div className="text-xl font-bold">
          <p>Total Cars</p>
          <p className="text-right"> {cars?.data?.data?.length}</p>
        </div>
      </div>
      <div className="flex bg-pink-300 p-4 rounded-xl">
        <p className="text-3xl flex items-center grow">
          <FaCubesStacked />
        </p>
        <div className="text-xl font-bold">
          <p>Total Bookings</p>
          <p className="text-right"> {cars?.data?.data?.length}</p>
        </div>
      </div>
      <div className="flex bg-purple-300 p-4 rounded-xl">
        <p className="text-3xl flex items-center grow">
          <FaCubesStacked />
        </p>
        <div className="text-xl font-bold">
          <p>Total Cars</p>
          <p className="text-right"> {cars?.data?.data?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
