import {  useState } from "react";
import { FaPlus } from "react-icons/fa6";
import PriceForm from "../../../components/form/PriceForm";
import PriceTable from "../../../components/table/PriceTable";
import Pagination from "../../../components/ui/Pagination";
import InputSearch from "../../../components/ui/InputSearch";
import Loading from "../../../components/ui/Loading";
import {
  useGetAllPricesQuery,
  
} from "../../../redux/features/price/priceApi";

import {  useSearchParams } from "react-router-dom";

const PricePage = () => {
 
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editId, setEditId] = useState<string | null>(null);

  const { data: prices, isLoading: isPricesLoading } = useGetAllPricesQuery({
    search: searchInputValue,
    page: currentPage,
  });

  if (isPricesLoading) {
    return <Loading className="h-screen" />;
  }

  return (
    <>
      <div className="bg-gray-100 mt-4">
        <div className="flex items-center bg-[#3aa27ea8] gap-2 py-2 px-4">
          <p className="font-Spicy_Rice text-xl flex-1">Manage Price</p>
          <label
            htmlFor="my_modal_6"
            className={`btn btn-sm btn-circle  btn-secondary`}
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

          <PriceTable prices={prices?.data?.data} setEditId={setEditId} />

          <div className="px-2 py-3 ">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={prices?.data?.totalPages}
            />
          </div>
        </div>
      </div>
      <PriceForm editId={editId} />
    </>
  );
};

export default PricePage;
