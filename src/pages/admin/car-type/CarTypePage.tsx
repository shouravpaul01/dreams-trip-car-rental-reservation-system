import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import CarTypeForm from "../../../components/form/CarTypeForm";
import CarTypeTable from "../../../components/table/CarTypeTable";
import { useGetAllCarTypeQuery } from "../../../redux/features/car-type/carTypeApi";
import Pagination from "../../../components/ui/Pagination";
import InputSearch from "../../../components/ui/InputSearch";
import Loading from "../../../components/ui/Loading";


export const CarTypePage = () => {
  const [editId, setEditId] = useState<string>("");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: carTypes, isLoading } = useGetAllCarTypeQuery({
    search: searchInputValue,
    page: currentPage,
  });
 
 

  if (isLoading) {
    return <Loading className="h-screen"/>;
  }
  return (
    <>
      <div className="mt-4">
        <div className="flex items-center bg-[#3aa27ea8] gap-2 py-2 px-4">
          <p className="font-Spicy_Rice text-xl flex-1">Manage Types</p>
           <label
            htmlFor="my_modal_6"
            className={`btn btn-sm btn-circle  btn-secondary`}
            onClick={() => setEditId("")}
          >
            <FaPlus />
          </label>
        </div>
        <div className="px-0 md:px-4 py-5 space-y-5">
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
            <div className="w-full md:w-80 ">
              <InputSearch
                className="input-sm h-9"
                setSearchValue={setSearchInputValue}
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
              />
            </div>
          </div>

          <CarTypeTable carTypes={carTypes?.data?.data} setEditId={setEditId}/>

          <div className="px-2 py-3">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={carTypes?.data?.totalPages}
            />
          </div>
        </div>
      </div>
      
        <CarTypeForm editId={editId}/>
      
    </>
  );
};


