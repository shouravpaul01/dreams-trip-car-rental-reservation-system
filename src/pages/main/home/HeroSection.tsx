import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaCalendarDays,
  FaLocationDot,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useGetAllBannersQuery } from "../../../redux/banner/bannerAPi";
import { TBanner } from "../../../type/banner.type";



const HeroSection = () => {
  const { control } = useForm({});
  const { data: banners } = useGetAllBannersQuery([
    { label: "isActive", value: true },
  ]);
  return (
    <div className="  bg-gradient-to-b from-green-200 to-base-100 md:h-[550px] relative -mt-16">
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
      <div className="my-container h-full pt-24  relative z-10">
        <button className="custom-prev btn btn-circle btn-neutral btn-dash  hover:scale-125 absolute top-1/2 left-2 z-10   ">
          <FaArrowLeftLong />
        </button>
        <button className="custom-next btn btn-circle btn-neutral btn-dash  hover:scale-125 absolute top-1/2 right-2 z-10    ">
          <FaArrowRightLong />
        </button>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {banners?.data?.data.map((banner: TBanner, index: number) => (
            <SwiperSlide key={index}>
            

              <div className=" flex items-center  flex-col-reverse md:flex-row gap-4 md:gap-14">
                <div className="w-full md:w-[50%] text-black flex items-center z-10">
                  <div className="space-y-4 text-center md:text-left">
                    {banner?.subtitle && (
                      <p className="flex-none bg-green-100 p-4 rounded-full text-xl font-bold shadow-md">
                        {banner?.subtitle}
                      </p>
                    )}
                    <p className="font-Spicy_Rice text-4xl">{banner.title}</p>

                    <p className="text-base text-balance">
                      {banner.description}
                    </p>

                    <Link
                      to={`/car-listings/${banner?.car?._id}`}
                      className="btn btn-sm btn-success rounded-full px-8"
                    >
                      <FaArrowRightLong className="animate-bounceLR me-3" />{" "}
                      Book Now
                    </Link>
                  </div>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-[50%] z-10">
                  <img
                    src={banner?.image}
                    alt="Car"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
      {/* Form Section */}
      <div className="md:absolute md:-bottom-8 md:left-0 md:right-0 w-full py-8 md:py-0">
        <div className="my-container flex flex-col items-center justify-center gap-2 px-4">
          <form className="flex flex-col md:flex-row md:items-center gap-4 bg-green-200 outline-dashed outline-2 outline-success outline-offset-4 px-4 md:px-6 py-6 rounded-lg z-40 w-full max-w-[90%] ">
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
            <Link
              to={"/car-listings"}
              className="btn btn-success rounded-full px-6 mt-0  md:mt-6 w-full md:w-auto"
            >
              Search <FaMagnifyingGlass className="ml-2" />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
