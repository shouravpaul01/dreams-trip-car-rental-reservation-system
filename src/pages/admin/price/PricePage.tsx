import { useEffect, useState } from "react";
import { FaCubesStacked, FaPlus } from "react-icons/fa6";
import PriceForm from "../../../components/form/PriceForm";
import PriceTable from "../../../components/table/PriceTable";
import Pagination from "../../../components/ui/Pagination";
import InputSearch from "../../../components/ui/InputSearch";
import Loading from "../../../components/ui/Loading";
import {
  useGetAllPricesQuery,
  useGetSinglePriceQuery,
} from "../../../redux/features/price/priceApi";
import { TCar } from "../../../type/car.type";
import { NavLink, useSearchParams } from "react-router-dom";

const PricePage = () => {
  const [searchParams] = useSearchParams();
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editableData, setEditableData] = useState<TCar | null>(null);

  const tab = searchParams.get("tab");
  const tabCreate = searchParams.get("create"); 
  const tabId = searchParams.get("_id");

  const { data: prices, isLoading: isPricesLoading } = useGetAllPricesQuery({
    search: searchInputValue,
    page: currentPage,
  });
  const { data: price, isLoading: isSinglePriceLoading } =
    useGetSinglePriceQuery(tabId, { skip: !tabId });

  useEffect(() => {
    if (tabId) {
      setEditableData(price?.data);
    }
    if (tabCreate == "true") {
      setEditableData(null);
    }
  }, [tabId, isSinglePriceLoading]);

  if (isPricesLoading || isSinglePriceLoading) {
    return <Loading className="h-screen" />;
  }

  return (
    <>
      <div className="bg-gray-100 mt-4">
        <div className="flex items-center bg-[#3aa27ea8] gap-2 py-2 px-4">
          <p className="font-Spicy_Rice text-xl flex-1">
            {tabCreate == "true" && "Add Price"}
            {tab == "manage-prices" && !tabCreate && !tabId && "Manage Prices"}{" "}
            {tabId && tab && "Edit Price"}
          </p>
          {
            <NavLink
              to={`?tab=manage-prices&create=true`}
              className={`btn btn-sm btn-circle btn-outline btn-warning ${tabCreate=="true" && "btn-active"}`}
            >
              <FaPlus />
            </NavLink>
          }
          {
            <NavLink
              to={"?tab=manage-prices"}
              className={`btn btn-sm rounded-full btn-outline btn-warning ${tab=="manage-prices" && !tabCreate && "btn-active"}`}
            >
              <FaCubesStacked /> Manage
            </NavLink>
          }
        </div>
        <div className="px-4 py-5">
          {tabCreate == "true" || editableData ? (
            <PriceForm editableData={editableData} />
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

              <PriceTable
                prices={prices?.data?.data}
               
              />

              <div className="px-2 py-3 ">
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={prices?.data?.totalPages}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PricePage;
