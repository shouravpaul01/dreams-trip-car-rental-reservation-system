import { FaArrowRight } from "react-icons/fa6";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { useGetAllCarTypeQuery } from "../../../redux/features/car-type/carTypeApi";
import { TCarType } from "../../../type/cartype.type";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

export default function CarTypeSection() {
  const { data: carTypes } = useGetAllCarTypeQuery([
    { label: "isActive", value: true },
    { label: "limit", value: 8 },
  ]);
  console.log(carTypes, "cart");
  return (
    <div className="bg-slate-100 py-9 ">
      <SectionHeader
        title="Most Popular Cartypes"
        subtitle="Most popular worldwide Car Category due to their reliability, affordability, and features."
      />

      <div className="my-container space-y-6">
        <Marquee pauseOnHover  speed={50} className="py-2">
          {carTypes?.data?.data?.map((type: TCarType, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg  mx-4 px-6 py-4 min-w-[150px] flex flex-col items-center justify-center gap-2 hover:bg-success"
            >
              <img
                src={type.icon}
                className="w-10 h-10 object-contain"
                alt={type.name}
              />
              <p className="font-semibold text-center text-sm">{type.name}</p>
            </div>
          ))}
        </Marquee>
        <div className="flex justify-center">
          <Link to={"/car-listings"} className="btn btn-outline btn-success rounded-full">
            View all <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
