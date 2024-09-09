import {
  FaArrowRightLong,
  FaCalendarDays,
  FaLocationDot,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Controller, useForm } from "react-hook-form";

const HeroSection = () => {
  const { control } = useForm({});
  return (
    <div className=" bg-slate-100  md:h-[650px] relative -mt-16">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dcrui4h7s/image/upload/v1725826388/dreams-trip-car-rental-reservation-system/ytn22rn1uisbbcvjzb1b.png')] bg-cover opacity-10"></div>

      {/* Overlay Image */}
      <div className="absolute top-[5%] md:top-[10%] left-[5%] md:left-[50%] ">
        <img
          src="https://res.cloudinary.com/dcrui4h7s/image/upload/v1725828754/dreams-trip-car-rental-reservation-system/c4z9sy2svhxdjfepybvr.png"
          alt="Logo"
          className="w-[150px] md:w-[200px]"
        />
      </div>

      {/* Content */}
      <div className="my-container h-full flex items-center  flex-col-reverse md:flex-row gap-4 md:gap-14 pt-32 md:pt-0 z-10">
        {/* Text Section */}
        <div className="w-full md:w-[50%] flex items-center z-10">
          <div className="space-y-2 text-center md:text-left">
            <p className="bg-green-100 p-4 rounded-full text-xl font-bold shadow-md">
              Trusted car rental platform in Bangladesh 100%
            </p>
            <div className="ms-2 space-y-2">
              <p className="font-Spicy_Rice text-4xl">Find Your Best</p>
              <p className="font-Spicy_Rice text-4xl">
                Dream Car for Dream Trip
              </p>
              <p className="text-base text-balance">
                Experience the ultimate in comfort, performance, and
                sophistication with our luxury car rentals. From sleek sedans
                and stylish coupes to spacious SUVs and elegant convertibles, we
                offer a range of premium vehicles to suit your preferences and
                lifestyle.
              </p>
            </div>
            <button className="btn btn-sm btn-success rounded-full px-8">
              <FaArrowRightLong className="animate-bounceLR me-3" /> Book Now
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-[50%] z-10">
          <img
            src="https://res.cloudinary.com/dcrui4h7s/image/upload/v1725394535/dreams-trip-car-rental-reservation-system/bdps6lbobe3klgnwoa8c.png"
            alt="Car"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="md:absolute md:-bottom-8 md:left-0 md:right-0 w-full py-8 md:py-0">
        <div className="my-container flex flex-col items-center justify-center gap-2 px-4">
          <form className="flex flex-col md:flex-row md:items-center gap-4 bg-green-100 outline-dashed outline-2 outline-success outline-offset-4 px-4 md:px-6 py-6 rounded-lg z-40 w-full max-w-[90%] ">
            {/* Pickup Date */}
            <div className="form-control w-full md:w-[30%]">
              <span className="label-text font-semibold">Pickup Date</span>
              <label className="input input-bordered rounded-lg flex items-center gap-2">
                <Controller
                  name="pickupDate"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Flatpickr
                      {...field}
                      className="grow"
                      placeholder="Select date"
                      options={{ dateFormat: "Y-m-d" }}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
                <FaCalendarDays className="text-gray-500" />
              </label>
            </div>

            {/* Return Date */}
            <div className="form-control w-full md:w-[30%]">
              <span className="label-text font-semibold">Return Date</span>
              <label className="input input-bordered rounded-lg flex items-center gap-2">
                <Controller
                  name="returnDate"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Flatpickr
                      {...field}
                      className="grow"
                      placeholder="Select date"
                      options={{ dateFormat: "Y-m-d" }}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
                <FaCalendarDays className="text-gray-500" />
              </label>
            </div>

            {/* Pickup Location */}
            <div className="form-control w-full md:w-[30%]">
              <span className="label-text font-semibold">Pickup Location</span>
              <label className="input input-bordered rounded-lg flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter location"
                />
                <FaLocationDot className="text-gray-500" />
              </label>
            </div>

            {/* Search Button */}
            <button className="btn btn-success rounded-full px-6 mt-0  md:mt-6 w-full md:w-auto">
              Search <FaMagnifyingGlass className="ml-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
