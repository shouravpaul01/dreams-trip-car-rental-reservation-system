import { useGetAllActiveCarTypesQuery } from "../../../redux/features/car-type/carTypeApi";
import { TCarType } from "../../../type/cartype.type";

const FilterSideBar = ({
  setCarTypeInputValue,
  setDrivingTypeInputValue,
}: {
  setCarTypeInputValue: any;
  setDrivingTypeInputValue: any;
}) => {
  const { data: carTypes } = useGetAllActiveCarTypesQuery(undefined);
  return (
    <>
      <div className="bg-green-100 p-4 rounded-lg  ">
        <p className="text-xl  text-gray-700 font-Spicy_Rice border-b border-gray-300 pb-2">Car Types</p>
        <div className="h-[200px] py-1 overflow-y-scroll scrollbar-thumb-rounded scrollbar-track-rounded-full scrollbar-thin  scrollbar-thumb-gray-500  scrollbar-track-gray-200">
          {carTypes?.data?.map((type: TCarType, index: number) => (
            <label
              key={index}
              className="cursor-pointer flex items-center justify-normal gap-2.5"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-success rounded-md"
                value={type._id}
                onChange={() =>
                  setCarTypeInputValue((prev: any) => {
                    const matchedId = prev.find(
                      (item: any) => item.value == type._id
                    );
                    if (matchedId) {
                      return prev.filter(
                        (item: any) => item.value !== type._id
                      );
                    }
                    return [...prev, { label: "type", value: type._id }];
                  })
                }
              />
              <span className="label-text">{type.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="bg-green-100 p-4 rounded-lg space-y-2 ">
        <p className="text-xl text-gray-700 font-Spicy_Rice border-b border-gray-300 pb-2">Driving Types</p>
        <div className="flex flex-col gap-2">
          <label className="label  items-center justify-normal gap-2 cursor-pointer">
            <input
              type="radio"
              name="drivingType"
              className="radio radio-success"
              onChange={() =>
                setDrivingTypeInputValue({
                  label: "drivingType",
                  value: "Self Driving",
                })
              }
            />
            <span className="">Self Driving</span>
          </label>

          <label className="label items-center justify-normal gap-2 cursor-pointer">
            <input
              type="radio"
              name="drivingType"
              className="radio radio-success"
              onChange={() =>
                setDrivingTypeInputValue({
                  label: "drivingType",
                  value: "Company Provided",
                })
              }
            />
            <span className="">Company Provided</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default FilterSideBar;
