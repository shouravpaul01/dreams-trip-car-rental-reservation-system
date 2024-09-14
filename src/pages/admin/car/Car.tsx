import { useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import { FaCubesStacked, FaPlus } from "react-icons/fa6";
import CarForm from "../../../components/form/CarForm";
import CarTable from "../../../components/table/CarTable";
import Pagination from "../../../components/ui/Pagination";
import InputSearch from "../../../components/ui/InputSearch";
import Loading from "../../../components/ui/Loading";
import {
  useGetAllCarsQuery,
  useGetSingleCarQuery,
} from "../../../redux/features/car/carApi";
import { TCar } from "../../../type/car.type";

const Car = () => {
  const [contentManage, setContentManage] = useState<string>("manage");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [carId, setCarId] = useState<string | null>(null);
  const [editableData, setEditableData] = useState<TCar | null>(null);
  const { data: cars, isLoading: isCarsLoading } = useGetAllCarsQuery({
    search: searchInputValue,
    page: currentPage,
  });
  const { data: car, isLoading: isSingleCarLoading } = useGetSingleCarQuery(
    carId,
    { skip: !carId }
  );

  useEffect(() => {
    if (carId) {
      setEditableData(car?.data);
    }
  }, [carId, isSingleCarLoading]);

  if (isCarsLoading || isSingleCarLoading) {
    return <Loading className="h-screen" />;
  }
 
  return (
    <>
      <div className="bg-gray-100 mt-4">
        <div className="flex items-center bg-[#3aa27ea8] gap-2 py-2 px-4">
          <p className="font-bold text-black flex-1">
            {contentManage == "add" && "Add Car"}
            {contentManage == "manage" && "Manage Car"}{" "}
            {contentManage == "update" && "Edit Car"}
          </p>
          {contentManage == "update" || contentManage == "manage" && (
            <button
              onClick={() => {
                setContentManage( "add"),
                  setCarId(null);
                setEditableData(null);
              }}
              className={`btn btn-sm btn-circle btn-warning`}
            >
              <FaPlus /> 
            </button>
          )}
          {
           ( contentManage=="add" || contentManage=="update") && <button
            onClick={() => {
              setContentManage((prev) =>
                prev == "add" || prev == "update" ? "manage" : "add"
              ),
                setCarId(null);
              setEditableData(null);
            }}
            className={`btn btn-sm rounded-full btn-warning`}
          >
            
            
                <FaCubesStacked /> Manage
             
            
          </button>
          }
        </div>
        <div className="px-4 py-5">
          {contentManage == "add" || editableData ? (
            <CarForm editableData={editableData} />
          ) : (
            <>
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

              <CarTable
                cars={cars?.data?.data}
                setContentManage={setContentManage}
                setCarId={setCarId}
              />

              <div className="px-2 py-3 ">
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={cars?.data?.totalPages}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Car;
