import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import { useParams } from "react-router-dom";
import { useGetSingleCarQuery } from "../../../redux/features/car/carApi";
import { Controller, useForm } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { FaArrowRight, FaCalendarDays, FaClock, FaStar } from "react-icons/fa6";

const BookingPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCarQuery(id);
  const car = data?.data;
  const { control } = useForm({});
  console.log(car);
  return (
    <div>
      <Breadcrumbs title="Booking" />
      <div className="my-container py-16">
        <div className="flex flex-col md:flex-row gap-4  ">
          <div className="w-full md:w-[65%] space-y-6">
            <div className="bg-green-100 rounded-xl p-5">
              <p className="font-bold text-2xl border-b pb-2">
                Personal Information
              </p>
              <div className="pt-1 space-y-1">
                <div className="flex flex-col md:flex-row gap-4">
                  <label className="form-control w-full md:w-[40%]">
                    <span className="label-text">
                      Name <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full "
                    />
                  </label>
                  <label className="form-control w-full md:w-[60%]">
                    <span className="label-text">
                      Email <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full "
                    />
                  </label>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <label className="form-control w-full md:w-[40%]">
                    <span className="label-text">
                      Phone Number <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full "
                    />
                  </label>
                  <label className="form-control w-full md:w-[60%]">
                    <span className="label-text">
                      NID <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full "
                    />
                  </label>
                </div>
                <label className="form-control w-full ">
                  <span className="label-text">
                    Driving License <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full "
                  />
                </label>
              </div>
            </div>
            <div className="bg-green-100 rounded-xl p-5 ">
              <div className="border-b pb-2 space-y-2">
                <p className="font-bold text-2xl border-b pb-2">
                  Booking Type & Time
                </p>
                <div className="flex flex-col items-center w-28 bg-white rounded-xl p-5 text-center ">
                  <input
                    type="radio"
                    name="radio-5"
                    className="radio radio-success"
                    defaultChecked
                  />
                  <label className="font-bold">Hourly</label>
                </div>
              </div>
              <div className="pt-1 space-y-1">
                <div className="flex flex-col md:flex-row gap-4">
                  <label className="form-control w-full md:w-[50%]">
                    {" "}
                    <span className="label-text font-semibold">
                      Start Time <span className="text-red-500">*</span>
                    </span>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        className="grow"
                        placeholder="Search"
                      />
                      <FaClock className="text-gray-500" />
                    </label>
                  </label>
                  <label className="form-control w-full md:w-[50%]">
                    <span className="label-text font-semibold">
                      Return Date <span className="text-red-500">*</span>
                    </span>
                    <label className="input input-bordered rounded-lg flex items-center gap-2">
                      <Controller
                        name="returnDate"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                          <Flatpickr
                            {...field}
                            className="grow"
                            placeholder="Select date"
                            options={{ dateFormat: "Y-m-d" }}
                            onChange={(date) => field.onChange(date)}
                          />
                        )}
                      />
                      <FaCalendarDays className="text-gray-500" />
                    </label>
                  </label>
                </div>
              </div>
            </div>
            <button className="btn btn-success rounded-full px-6"><FaArrowRight className="animate-bounceLR me-2"/> Confirm Booking</button>
          </div>
          <div className="w-full md:w-[35%] ">
            <div className="bg-green-100 rounded-xl p-4">
              <p className="text-2xl font-bold border-b pb-2 mb-2">
                Car Details
              </p>
              <div className="flex gap-4">
                <div className="bg-white border rounded-xl p-1">
                  <img
                    src={car?.image}
                    alt=""
                    className="w-28 h-28 rounded-xl "
                  />
                </div>
                <div>
                  <p className="font-bold line-clamp-2">{car?.name}</p>
                  <span className="badge font-bold ">
                    <FaStar className="text-yellow-500 pe-1" /> 4.5
                  </span>
                  <p>
                    Price:{" "}
                    <span className="font-bold">{car?.pricePerHour}</span>/hr
                  </p>
                </div>
                
                ​
              </div>
              <table className="table  bg-white  mt-3">
                 
                  <tbody>
                    <tr>
                      <td className="">Refundable Deposit</td>
                      <td className="font-bold">
                        1000 TK
                      </td>
                    </tr>
                    <tr>
                      <td className="">Tax</td>
                      <td className="font-bold">100 TK</td>
                    </tr>
                    <tr>
                      <td className="">Michigan</td>
                      <td className="">Detroit</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
