

import { useState } from "react";
import CarTable from "../../../components/table/CarTable";
import Pagination from "../../../components/ui/Pagination";
import InputSearch from "../../../components/ui/InputSearch";
import Loading from "../../../components/ui/Loading";
import { useGetAllBookingsQuery } from "../../../redux/features/booking/bookingApi";
import BookingTable from "./BookingTable";



const BookingPage = () => {
  const [contentManage, setContentManage] = useState<string>("manage");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [carId, setCarId] = useState<string | null>(null);
  
  const { data: bookings, isLoading: isBookingsLoading } = useGetAllBookingsQuery({
    search: searchInputValue,
    page: currentPage,
  });
//   const { data: car, isLoading: isSingleCarLoading } = useGetSingleCarQuery(
//     carId,
//     { skip: !carId }
//   );

  

  if (isBookingsLoading ) {
    return <Loading className="h-screen" />;
  }
 
  return (
    <>
      <div className="bg-gray-100 mt-4">
        <div className=" bg-[#3aa27ea8] gap-2 py-2 px-4">
          <p className="font-bold text-black ">
            Manage Bookings
          </p>
          
        </div>
        <div className="px-4 py-5">
          
           
              <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
                <div className="w-full md:w-80 mb-3">
                  <InputSearch
                    className="input-sm h-9"
                    setSearchValue={setSearchInputValue}
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
                  />
                </div>
              </div>

              <BookingTable
                bookings={bookings?.data?.data}
              />

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
