import {
  FaArrowRightArrowLeft,
  FaCircleDot,
  FaInfo,
  FaRegFaceFrownOpen,
  FaSquarePen,
} from "react-icons/fa6";


import { toast } from "sonner";
import { TPrice } from "../../type/price.type";
import {
  
  useUpdatePriceStatusMutation,
} from "../../redux/features/price/priceApi";



const PriceTable = ({ prices , setEditId }: { prices: TPrice[] , setEditId: (id: string | null) => void    }) => {

  const [updatePriceStatus] = useUpdatePriceStatusMutation();
  
  const handleStatusUpdate = async (_id: string, isActive: boolean) => {
    const updateData = {
      _id: _id,
      isActive: isActive,
    };
    const res = await updatePriceStatus(updateData).unwrap();
    toast.success(res.message);
  };


  return (
    <>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-sm">
        <table className="table  bg-white rounded-md">
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
                <td>
                  <span className="font-semibold">
                    {price.hourly.ratePerHour}
                  </span>{" "}
                  TK
                </td>
                <td>
                  <span className="font-semibold">
                    {price.daily.ratePerDay}
                  </span>{" "}
                  TK
                </td>
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
                    <label
                      htmlFor="my_modal_6"
                      className="btn btn-sm btn-outline btn-success"
                      onClick={() => {
                        setEditId(price._id!);
                      }}
                    >
                      <FaSquarePen />
                    </label>
                    <button
                      className="btn btn-sm btn-outline btn-success"
                      
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

     
    </>
  );
};

export default PriceTable;
