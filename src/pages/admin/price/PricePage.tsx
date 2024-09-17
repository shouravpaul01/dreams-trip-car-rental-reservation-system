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

const PricePage = () => {
  const [contentManage, setContentManage] = useState<string>("manage");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [priceId, setPriceId] = useState<string | null>(null);
  const [editableData, setEditableData] = useState<TCar | null>(null);
  const { data: prices, isLoading: isPricesLoading } = useGetAllPricesQuery({
    search: searchInputValue,
    page: currentPage,
  });
  const { data: price, isLoading: isSinglePriceLoading } =
    useGetSinglePriceQuery(priceId, { skip: !priceId });
console.log(price,priceId)
  useEffect(() => {
    if (priceId) {
      setEditableData(price?.data);
    }
  }, [priceId, isSinglePriceLoading]);

  if (isPricesLoading || isSinglePriceLoading) {
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
          {contentManage == "update" ||
            (contentManage == "manage" && (
              <button
                onClick={() => {
                  setContentManage("add"), setPriceId(null);
                  setEditableData(null);
                }}
                className={`btn btn-sm btn-circle btn-warning`}
              >
                <FaPlus />
              </button>
            ))}
          {(contentManage == "add" || contentManage == "update") && (
            <button
              onClick={() => {
                setContentManage((prev) =>
                  prev == "add" || prev == "update" ? "manage" : "add"
                ),
                  setPriceId(null);
                setEditableData(null);
              }}
              className={`btn btn-sm rounded-full btn-warning`}
            >
              <FaCubesStacked /> Manage
            </button>
          )}
        </div>
        <div className="px-4 py-5">
          {contentManage == "add" || editableData ? (
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
                setContentManage={setContentManage}
                setPriceId={setPriceId}
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
