import { useGetSingleCarQuery } from "../../redux/features/car/carApi";

import Loading from "../ui/Loading";

const CarDetailsTable = ({ carId }: { carId: string }) => {
 
  const { data, isLoading,isFetching } = useGetSingleCarQuery(carId, {
    skip: !carId,
  });
  const details = data?.data;
  return (
    <>
      <input type="checkbox" id="details" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Details</h3>
          <label
            htmlFor="details"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            X
          </label>
          {
            isLoading || isFetching?<Loading className="h-40"/>:<div className="my-1.5">
            <div className="flex flex-wrap gap-10">
              <div className="mx-auto md:mx-0 ">
                <img
                  src={
                    details?.image ||
                    "https://res.cloudinary.com/dcrui4h7s/image/upload/v1725301818/dreams-trip-car-rental-reservation-system/g6wmdmjdgz2jczecgx9p.jpg"
                  }
                  alt="car image"
                  className="w-[250px] h-[300px] rounded-md border border-gray-300 border-dashed"
                />
              </div>
              <div className="">
                <table>
                  <tbody className="space-y-5">
                    <tr className="font-bold text-xl">
                      <td>{details?.name}</td>
                    </tr>
                    <tr>
                      <td>
                        Type :{" "}
                        <span className="badge badge-info">
                          {details?.type?.name}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        Color : <span className="badge ">{details?.color}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Price Per Hour :{" "}
                        <span className="font-bold ">{`${details?.price.hourly.ratePerHour} TK/Hr---${details?.price.daily.ratePerDay} TK/D`}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        Features :{" "}
                        <span className="space-x-2">
                          {details?.features.map(
                            (feature: any, index: number) => (
                              <span key={index} className="badge badge-outline">
                                {feature}
                              </span>
                            )
                          )}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-2">
              <p className="border-b pb-1">Description:</p>
              {}
              <div
                dangerouslySetInnerHTML={{ __html: details?.description || "" }}
              ></div>
            </div>
          </div>
          }
        </div>
      </div>
    </>
  );
};

export default CarDetailsTable;
