import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useGetAllCarsQuery } from "../../../redux/features/car/carApi";
import { TCar } from "../../../type/car.type";
import CarCard from "../../../components/cards/CarCard";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import CarSkeleton from "../../../components/ui/CarSkeleton";

const FeaturedCarSection = () => {
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);
  return (
    <div className="my-container py-10">
      <div className="flex">
        <div className="flex-1 ">
          <SectionHeader
            title="Luxury Car Fleet"
            subtitle="Select car for your dream "
            containerClassName="!text-start"
          />
        </div>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-outline btn-success btn-circle ">
            <FaArrowLeft />
          </button>
          <button className="btn btn-sm btn-outline btn-success btn-circle">
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        {isLoading &&
          [...Array(8)].map((_, index) => (
           <CarSkeleton key={index} />  
          ))}
        {cars?.data?.data?.slice(0,8).map((car: TCar, index: number) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarSection;
