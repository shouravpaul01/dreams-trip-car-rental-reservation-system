import {
  FaArrowRightArrowLeft,
  FaCircleDot,
  FaInfo,
  FaRegFaceFrownOpen,
  FaSquarePen,
} from "react-icons/fa6";
import { useState } from "react";
import Modal from "../ui/Modal";
import { toast } from "sonner";
import { TCar } from "../../type/car.type";
import { useGetSingleCarQuery, useUpdateCarStatusMutation } from "../../redux/features/car/carApi";
import CarDetailsTable from "./CarDetailsTable";
import Loading from "../ui/Loading";



const CarTable = ({ cars,setContentManage,setCarId }: { cars: TCar[],setContentManage:(value:string)=>void,setCarId:(value:string)=>void }) => {
  const [modalId, setModalId] = useState<string>("");
  const [updateStatusCar] = useUpdateCarStatusMutation();
  const { data: car, isLoading: isSingleCarLoading } = useGetSingleCarQuery(
    modalId,
    { skip: !modalId }
  );
  const handleStatusUpdate = async (_id: string, isActive: boolean) => {
    const updateData = {
      _id: _id,
      isActive: isActive,
    };
    const res = await updateStatusCar(updateData).unwrap();
    toast.success(res.message);
  };
  const hanleCloseModal = () => {
    setModalId("");
  };
 
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table  bg-white rounded-none">
          {cars?.length == 0 && (
            <caption className="caption-bottom  text-lg py-4">
              <span className="flex justify-center items-center gap-2">
                <FaRegFaceFrownOpen /> Data not found!.
              </span>
            </caption>
          )}
          {/* head */}
          <thead className="bg-[#3aa27ea8] text-sm text-black">
            <tr>
              <th>Name</th>
              <th>Price Per Hour</th>
              <th>Status</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {cars?.map((car: TCar, index: number) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={car.image} alt="image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{car.name}</div>
                      <div className="text-sm opacity-50">Type: {car.type?.name  }</div>
                      <div className="text-sm opacity-50">Color: {car.color}</div>
                    </div>
                  </div>
                </td>
                <td>{car.price.hourly.ratePerHour && `${car.price.hourly.ratePerHour}Tk/H`}{(car.price.hourly.ratePerHour && car.price.daily.ratePerDay ) && "---"}{car.price.daily.ratePerDay && `${car.price.daily.ratePerDay}Tk/H`}</td>
                <td>
                  <div className="flex gap-2 items-center ">
                    <FaCircleDot
                      className={car.isActive ? "text-primary" : "text-error"}
                    />
                    <span>{car.isActive ? "Active" : "Inactive"}</span>
                    <button
                      className={`btn btn-sm btn-outline btn-success `}
                      onClick={() =>
                        handleStatusUpdate(
                          car._id!,
                          car.isActive ? false : true
                        )
                      }
                    >
                      <FaArrowRightArrowLeft />
                    </button>
                  </div>
                </td>
                <td >
                <div className="flex gap-2">
                <button
                    className="btn btn-sm btn-outline btn-success"
                    onClick={() => {
                      setContentManage("update"), setCarId(car._id!);
                    }}
                  >
                    <FaSquarePen />
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-success"
                    onClick={() => {
                      setModalId(car._id!);
                    }}
                  >
                    <FaInfo />
                  </button>
                  </div> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        modalId={modalId}
        width="max-w-3xl"
        modalTitle="Car Details"
        hanleCloseModal={hanleCloseModal}
      >
      {isSingleCarLoading ?<Loading className="h-[400px]"/>:<CarDetailsTable details={car?.data}/>}
      </Modal>
    </>
  );
};

export default CarTable;
