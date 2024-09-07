import React from "react";
import { FaCalendarAlt, FaCarAlt, FaMapMarkerAlt } from "react-icons/fa";

const HowItWorksSection = () => {
  return (
    <div className="my-container my-12">
      <h2 className="text-4xl font-bold font-Spicy_Rice text-center ">How It Works?</h2>
      <p className="text-lg text-center text-gray-600 mb-8">
    Follow these simple steps to get started
  </p>
      <div className="relative">
      <div className='hidden md:block border border-success border-dashed  absolute top-[28%] left-[110px] right-[110px]  '></div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <div className="flex flex-col items-center text-center z-10">
        <div className="bg-slate-100 rounded-full p-6 mb-6">
          <p className="bg-accent p-6 rounded-full outline-2 outline-dashed outline-success outline-offset-8 ">
            <FaCalendarAlt className="text-6xl text-yellow-500 " />
          </p>
          </div>
          <h3 className="text-2xl font-bold mb-2">
           1. Choose Date & Locations
          </h3>
          <p className="text-gray-600">
            Select the date and location that suits you best.
          </p>
        </div>
        <div className="flex flex-col items-center text-center z-10">
          <div className="bg-slate-100 rounded-full p-6 mb-6">
          <p className="bg-teal-950 p-6 rounded-full outline-2 outline-dashed outline-success outline-offset-8 ">
            <FaMapMarkerAlt className="text-6xl text-yellow-500 " />
          </p>
          </div>

          <h3 className="text-2xl font-bold mb-2">2. Pick-Up Locations</h3>
          <p className="text-gray-600">
            Choose from multiple convenient pick-up locations.
          </p>
        </div>
       
        <div className="flex flex-col items-center text-center z-10">
        <div className="bg-slate-100 rounded-full p-6 mb-6">
          <p className="bg-teal-500 p-6 rounded-full outline-2 outline-dashed outline-success outline-offset-8 ">
            <FaCarAlt className="text-6xl text-yellow-500 " />
          </p>
          </div>
          <h3 className="text-2xl font-bold mb-2">3. Book your Car</h3>
          <p className="text-gray-600">
            Complete the booking and enjoy your ride.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
