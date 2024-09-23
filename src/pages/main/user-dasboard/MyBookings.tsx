import { useEffect, useState } from "react";
import CarTable from "../../../components/table/CarTable";
import Pagination from "../../../components/ui/Pagination";
import InputSearch from "../../../components/ui/InputSearch";
import Loading from "../../../components/ui/Loading";
import { useGetAllMyBookingsQuery } from "../../../redux/features/booking/bookingApi";
import MyBookingsTable from "./MyBookingsTable";
import { useAppSelector } from "../../../redux/hook";
import { drivingOptions } from "../../../constant";

const MyBookings = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [drivingType, setDrivingType] = useState<string>("");

  const { data: myBookings, isLoading: isMyBookingsLoading } =
    useGetAllMyBookingsQuery([
      { label: "search", value: searchInputValue },
      { label: "page", value: currentPage },
      { label: "email", value: user?.email },
      { label: "drivingType", value: drivingType },
    ]);

 
  if (isMyBookingsLoading) {
    return <Loading className="h-screen" />;
  }

  return (
    <>
      <div className="py-5">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between mb-3 ">
          <div className="w-full md:w-72 ">
            <InputSearch
              className="input-sm input-bordered h-9"
              setSearchValue={setSearchInputValue}
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 ">
            <span className="text-nowrap">Driving Type:</span>
            <select className="select select-sm select-bordered w-full max-w-xs" onChange={(e)=>setDrivingType(e.target.value)}>
            <option value={""}>--Select Driving Type--</option>
             {drivingOptions.map((option,index)=><option key={index} value={option.label}>{option.label}</option>)}
            
            </select>
          </div>
        </div>

        <MyBookingsTable myBookings={myBookings?.data?.data} drivingType={drivingType}/>

        <div className="px-2 py-3 ">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={myBookings?.data?.totalPages}
          />
        </div>
      </div>
    </>
  );
};

export default MyBookings;
