import {
  FaArrowRightLong,
  FaCalendarDays,
  FaLocationDot,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/flatpickr.css';
import { Controller, useForm } from "react-hook-form";

const HeroSection = () => {
  const {control}=useForm({})
  return (
    <div className="relative">
      <div className=" bg-gray-200 md:h-[550px] flex items-center  ">
        <div className="my-container flex flex-col-reverse md:flex-row gap-8 md:gap-14">
          <div className="w-full md:w-[1/2] flex items-center">
            <div className="space-y-2 text-center md:text-left">
              <p className="bg-yellow-100 p-4 rounded-full text-xl font-bold">
                {" "}
                Trusted car rental platform in Bangladesh 100%
              </p>
              <div className="ms-2 ">
                <p className="font-Spicy_Rice text-4xl">Find Your Best</p>
                <p className="font-Spicy_Rice text-4xl">
                  Dream Car for Dream trip
                </p>
                <p className="text-base text-balance">
                  Experience the ultimate in comfort, performance, and
                  sophistication with our luxury car rentals. From sleek sedans
                  and stylish coupes to spacious SUVs and elegant convertibles,
                  we offer a range of premium vehicles to suit your preferences
                  and lifestyle.
                </p>
              </div>
              <button className="btn btn-sm btn-outline btn-success rounded-full px-8">
                <FaArrowRightLong className="animate-bounceLR me-3" /> Book Now
              </button>
            </div>
          </div>
          <div className="w-full md:w-[1/2]">
            <img
              src="https://res.cloudinary.com/dcrui4h7s/image/upload/v1725394535/dreams-trip-car-rental-reservation-system/bdps6lbobe3klgnwoa8c.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="absolute -bottom-8 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          <form className="flex items-center gap-2  bg-yellow-100 outline-dashed outline-2  outline-success outline-offset-4 px-6 py-4 rounded-full">
           
              <label className="input input-bordered rounded-full flex items-center gap-2">
                <Controller
                  name="date"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Flatpickr
                      {...field}
                      className="grow"
                      placeholder="Search"
                      options={{ dateFormat: "Y-m-d" }}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
                <FaCalendarDays />
              </label>
              <label className="input input-bordered rounded-full flex items-center gap-2">
                <Controller
                  name="date"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Flatpickr
                      {...field}
                      className="grow"
                      placeholder="Search"
                      options={{ dateFormat: "Y-m-d" }}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
                <FaCalendarDays />
              </label>
              <label className="input input-bordered rounded-full flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <FaLocationDot />
              </label>
              <button className="btn btn-success rounded-full px-10">
                Search <FaMagnifyingGlass />
              </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
