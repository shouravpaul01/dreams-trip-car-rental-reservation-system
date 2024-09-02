import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import { FaPlus } from "react-icons/fa6";
import CarTypeForm from "../../../components/form/CarTypeForm";
import CarTypeTable from "../../../components/table/CarTypeTable";
import { useGetAllCarTypeQuery } from "../../../redux/features/car-type/carTypeApi";
import Pagination from "../../../components/ui/Pagination";
import InputSearch from "../../../components/ui/InputSearch";
import Loading from "../../../components/ui/Loading";


const CarType = () => {
  const [modalId, setModalId] = useState<string>("");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: carTypes, isLoading } = useGetAllCarTypeQuery({
    search: searchInputValue,
    page: currentPage,
  });
 
  const hanleCloseModal = () => {
    setModalId("");
  };

  if (isLoading) {
    return <Loading className="h-screen"/>;
  }
  return (
    <>
      <div className="bg-gray-100 mt-4">
        <div className="flex items-center bg-[#3aa27ea8] gap-2 py-2 px-4">
          <p className="font-bold text-black flex-1">Manage Types</p>
          <button
            onClick={() => setModalId("openModal")}
            className={`btn btn-sm btn-circle  btn-warning`}
          >
            <FaPlus />
          </button>
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

          <CarTypeTable carTypes={carTypes?.data?.data} />

          <div className="px-2 py-3">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={carTypes?.data?.totalPages}
            />
          </div>
        </div>
      </div>
      <Modal
        modalId={modalId}
        modalTitle="Add Car Type"
        hanleCloseModal={hanleCloseModal}
      >
        <CarTypeForm />
      </Modal>
    </>
  );
};

export default CarType;
