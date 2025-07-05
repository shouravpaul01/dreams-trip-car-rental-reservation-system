import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import CarForm from "../../../components/form/CarForm";
import CarTable from "../../../components/table/CarTable";
import Pagination from "../../../components/ui/Pagination";
import InputSearch from "../../../components/ui/InputSearch";
import Loading from "../../../components/ui/Loading";
import { useGetAllCarsQuery } from "../../../redux/features/car/carApi";
import CarDetailsTable from "../../../components/table/CarDetailsTable";

export const CarPage = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [carId, setCarId] = useState<string | null>(null);

  const { data: cars, isLoading: isCarsLoading } = useGetAllCarsQuery([
    { label: "search", value: searchInputValue },
    { label: "page", value: currentPage },
  ]);

  if (isCarsLoading) {
    return <Loading className="h-screen" />;
  }
  return (
    <>
      <div className="bg-base-100 text-base  mt-4">
        <div className="flex items-center bg-[#3aa27ea8] rounded-md gap-2 py-2 px-4">
          <p className="font-Spicy_Rice text-xl  flex-1">Manage Car</p>
          <label
            htmlFor="my_modal_6"
            className={`btn btn-sm btn-circle  btn-secondary`}
            onClick={() => setCarId("")}
          >
            <FaPlus />
          </label>
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

          <CarTable cars={cars?.data?.data} setCarId={setCarId} />

          <div className="px-2 py-3 ">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={cars?.data?.totalPages}
            />
          </div>
        </div>
      </div>
      <CarForm carId={carId} />
      <CarDetailsTable carId={carId!} />
    </>
  );
};
