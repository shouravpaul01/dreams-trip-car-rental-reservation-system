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
import { TPrice } from "../../type/price.type";
import {
  useGetSinglePriceQuery,
  useUpdatePriceStatusMutation
} from "../../redux/features/price/priceApi";

import CarDetailsTable from "./CarDetailsTable";
import Loading from "../ui/Loading";

const PriceTable = ({
  prices,
  setContentManage,
  setPriceId,
}: {
  prices: TPrice[];
  setContentManage: (value: string) => void;
  setPriceId: (value: string) => void;
}) => {
  const [modalId, setModalId] = useState<string>("");
  const [updatePriceStatus] = useUpdatePriceStatusMutation();
  const { data: car, isLoading: isSinglePriceLoading } = useGetSinglePriceQuery(
    modalId,
    { skip: !modalId }
  );
  const handleStatusUpdate = async (_id: string, isActive: boolean) => {
    const updateData = {
      _id: _id,
      isActive: isActive,
    };
    const res = await updatePriceStatus(updateData).unwrap();
    toast.success(res.message);
  };
  const hanleCloseModal = () => {
    setModalId("");
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table  bg-white rounded-none">
          {prices?.length == 0 && (
            <caption className="caption-bottom  text-lg py-4">
              <span className="flex justify-center items-center gap-2">
                <FaRegFaceFrownOpen /> Data not found!.
              </span>
            </caption>
          )}
          {/* head */}
          <thead className="bg-[#3aa27ea8] text-sm text-black">
            <tr>
              <th>Hourly</th>
              <th>Daily</th>
              <th>Status</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {prices?.map((price: TPrice, index: number) => (
              <tr key={index}>
                <td><span className="font-semibold">{price.hourly.ratePerHour}</span> TK</td>
                <td><span className="font-semibold">{price.daily.ratePerDay}</span> TK</td>
                <td>
                  <div className="flex gap-2 items-center ">
                    <FaCircleDot
                      className={price.isActive ? "text-primary" : "text-error"}
                    />
                    <span>{price.isActive ? "Active" : "Inactive"}</span>
                    <button
                      className={`btn btn-sm btn-outline btn-success `}
                      onClick={() =>
                        handleStatusUpdate(
                          price._id!,
                          price.isActive ? false : true
                        )
                      }
                    >
                      <FaArrowRightArrowLeft />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-outline btn-success"
                      onClick={() => {
                        setContentManage("update"), setPriceId(price._id!);
                      }}
                    >
                      <FaSquarePen />
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-success"
                      onClick={() => {
                        setModalId(price._id!);
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
        {isSinglePriceLoading ? (
          <Loading className="h-[400px]" />
        ) : (
          <CarDetailsTable details={car?.data} />
        )}
      </Modal>
    </>
  );
};

export default PriceTable;
