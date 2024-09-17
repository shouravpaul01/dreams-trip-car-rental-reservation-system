import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import { useParams } from "react-router-dom";
import { useGetSingleCarQuery } from "../../../redux/features/car/carApi";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { FaArrowRight, FaCalendarDays, FaClock, FaStar } from "react-icons/fa6";
import { useAppSelector } from "../../../redux/hook";
import CreatableSelect from "react-select/creatable";
import { locationOptions, selectCustomStype } from "../../../constant";
import { Input } from "react-select/animated";

const BookingPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCarQuery(id);
  const { user, token } = useAppSelector((state) => state.auth);
  const car = data?.data;
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  console.log(car);
  return (
    <div>
      <Breadcrumbs title="Booking" />
      <div className="my-container py-16">
        <div className="flex flex-col md:flex-row gap-4  ">
          <div className="w-full md:w-[65%] space-y-6">
          
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-green-100 rounded-xl p-5">
                <p className="font-bold text-2xl border-b pb-2">Rental Type</p>
                <div className="flex flex-col md:flex-row gap-5 mt-3">
                  <div
                    className="w-full md:w-[50%] flex flex-col items-center gap-2  bg-white rounded-xl p-5 tooltip  tooltip-bottom tooltip-success"
                    data-tip="You will have to pick up the car from the company's location, and you will drive the car yourself."
                  >
                    <input
                      type="radio"
                      value={car?.drivingType}
                      className="radio radio-success "
                      {...register("drivingType")}
                      defaultChecked
                    />
                    <span className="font-bold">{car?.drivingType}</span>
                  </div>
                 
                </div>
              </div>
              <div className="bg-green-100 rounded-xl p-5">
                <p className="font-bold text-2xl border-b pb-2">
                  Personal Information
                </p>
                {user?.role == "user" && (
                  <input type="text" {...register("user")} hidden />
                )}
                <div className="pt-1 space-y-1">
                  <div className="flex flex-col md:flex-row gap-4">
                    <label className="form-control w-full md:w-[40%]">
                      <span className="label-text">
                        Name <span className="text-red-500">*</span>
                      </span>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full "
                        readOnly={user?.role=="user"}
                        disabled={user?.role=="user"}
                      />
                    </label>
                    <label className="form-control w-full md:w-[60%]">
                      <span className="label-text">
                        Email <span className="text-red-500">*</span>
                      </span>
                      <input
                        {...register("email")}
                        type="text"
                        placeholder="Email"
                        className="input input-bordered w-full "
                        readOnly={user?.role=="user"}
                        disabled={user?.role=="user"}
                      />
                    </label>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <label className="form-control w-full md:w-[40%]">
                      <span className="label-text">
                        Phone Number <span className="text-red-500">*</span>
                      </span>
                      <input
                        {...register("phone")}
                        type="text"
                        placeholder="Phone Number"
                        className="input input-bordered w-full "
                        readOnly={user?.role=="user"}
                        disabled={user?.role=="user"}
                      />
                    </label>
                    <label className="form-control w-full md:w-[60%]">
                      <span className="label-text">
                        NID <span className="text-red-500">*</span>
                      </span>
                      <input
                        {...register("nid")}
                        type="text"
                        placeholder="National ID"
                        className="input input-bordered w-full "
                      />
                      {errors.nid && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.nid.message as string}
                        </p>
                      )}
                    </label>
                  </div>
                  {
                    // If the driving type option is selected as 'Self-Driving,' the user must provide a driving license number. The option will be shown.
                   car?.drivingType== "Self Driving" && (
                      <label className="form-control w-full ">
                        <span className="label-text">
                          Driving License{" "}
                          <span className="text-red-500">*</span>
                        </span>
                        <input
                          {...register("drivingLicence")}
                          type="text"
                          placeholder="Driving Licence"
                          className="input input-bordered w-full "
                        />
                        {errors.drivingLicence && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.drivingLicence.message as string}
                          </p>
                        )}
                      </label>
                    )
                  }
                </div>
              </div>

              <div className="bg-green-100 rounded-xl p-5 ">
                <div className="border-b pb-2 space-y-2">
                  <p className="font-bold text-2xl border-b pb-2">
                    Booking Type & Time
                  </p>
                  <div className="flex flex-wrap gap-5">
                  <div className="flex flex-col items-center w-36 bg-white rounded-xl p-5 text-center ">
                    <input
                      type="radio"
                      value={JSON.stringify({ price: car?.price?.hourly?.ratePerHour, type: "hourly" })}
                      className="radio radio-success"
                      {...register("priceType")}
                    />
                    <span className="font-semibold">{car?.price?.hourly?.ratePerHour}TK /</span>
                    <label className="font-bold">Hourly</label>
                  </div>
                  <div className="flex flex-col items-center w-36 bg-white rounded-xl p-5 text-center ">
                    <input
                      type="radio"
                      value={JSON.stringify({ price: car?.price?.daily?.ratePerDay, type: "daily" })}
                      className="radio radio-success"
                      {...register("priceType")}
                    />
                    <span className="font-semibold">{car?.price?.daily?.ratePerDay}TK /</span>
                    <label className="font-bold">Day</label>
                  </div>
                  </div>
                </div>
                {
                 car?.drivingType=="Company Provided" && <div className="pt-1 space-y-1">
                  <div className="flex flex-col md:flex-row gap-4">
                    <label className="form-control w-full md:w-[50%]">
                      {" "}
                      <span className="label-text font-semibold">
                        Start Time <span className="text-red-500">*</span>
                      </span>
                      <label className="input input-bordered flex items-center gap-2">
                        <Controller
                          name="startTime"
                          control={control}
                          defaultValue={null}
                          render={({ field }) => (
                            <Flatpickr
                              {...field}
                              className="grow"
                              placeholder="Select date"
                              options={{
                                enableTime: true,
                                noCalendar: true,
                                dateFormat: "H:i",
                                minuteIncrement: 30,
                                time_24hr: true,
                              }}
                              onChange={(date) => field.onChange(date)}
                            />
                          )}
                        />
                        <FaClock className="text-gray-500" />
                      </label>
                    </label>
                    <label className="form-control w-full md:w-[50%]">
                      <span className="label-text font-semibold">
                        Pickup Date <span className="text-red-500">*</span>
                      </span>
                      <label className="input input-bordered rounded-lg flex items-center gap-2">
                        <Controller
                          name="pickupDate"
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
                  <label className="form-control w-full ">
                    <span className="label-text">
                      Prickup Location<span className="text-red-500">*</span>
                    </span>

                    <Controller
                      name="pickupLocation"
                      control={control}
                      render={({ field }) => (
                        <CreatableSelect
                          {...field}
                          styles={selectCustomStype}
                          options={locationOptions}
                          isClearable
                          placeholder="Location"
                        />
                      )}
                    />
                    {errors.pickupLocation && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.pickupLocation.message as string}
                      </p>
                    )}
                  </label>
                </div>
                }
              </div>
              <button className="btn btn-success rounded-full px-6">
                <FaArrowRight className="animate-bounceLR me-2" /> Confirm
                Booking
              </button>
            </form>
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
                    <td className="">Booking Security Fee</td>
                    <td className="font-bold">1000 TK</td>
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
