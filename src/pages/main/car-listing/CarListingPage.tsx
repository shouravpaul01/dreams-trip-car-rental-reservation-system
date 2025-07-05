import { useState } from "react";
import CarCard from "../../../components/cards/CarCard";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import Pagination from "../../../components/ui/Pagination";
import { sortByOptions } from "../../../constant/index";
import { TCar } from "../../../type/car.type";
import { useGetAllCarsQuery } from "../../../redux/features/car/carApi";
import { FaRegFaceSadCry } from "react-icons/fa6";
import FilterSideBar from "./FilterSideBar";
import { IoFilter } from "react-icons/io5";
import useTitle from "../../../hook/useTitle";
import CarSkeleton from "../../../components/ui/CarSkeleton";

const CarListingPage = () => {
  useTitle("Car Listings");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [carTypeInputValue, setCarTypeInputValue] = useState<
    { label: string; value: string }[]
  >([]);
  const [drivingTypeInputValue, setDrivingTypeInputValue] = useState<
    { label: string; value: string } | {}
  >({});
  const { data: cars, isLoading: isCarsLoading } = useGetAllCarsQuery([
    ...carTypeInputValue,
    drivingTypeInputValue,
    { label: "page", value: currentPage },
    { label: "limit", value: 6 }
  ]);

  

  return (
    <>
      <Breadcrumbs
        title="Car Listings"
        links={[{ linkUrl: "/car-listings", label: "car-listings" }]}
      />
      <div className="py-16 my-container">
        <div className="flex items-center justify-between bg-green-100 px-4 py-3 rounded-lg">
          <p className="font-Spicy_Rice text-xl  text-gray-700 hidden md:block">Book  Now</p>
          <div className="block md:hidden">

          <label htmlFor="my-drawer" className="btn btn-sm ">
            <IoFilter />
          </label>
          </div>
          <div className="">
            <div className="flex items-center gap-2 w-full max-w-xs">
              <label className="select">
                <span className="label">Sort By:</span>
                <select>
                  <option value={""}>--Default--</option>
                  {sortByOptions?.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <div className="w-[25%] hidden md:block space-y-5">
            <FilterSideBar
              setCarTypeInputValue={setCarTypeInputValue}
              setDrivingTypeInputValue={setDrivingTypeInputValue}
            />
          </div>
          <div className="w-full md:w-[75%]">
            {cars?.data?.data?.length == 0 && (
              <div role="alert" className="alert rounded-lg">
                <FaRegFaceSadCry />
                <span>Data Not Found!.</span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
               {isCarsLoading &&
                        [...Array(8)].map((_, index) => (
                         <CarSkeleton key={index} />  
                        ))}
              {cars?.data?.data.map((car: TCar, index: number) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
            <div className="py-7">
              {cars?.data?.data?.length > 0 && (
                <Pagination
                  totalPages={cars?.data?.totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="drawer z-50">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-5">
           <FilterSideBar
              setCarTypeInputValue={setCarTypeInputValue}
              setDrivingTypeInputValue={setDrivingTypeInputValue}
            />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default CarListingPage;
