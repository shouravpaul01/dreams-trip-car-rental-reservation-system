import { FaArrowRight, FaInfo, FaStar } from "react-icons/fa6";
import { TCar } from "../../type/car.type";
import { Link } from "react-router-dom";
import { TbArmchair } from "react-icons/tb";
import { MdLuggage } from "react-icons/md";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

const CarCard = ({ car }: { car: TCar }) => {
  return (
    <div className="card bg-base-100 border hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out p-3 rounded-lg relative overflow-hidden">
      <figure className="overflow-hidden ">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-[250px] object-cover hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </figure>

      <div className="border-t relative">
        <p className="badge font-bold absolute -top-[10px] right-2">
          <FaStar className="text-xl text-warning pe-2" /> 4.5
        </p>
      </div>

      <div className="card-body p-3">
        <h2 className="card-title text-lg font-semibold line-clamp-2">
          {car.name}
        </h2>

       <div className="flex flex-wrap gap-2">
        <span className="badge badge-outline badge-neutral font-semibold"><TbArmchair className="me-2" /> {car.seats} Seats</span>
        <span className="badge badge-outline badge-neutral font-semibold"><MdLuggage className="me-2" /> {car.bagCapability} Bags</span>
        <span className="badge badge-outline badge-neutral font-semibold"><BsFillFuelPumpDieselFill className="me-2" /> {car.fuelType} </span>
        <span className="badge badge-outline badge-neutral font-semibold"><IoSettingsOutline className="me-2" /> {car.transmission} </span>
       
       </div>

        <div className="card-actions justify-end items-center mt-4 space-x-2">
          <p className="text-gray-700">
            Price:{" "}
            <span className="font-bold text-black">{car.pricePerHour} /hr</span>
          </p>
          <div className="flex items-center gap-2">
            <Link
              to={`/car-listings/${car._id}`}
              className="btn btn-sm btn-circle btn-success hover:scale-105 transition-transform duration-300"
            >
              <FaInfo />
            </Link>
            <Link
              to={`/booking/${car._id}`}
              className="btn btn-sm btn-success rounded-full flex items-center gap-2 hover:scale-105 transition-transform duration-300"
            >
              <FaArrowRight /> Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="absolute inset-0 bg-gradient-to-t from-black opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-lg pointer-events-none"></div> */}
    </div>
  );
};

export default CarCard;
