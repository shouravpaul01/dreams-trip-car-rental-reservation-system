import { number } from "zod";
import { TCar } from "../../type/car.type";

const CarDetailsTable = ({ details }: { details: TCar }) => {
  return (
    <div className="my-3">
      <div className="flex flex-wrap gap-10">
        <div className="mx-auto md:mx-0 ">
          <img
            src={
              details?.image ||
              "https://res.cloudinary.com/dcrui4h7s/image/upload/v1725301818/dreams-trip-car-rental-reservation-system/g6wmdmjdgz2jczecgx9p.jpg"
            }
            alt="car image"
            className="w-[250px] h-[300px] rounded-md outline outline-offset-4 outline-success "
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
                  <span className="font-bold ">{details?.pricePerHour} TK</span>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  Features :{" "}
                  <span className="space-x-2">
                    {details?.features.map((feature, index: number) => (
                      <span key={index} className="badge badge-info">
                        {feature}
                      </span>
                    ))}
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
  );
};

export default CarDetailsTable;
