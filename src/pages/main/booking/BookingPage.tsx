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
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingValidation } from "../../../validations/booking.validation";
import { useConfirmBookingMutation } from "../../../redux/features/booking/bookingApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "../../../components/ui/Loading";

const BookingPage = () => {
  const { id } = useParams();
  const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false);
  const { data, isLoading } = useGetSingleCarQuery(id);
  const { user } = useAppSelector((state) => state.auth);
  const car = data?.data;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(bookingValidation),
  });
  const priceType = watch("priceType") ? JSON.parse(watch("priceType")) : null;
  const [confirmBoooking] = useConfirmBookingMutation();
 
  useEffect(() => {
    if (car) {
      setValue("car", car?._id);
      setValue("drivingType", car?.drivingType);
    }
    if (user?.role == "user") {
      setValue("user.name", user?.name);
      setValue("user.email", user?.email);
      setValue("user.phone", user?.phone);
    }
  }, [car, user]);
  console.log(car);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsBtnDisable(true);

    try {
      console.log(data.quantity, car.quantity);
      if (data.quantity > car.quantity) {
        setError("quantity", {
          type: "manual",
          message: `Booking availability is ${car?.quantity}`,
        });
        setIsBtnDisable(true);
        return;
      }
      const res = await confirmBoooking(data).unwrap();
     if (res?.status==true) {
      window.location.href=res.data.payment_url
      toast.success("Make Payment!.");
     }
     
    } catch (error: any) {
      const errorMessages = error?.data.errorMessages;
     
      if (errorMessages.length > 0) {
        errorMessages.forEach((errorMessage: any) => {
          if (errorMessage.path == "bookingError") {
            toast.error(errorMessage.message);
            return;
          }
          setError(errorMessage.path, {
            type: "manual",
            message: errorMessage.message,
          });
        });
      }
    }
    setIsBtnDisable(false);
  };
  if (isLoading) {
    return <Loading className="h-screen" />;
  }
  return (
    <div>
      <Breadcrumbs title="Booking" />
      <div className="my-container py-16">
        <div className="flex flex-col md:flex-row gap-4  ">
          <div className="w-full md:w-[65%] space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <input type="text" {...register("car")} hidden />
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

                <div className="pt-1 space-y-1">
                  <div className="flex flex-col md:flex-row gap-4">
                    <label className="form-control w-full md:w-[40%]">
                      <span className="label-text">
                        Name <span className="text-red-500">*</span>
                      </span>
                      <input
                        {...register("user.name")}
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full "
                        readOnly={user?.role == "user"}
                        disabled={user?.role == "user"}
                      />
                      {(errors.user as any)?.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {(errors.user as any).name.message as string}
                        </p>
                      )}
                    </label>
                    <label className="form-control w-full md:w-[60%]">
                      <span className="label-text">
                        Email <span className="text-red-500">*</span>
                      </span>
                      <input
                        {...register("user.email")}
                        type="text"
                        placeholder="Email"
                        className="input input-bordered w-full "
                        readOnly={user?.role == "user"}
                        disabled={user?.role == "user"}
                      />
                      {(errors.user as any)?.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {(errors.user as any).email.message as string}
                        </p>
                      )}
                    </label>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <label className="form-control w-full md:w-[40%]">
                      <span className="label-text">
                        Phone Number <span className="text-red-500">*</span>
                      </span>
                      <input
                        {...register("user.phone")}
                        type="text"
                        placeholder="Phone Number"
                        className="input input-bordered w-full "
                        readOnly={user?.role == "user"}
                        disabled={user?.role == "user"}
                      />
                      {(errors.user as any)?.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {(errors.user as any).phone.message as string}
                        </p>
                      )}
                    </label>
                    <label className="form-control w-full md:w-[60%]">
                      <span className="label-text">
                        NID <span className="text-red-500">*</span>
                      </span>
                      <input
                        {...register("user.nid")}
                        type="number"
                        placeholder="National ID"
                        className="input input-bordered w-full "
                      />
                      {(errors.user as any)?.nid && (
                        <p className="text-red-500 text-sm mt-1">
                          {(errors.user as any).nid.message as string}
                        </p>
                      )}
                    </label>
                  </div>
                  {
                    // If the driving type option is selected as 'Self-Driving,' the user must provide a driving license number. The option will be shown.
                    car?.drivingType == "Self Driving" && (
                      <label className="form-control w-full ">
                        <span className="label-text">
                          Driving License{" "}
                          <span className="text-red-500">*</span>
                        </span>
                        <input
                          {...register("user.drivingLicence")}
                          type="text"
                          placeholder="Driving Licence"
                          className="input input-bordered w-full "
                        />
                        {(errors.user as any)?.drivingLicence && (
                          <p className="text-red-500 text-sm mt-1">
                            {
                              (errors.user as any).drivingLicence
                                .message as string
                            }
                          </p>
                        )}
                      </label>
                    )
                  }
                </div>
              </div>
              <div className="bg-green-100 rounded-xl p-5">
                <p className="font-bold text-2xl border-b pb-2">Quantity</p>
                <label className="form-control w-full md:w-[40%]">
                  <span className="label-text">
                    Quantity <span className="text-red-500">*</span>
                  </span>
                  <input
                    {...register("quantity", { valueAsNumber: true })}
                    type="number"
                    placeholder="Quantity"
                    className="input input-bordered w-full "
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.quantity.message as string}
                    </p>
                  )}
                </label>
              </div>
              <div className="bg-green-100 rounded-xl p-5 ">
                <div className="border-b pb-2 space-y-2">
                  <p className="font-bold text-2xl border-b pb-2">
                    Booking Type & Time
                  </p>
                  <div className="flex flex-wrap gap-5">
                    <div
                      className={`flex flex-col items-center w-36 bg-white rounded-xl p-5 text-center ${
                        errors?.priceType && "border border-red-500"
                      }`}
                    >
                      <input
                        type="radio"
                        value={JSON.stringify({
                          price: car?.price?.hourly?.ratePerHour,
                          type: "hourly",
                        })}
                        className="radio radio-success"
                        {...register("priceType")}
                      />
                      <span className="font-semibold">
                        {car?.price?.hourly?.ratePerHour}TK /
                      </span>
                      <label className="font-bold">Hourly</label>
                    </div>
                    <div
                      className={`flex flex-col items-center w-36 bg-white rounded-xl p-5 text-center ${
                        errors?.priceType && "border border-red-500"
                      }`}
                    >
                      <input
                        type="radio"
                        value={JSON.stringify({
                          price: car?.price?.daily?.ratePerDay,
                          type: "daily",
                        })}
                        className="radio radio-success"
                        {...register("priceType")}
                      />
                      <span className="font-semibold">
                        {car?.price?.daily?.ratePerDay}TK /
                      </span>
                      <label className="font-bold">Day</label>
                    </div>
                  </div>
                </div>
                {car?.drivingType == "Company Provided" && (
                  <div className="pt-1 space-y-1">
                    <div className="flex flex-col md:flex-row gap-4">
                      <label className="form-control w-full md:w-[50%]">
                        {" "}
                        <span className="label-text font-semibold">
                          Pickup Time <span className="text-red-500">*</span>
                        </span>
                        <label className="input input-bordered flex items-center gap-2">
                          <Controller
                            name="startTime"
                            control={control}
                            defaultValue={""}
                            render={({ field }) => (
                              <Flatpickr
                                {...field}
                                className="grow"
                                placeholder="Select Time"
                                options={{
                                  enableTime: true,
                                  noCalendar: true,
                                  dateFormat: "H:i",
                                  minuteIncrement: 30,
                                  time_24hr: true,
                                }}
                                onChange={(time) => {
                                  const formattedTime = time.length
                                    ? time[0].toTimeString().substring(0, 5)
                                    : "";
                                  field.onChange(formattedTime);
                                }}
                              />
                            )}
                          />
                          <FaClock className="text-gray-500" />
                        </label>
                        {errors.startTime && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.startTime.message as string}
                          </p>
                        )}
                      </label>
                      <label className="form-control w-full md:w-[50%]">
                        <span className="label-text font-semibold">
                          Pickup Date <span className="text-red-500">*</span>
                        </span>
                        <label className="input input-bordered rounded-lg flex items-center gap-2">
                          <Controller
                            name="pickupDate"
                            control={control}
                            defaultValue={""}
                            render={({ field }) => (
                              <Flatpickr
                                {...field}
                                className="grow"
                                placeholder="Select date"
                                options={{ dateFormat: "Y-m-d" }}
                                onChange={(date) => field.onChange(date[0])}
                              />
                            )}
                          />
                          <FaCalendarDays className="text-gray-500" />
                        </label>
                        {errors.pickupDate && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.pickupDate.message as string}
                          </p>
                        )}
                      </label>
                    </div>
                    <label className="form-control w-full ">
                      <span className="label-text">
                        Pickup Location<span className="text-red-500">*</span>
                      </span>

                      <Controller
                        name="pickupLocation"
                        control={control}
                        defaultValue={""}
                        render={({ field }) => (
                          <CreatableSelect
                            {...field}
                            styles={selectCustomStype}
                            options={locationOptions}
                            isClearable
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption)
                            }
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
                    <label className="form-control w-full ">
                      <span className="label-text">
                        Prickup Location<span className="text-red-500">*</span>
                      </span>

                      <Controller
                        name="returnLocation"
                        control={control}
                        defaultValue={""}
                        render={({ field }) => (
                          <CreatableSelect
                            {...field}
                            styles={selectCustomStype}
                            options={locationOptions}
                            isClearable
                            onBlur={field.onBlur}
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption)
                            }
                            placeholder="Location"
                          />
                        )}
                      />
                      {errors.returnLocation && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.returnLocation.message as string}
                        </p>
                      )}
                    </label>
                  </div>
                )}
                {car?.drivingType == "Self Driving" && (
                  <div className="flex gap-2">
                    <label className="form-control w-full md:w-[50%]">
                      {" "}
                      <span className="label-text font-semibold">
                        start Time <span className="text-red-500">*</span>
                      </span>
                      <label className="input input-bordered flex items-center gap-2">
                        <Controller
                          name="startTime"
                          control={control}
                          defaultValue={""}
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
                              onChange={(time) => {
                                const formattedTime = time.length
                                  ? time[0].toTimeString().substring(0, 5)
                                  : "";
                                field.onChange(formattedTime);
                              }}
                            />
                          )}
                        />
                        <FaClock className="text-gray-500" />
                      </label>
                      {errors.startTime && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.startTime.message as string}
                        </p>
                      )}
                    </label>
                    <label className="form-control w-full md:w-[50%]">
                      <span className="label-text font-semibold">
                        start Date <span className="text-red-500">*</span>
                      </span>
                      <label className="input input-bordered rounded-lg flex items-center gap-2">
                        <Controller
                          name="startDate"
                          control={control}
                          defaultValue={""}
                          render={({ field }) => (
                            <Flatpickr
                              {...field}
                              className="grow"
                              placeholder="Select date"
                              options={{ dateFormat: "Y-m-d" }}
                              onChange={(date) => field.onChange(date[0])}
                            />
                          )}
                        />
                        <FaCalendarDays className="text-gray-500" />
                      </label>
                      {errors.startDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.startDate.message as string}
                        </p>
                      )}
                    </label>
                  </div>
                )}
              </div>
              <button
                className="btn btn-success rounded-full px-6"
                disabled={isBtnDisable}
              >
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
                    <td className="">Advanced Deposit</td>
                    <td className="font-bold">
                      {(priceType && watch("quantity"))
                        ? priceType?.type == "daily" 
                          ? `${((priceType?.price * 50) / 100)*watch("quantity")} TK`
                          : `${(priceType?.price * 4)*watch("quantity")} TK`
                        : `0 TK`}
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
