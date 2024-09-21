import { useState } from "react";
import CarTable from "../../../components/table/CarTable";
import Pagination from "../../../components/ui/Pagination";
import InputSearch from "../../../components/ui/InputSearch";
import Loading from "../../../components/ui/Loading";
import { useGetAllBookingsQuery } from "../../../redux/features/booking/bookingApi";
import BookingTable from "./BookingTable";
import { drivingOptions } from "../../../constant";

const BookingPage = () => {
  const [contentManage, setContentManage] = useState<string>("manage");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [drivingType, setDrivingType] = useState<string>("");

  const { data: bookings, isLoading: isBookingsLoading } =
    useGetAllBookingsQuery( [{ label: "search", value: searchInputValue },
      { label: "page", value: currentPage },
      { label: "drivingType", value: drivingType }]);
  //   const { data: car, isLoading: isSingleCarLoading } = useGetSingleCarQuery(
  //     carId,
  //     { skip: !carId }
  //   );

  if (isBookingsLoading) {
    return <Loading className="h-screen" />;
  }
console.log(bookings)
  return (
    <>
      <div className="bg-gray-100 mt-4">
        <div className=" bg-[#3aa27ea8] gap-2 py-2 px-4">
          <p className="font-bold text-black ">Manage Bookings</p>
        </div>
        <div className="px-4 py-5">
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between mb-3 ">
            <div className="w-full md:w-72 ">
              <InputSearch
                className="input-sm h-9"
                setSearchValue={setSearchInputValue}
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-1 ">
              <span className="text-nowrap">Driving Type:</span>
              <select
                className="select select-sm select-bordered w-full max-w-xs"
                onChange={(e) => setDrivingType(e.target.value)}
              >
                <option value={""}>--Select Driving Type--</option>
                {drivingOptions.map((option, index) => (
                  <option key={index} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <BookingTable bookings={bookings?.data?.data} />

          <div className="px-2 py-3 ">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={bookings?.data?.totalPages}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
