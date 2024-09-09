import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa6";
import { useGetAllCarsQuery } from "../../../redux/features/car/carApi";
import { TCar } from "../../../redux/features/car-type/car.type";
import CarCard from "../../../components/cards/CarCard";

const FeaturedCarSection = () => {
  const { data: cars } = useGetAllCarsQuery(undefined);
  return (
    <div className="my-container py-10">
      <div className="flex">
        <div className="flex-1">
          <p className="font-Spicy_Rice text-3xl">Luxury Car Fleet</p>
          <p className="text-lg  text-gray-600">
            Select car for your dream trip
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-outline btn-success btn-circle">
            <FaArrowLeft />
          </button>
          <button className="btn btn-sm btn-outline btn-success btn-circle">
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        {cars?.data?.data.map((car: TCar, index: number) => (
          <CarCard key={index} car={car}/>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarSection;
