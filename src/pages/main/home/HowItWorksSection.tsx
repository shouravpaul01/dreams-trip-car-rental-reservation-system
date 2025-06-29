import { FaCalendarAlt, FaCarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { motion } from "framer-motion";

const HowItWorksSection = () => {
  return (
    <div className="my-container pt-10 pb-20">
      <SectionHeader
        title="How It Works?"
        subtitle="Follow these simple steps to get started"
        
      />
      <div className="relative">
        <div className="hidden md:block border border-success border-dashed  absolute top-[28%] left-[110px] right-[110px]  "></div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="flex flex-col items-center text-center z-10">
            <div className="bg-slate-100 rounded-full p-6 mb-6 relative hover:animate-bounce">
              <motion.div
                className="bg-pink-200 size-24 rounded-full outline-2 outline-dashed outline-pink-800 outline-offset-8"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <FaCalendarAlt className="text-6xl text-pink-700 absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />
            </div>
            <h3 className="font-Spicy_Rice  text-2xl text-gray-600  mb-2">
              1. Choose Date & Locations
            </h3>
            <p className="text-gray-600">
              Select the date and location that suits you best.
            </p>
          </div>
          <div className="flex flex-col items-center text-center z-10">
            <div className="bg-slate-100 rounded-full p-6 mb-6 relative hover:animate-bounce">
              <motion.div
                className="bg-green-200 size-24  rounded-full outline-2 outline-dashed outline-green-800 outline-offset-8"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <FaMapMarkerAlt className="text-6xl text-green-700 absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />

            </div>

            <h3 className="font-Spicy_Rice text-2xl text-gray-600 font-thin mb-2">2. Pick-Up Locations</h3>
            <p className="text-gray-600">
              Choose from multiple convenient pick-up locations.
            </p>
          </div>

          <div className="flex flex-col items-center text-center z-10 ">
            <div className="bg-slate-100 rounded-full p-6 mb-6 relative hover:animate-bounce">
               <motion.div
                className="bg-violet-200 size-24  rounded-full outline-2 outline-dashed outline-violet-800 outline-offset-8 "
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <FaCarAlt className="text-6xl text-purple-700 absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />

            </div>
            <h3 className="font-Spicy_Rice text-2xl text-gray-600 mb-2">3. Book your Car</h3>
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
