import { Link, NavLink, useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import {
  useGetAllCarsQuery,
  useGetSingleCarQuery,
} from "../../../redux/features/car/carApi";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa6";
import { TbArmchair } from "react-icons/tb";
import { MdLuggage } from "react-icons/md";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import Loading from "../../../components/ui/Loading";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import CarCard from "../../../components/cards/CarCard";
import { TCar } from "../../../type/car.type";
import CarSkeleton from "../../../components/ui/CarSkeleton";

const CarDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCarQuery(id);
  const { data: cars, isLoading:isCarsLoading } = useGetAllCarsQuery([
    { label: "limit", value: 8 },
  ]);
  const car = data?.data;
  if (isLoading) {
    return <Loading className="h-screen" />;
  }
  return (
    <div>
      <Breadcrumbs title="details" />
      <div className="my-container pt-28">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[55%]">
            <figure className="border border-dashed rounded-xl flex items-center justify-center relative">
              <img
                src={car?.image}
                alt=""
                className="w-full h-[300px] object-cover"
              />
              <p className="badge badge-error absolute -bottom-2">
                Unavailable
              </p>
            </figure>
          </div>
          <div className="w-full md:w-[45%] bg-green-100 rounded-xl p-5 space-y-1 relative">
            <p className="bg-green-100 px-4 py-2 rounded-full font-bold shadow-md">
              Trusted car rental platform in Bangladesh 100%
            </p>
            <p className="font-bold text-xl line-clamp-2">{car?.name}</p>
            <span className="badge font-bold ">
              <FaStar className="text-yellow-500 pe-1" /> 4.5
            </span>
            <p>
              Price: <span className="font-bold">{car?.pricePerHour}</span>/hr
            </p>
            <div className="flex flex-wrap gap-2 pb-10">
              <span className="badge badge-outline badge-neutral font-semibold">
                <TbArmchair className="me-2" /> {car?.seats} Seats
              </span>
              <span className="badge badge-outline badge-neutral font-semibold">
                <MdLuggage className="me-2" /> {car?.bagCapability} Bags
              </span>
              <span className="badge badge-outline badge-neutral font-semibold">
                <BsFillFuelPumpDieselFill className="me-2" /> {car?.fuelType}{" "}
              </span>
              <span className="badge badge-outline badge-neutral font-semibold">
                <IoSettingsOutline className="me-2" /> {car?.transmission}{" "}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
              <Link
                to={`/booking/${car?._id}`}
                className={`btn btn-sm btn-success rounded-t-none w-full ${
                  !car.isAvailable && "btn-disabled"
                }`}
              >
                <FaArrowRight />
                Book Now
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <p className="font-bold text-2xl border-b border-gray-500 pb-2">Features</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {car?.features.map((feature: string, index: number) => (
                <span key={index} className="badge badge-warning">
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-2xl border-b border-gray-500 pb-2">Description</p>
            <div
              dangerouslySetInnerHTML={{ __html: car?.description || "" }}
            ></div>
          </div>
        </div>

        <div className="my-16">
          <div className="flex">
            <div className="flex-1 ">
              <SectionHeader
                title="You May be Interested in"
                containerClassName="!text-start"
              />
            </div>
            <div className="flex gap-2">
              <NavLink
                to={"/car-listings"}
                className="btn btn-sm btn-outline btn-success btn-circle "
              >
                <FaArrowLeft />
              </NavLink>
              <NavLink
                to={"/car-listings"}
                className="btn btn-sm btn-outline btn-success btn-circle"
              >
                <FaArrowRight />
              </NavLink>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              {isCarsLoading &&
                [...Array(4)].map((_, index) => <CarSkeleton key={index} />)}
              {cars?.data?.data?.slice(0, 4).map((car: TCar, index: number) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
