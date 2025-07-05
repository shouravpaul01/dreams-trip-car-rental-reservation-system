import {
  FaArrowRightArrowLeft,
  FaCircleDot,
  FaInfo,
  FaRegFaceFrownOpen,
  FaSquarePen,
} from "react-icons/fa6";


import { toast } from "sonner";
import { TCar } from "../../type/car.type";
import {
  
  useUpdateCarStatusMutation,
} from "../../redux/features/car/carApi";


const CarTable = ({
  cars,
  setCarId,
}: {
  cars: TCar[];
  setCarId: (id: string) => void;
}) => {

  const [updateStatusCar] = useUpdateCarStatusMutation();
  // const { data: car, isLoading: isSingleCarLoading } = useGetSingleCarQuery(
  //   modalId,
  //   { skip: !modalId }
  // );
  const handleStatusUpdate = async (_id: string, isActive: boolean) => {
    const updateData = {
      _id: _id,
      isActive: isActive,
    };
    const res = await updateStatusCar(updateData).unwrap();
    toast.success(res.message);
  };
  

  return (
    <>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-sm">
        <table className="table  bg-white rounded-md">
          {cars?.length == 0 && (
            <caption className="caption-bottom  text-lg py-4">
              <span className="flex justify-center items-center gap-2">
                <FaRegFaceFrownOpen /> Data not found!.
              </span>
            </caption>
          )}
          {/* head */}
          <thead className="bg-[#3aa27ea8] text-sm ">
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
                      <div className="text-sm opacity-50">
                        Type: {car.type?.name}
                      </div>
                      <div className="text-sm opacity-50">
                        Color: {car.color}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {car.price.hourly.ratePerHour &&
                    `${car.price.hourly.ratePerHour}Tk/H`}
                  {car.price.hourly.ratePerHour &&
                    car.price.daily.ratePerDay &&
                    "---"}
                  {car.price.daily.ratePerDay &&
                    `${car.price.daily.ratePerDay}Tk/H`}
                </td>
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
                <td>
                  <div className="flex gap-2">
                    <label
                      htmlFor="my_modal_6"
                      className="btn btn-sm btn-outline btn-success"
                      onClick={() => {
                        setCarId(car._id!);
                      }}
                    >
                      <FaSquarePen />
                    </label>
                   <label
                      htmlFor="details"
                      className="btn btn-sm btn-outline btn-success"
                      onClick={() => {
                        setCarId(car._id!);
                      }}
                    >
                      <FaInfo />
                    </label>
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

export default CarTable;
