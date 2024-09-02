import {
  FaArrowRightArrowLeft,
  FaCircleDot,
  FaRegFaceFrownOpen,
  FaSquarePen,
} from "react-icons/fa6";
import { useState } from "react";
import Modal from "../ui/Modal";

import { toast } from "sonner";
import { TCarType } from "../../type/cartype.type";
import CarTypeForm from "../form/CarTypeForm";
import { useUpdateCarTypeStatusMutation } from "../../redux/features/car-type/carTypeApi";

const CarTypeTable = ({ carTypes }: { carTypes: TCarType[] }) => {
  const [modalId, setModalId] = useState<string>("");
  const [editableData, setEditableData] = useState<TCarType | null>(null);

  const [updateStatusCarType] = useUpdateCarTypeStatusMutation();

  const handleStatusUpdate = async (_id: string, isActive: boolean) => {
    const updateData = {
      _id: _id,
      isActive: isActive,
    };
    const res = await updateStatusCarType(updateData).unwrap();
    console.log(res);
    toast.success(res.message);
  };
  const hanleCloseModal = () => {
    setEditableData(null);
    setModalId("")
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table  bg-white rounded-none">
          {carTypes?.length == 0 && (
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
              <th>Description</th>
              <th>Status</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {carTypes?.map((type: TCarType, index: number) => (
              <tr key={index}>
                <td>{type.name}</td>
                <td>{type.description}</td>
                <td>
                  <div className="flex gap-2 items-center ">
                    <FaCircleDot
                      className={type.isActive ? "text-primary" : "text-error"}
                    />
                    <span>{type.isActive ? "Active" : "Inactive"}</span>
                    <button
                      className={`btn btn-sm btn-outline btn-success `}
                      onClick={() =>
                        handleStatusUpdate(
                          type._id!,
                          type.isActive ? false : true
                        )
                      }
                    >
                      <FaArrowRightArrowLeft />
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline btn-success"
                    onClick={() => {
                      setModalId(type._id), setEditableData(type);
                    }}
                  >
                    <FaSquarePen />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        modalId={modalId}
        modalTitle="Edit Car Type"
        hanleCloseModal={hanleCloseModal}
      >
        <CarTypeForm editableData={editableData} />
      </Modal>
    </>
  );
};

export default CarTypeTable;
