import { useState } from "react";
import CarCard from "../../../components/cards/CarCard";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import Pagination from "../../../components/ui/Pagination";
import { sortByOptions } from "../../../constant";
import { TCar } from "../../../redux/features/car-type/car.type";
import { useGetAllCarsQuery } from "../../../redux/features/car/carApi";
import Loading from "../../../components/ui/Loading";

const CarListingPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: cars,isLoading:isCarsLoading } = useGetAllCarsQuery(undefined);

  if (isCarsLoading) {
    return <Loading className="h-screen"/>
  }

  return (
    <div>
      <Breadcrumbs title="Car Listings" />
      <div className="py-16 my-container">
        <div className="flex justify-between bg-green-100 px-4 py-3 rounded-lg">
          <p className="font-Spicy_Rice text-xl">Book Now</p>
          <div className="">
            <div className="flex items-center gap-2 w-full max-w-xs">
              <span className="label-text">Sort By:</span>

              <select className="select select-sm select-bordered">
                <option value={""}>--Default--</option>
                {sortByOptions?.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <div className="w-[25%] hidden md:block space-y-5">
            <div className="bg-slate-100 p-4 rounded-lg  ">
              <p className="text-xl font-Spicy_Rice border-b pb-2">Car Types</p>
              <div className="h-[200px] overflow-y-scroll scrollbar-thumb-rounded scrollbar-track-rounded-full scrollbar-thin  scrollbar-thumb-gray-500  scrollbar-track-gray-200">
                <label className="cursor-pointer label items-center justify-normal gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-success"
                  />
                  <span className="label-text">Remember me</span>
                </label>
                <label className="cursor-pointer label items-center justify-normal gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-success"
                  />
                  <span className="label-text">Remember me</span>
                </label>
                <label className="cursor-pointer label items-center justify-normal gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-success"
                  />
                  <span className="label-text">Remember me</span>
                </label>
                <label className="cursor-pointer label items-center justify-normal gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-success"
                  />
                  <span className="label-text">Remember me</span>
                </label>
                <label className="cursor-pointer label items-center justify-normal gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-success"
                  />
                  <span className="label-text">Remember me</span>
                </label>
              </div>
            </div>
            <div className="bg-slate-100 p-4 rounded-lg space-y-2 ">
              <p className="text-xl font-Spicy_Rice border-b pb-2">Car Types</p>
              <div>
              <input type="checkbox" aria-label="Electic" className="btn btn-sm btn-success rounded-full" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-[75%]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
              {cars?.data?.data.map((car: TCar, index: number) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
            <div className="py-7">
              <Pagination
                totalPages={cars?.data?.totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListingPage;
