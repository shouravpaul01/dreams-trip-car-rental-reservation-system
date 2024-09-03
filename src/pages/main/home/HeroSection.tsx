import { FaArrowRightLong } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <div className="bg-[url('https://res.cloudinary.com/dcrui4h7s/image/upload/v1725397304/dreams-trip-car-rental-reservation-system/eezquoanpct3sczcw9u2.png')] bg-cover bg-center bg-gray-200 md:h-[550px]  flex items-center py-10 md:py-0 absolute top-0 left-0 right-0">
      <div className="my-container flex flex-col-reverse md:flex-row gap-8 md:gap-14">
        <div className="w-full md:w-[1/2] flex items-center">
          <div className="space-y-2 text-center md:text-left">
            <p className="bg-yellow-100 p-4 rounded-full text-xl font-bold">
              {" "}
              Trusted car rental platform in Bangladesh 100%
            </p>
            <div className="ms-2 ">
            <p className="font-Spicy_Rice text-4xl">Find Your Best</p>
            <p className="font-Spicy_Rice text-4xl">Dream Car for Dream trip</p>
            <p className="text-base text-balance">
              Experience the ultimate in comfort, performance, and
              sophistication with our luxury car rentals. From sleek sedans and
              stylish coupes to spacious SUVs and elegant convertibles, we offer
              a range of premium vehicles to suit your preferences and
              lifestyle.
            </p>
            </div>
            <button className="btn btn-sm btn-outline btn-success rounded-full px-8"><FaArrowRightLong className="animate-bounceLR me-3"/> Book Now</button>
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
  );
};

export default HeroSection;
