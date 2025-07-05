import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carValidation } from "../../validations/car.validation";
import { useGetAllActiveCarTypesQuery } from "../../redux/features/car-type/carTypeApi";
import {
  useCreateCarMutation,
  useGetSingleCarQuery,
  useUpdateCarMutation,
} from "../../redux/features/car/carApi";
import { toast } from "sonner";
import { FaArrowsRotate } from "react-icons/fa6";
import { TCarType } from "../../type/cartype.type";
import {
  airConditioningOptions,
  bagCapabilityOptions,
  carColorOptions,
  carFeatureOptions,
  drivingOptions,
  fuelOptions,
  seatOptions,
  selectCustomStype,
  transmissionOptions,
} from "../../constant/index";
import Select from "react-select";
import JoditEditor from "jodit-react";
import Loading from "../ui/Loading";
import { useGetAllActivePricesQuery } from "../../redux/features/price/priceApi";
import { TPrice } from "../../type/price.type";

const CarForm = ({ carId }: { carId?: string | null }) => {
  const [isBtnSubmit, setIsBtnSubmit] = useState<boolean>(false);

  const { data: carTypes, isLoading } = useGetAllActiveCarTypesQuery(undefined);
  const { data: prices } = useGetAllActivePricesQuery(undefined);
  const { data: car, isLoading: isSingleCarLoading } = useGetSingleCarQuery(
    carId,
    { skip: !carId }
  );

  const [createCar] = useCreateCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const {
    register,
    control,
    reset,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({ resolver: zodResolver(carValidation) });
  useEffect(() => {
    if (carId && car?.data) {
      reset();
      setValue("_id", car.data._id);
      setValue("name", car.data.name);
      setValue("type", car.data.type._id);
      setValue("price", car.data.price._id);
      setValue("quantity", car.data.quantity);
      setValue("color", car.data.color);
      setValue("seats", car.data.seats);
      setValue("bagCapability", car.data.bagCapability);
      setValue("transmission", car.data.transmission);
      setValue("airConditioning", car.data.airConditioning);
      setValue("drivingType", car.data.drivingType);
      setValue("fuelType", car.data.fuelType);

      setValue("features", car.data.features);
      setValue("description", car.data.description);
    }
  }, [carId, car?.data]);
  console.log(car?.data);
  const handleSubmitCar: SubmitHandler<FieldValues> = async (data) => {
    console.log(data, "form data");
    const formData = new FormData();
    if (Object.keys(data.image).length !== 0) {
      formData.append("file", data.image[0]);
    } else {
      delete data["image"];
    }

    formData.append("data", JSON.stringify(data));

    const uppdateData = {
      _id: data._id,
      data: formData,
    };

    setIsBtnSubmit(true);
    try {
      const res = carId
        ? await updateCar(uppdateData).unwrap()
        : await createCar(formData).unwrap();
      console.log(res,"res");
      toast.success(res.message);
      !carId && reset();
    } catch (error: any) {
      const errorMessages = error?.data.errorMessages;
      console.log(error);
      if (errorMessages.length > 0) {
        errorMessages.forEach((errorMessage: any) =>
          setError(errorMessage.path, {
            type: "manual",
            message: errorMessage.message,
          })
        );
      }
    } finally {

      setIsBtnSubmit(false);
    }
  };
  if (isLoading) {
    return <Loading className="h-screen" />;
  }
  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">
            {carId ? "Update Car" : "Create Car"}
          </h3>
          <label
            htmlFor="my_modal_6"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => reset()}
          >
            X
          </label>
          {isLoading || isSingleCarLoading ? (
            <Loading className="h-32" />
          ) : (
            <form
              onSubmit={handleSubmit(handleSubmitCar)}
              className="space-y-1"
              style={{ zIndex: 9999 }}
            >
              {carId && <input type="text" {...register("_id")} hidden />}
              <div className="flex flex-col md:flex-row gap-5">
                <fieldset className="fieldset w-full md:w-[25%]">
                  <legend className="fieldset-legend">
                    Type <span className="text-red-500">*</span>
                  </legend>
                  <select
                    className="select select-bordered "
                    {...register("type")}
                  >
                    <option value={""}>--Select Type--</option>
                    {carTypes?.data?.map((type: TCarType, index: number) => (
                      <option key={index} value={type._id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <span className="text-red-500">
                      {errors.type.message as string}
                    </span>
                  )}
                </fieldset>
                <fieldset className="fieldset w-full  md:w-[50%]">
                  <legend className="fieldset-legend">
                    Name <span className="text-red-500">*</span>
                  </legend>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Name"
                    className="input input-bordered  w-full"
                  />
                  {errors.name && (
                    <span className="text-red-500">
                      {errors.name.message as string}
                    </span>
                  )}
                </fieldset>
                <fieldset className="fieldset w-full  md:w-[25%]">
                  <legend className="fieldset-legend">
                    Quantity <span className="text-red-500">*</span>
                  </legend>
                  <input
                    type="number"
                    {...register("quantity", { valueAsNumber: true })}
                    placeholder="Name"
                    className="input input-bordered  w-full"
                  />
                  {errors.quantity && (
                    <span className="text-red-500">
                      {errors.quantity.message as string}
                    </span>
                  )}
                </fieldset>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <fieldset className="fieldset w-full  md:w-[25%]">
                  <legend className="fieldset-legend">
                    Price <span className="text-red-500">*</span>
                  </legend>
                  <select
                    className="select select-bordered "
                    {...register("price")}
                  >
                    <option value={""}>--Select Price--</option>
                    {prices?.data?.map((price: TPrice, index: number) => (
                      <option key={index} value={price._id}>
                        {price.hourly.ratePerHour}TK/H ----{" "}
                        {price.daily.ratePerDay}TK/D
                      </option>
                    ))}
                  </select>
                  {errors.price && (
                    <span className="text-red-500">
                      {errors.price.message as string}
                    </span>
                  )}
                </fieldset>
                <fieldset className="fieldset w-full  md:w-[50%]">
                  <legend className="fieldset-legend">Image</legend>
                  <input
                    type="file"
                    {...register("image")}
                    className="file-input file-input-bordered file-input-success w-full"
                  />
                  {errors.image && (
                    <span className="text-red-500">
                      {errors.image.message as string}
                    </span>
                  )}
                </fieldset>

                <fieldset className="fieldset w-full md:w-[25%]">
                  <legend className="fieldset-legend">
                    Color <span className="text-red-500">*</span>
                  </legend>
                  <select
                    className="select select-bordered "
                    {...register("color")}
                  >
                    <option value={""}>--Select Color--</option>
                    {carColorOptions?.map((color, index: number) => (
                      <option key={index} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                  {errors.color && (
                    <span className="text-red-500">
                      {errors.color.message as string}
                    </span>
                  )}
                </fieldset>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <fieldset className="fieldset w-full ">
                  <legend className="fieldset-legend">
                    Seats <span className="text-red-500">*</span>
                  </legend>
                  <select
                    className="select select-bordered "
                    {...register("seats")}
                  >
                    <option value={""}>--Select Seats--</option>
                    {seatOptions?.map((seat, index: number) => (
                      <option key={index} value={seat.value}>
                        {seat.label}
                      </option>
                    ))}
                  </select>
                  {errors.seats && (
                    <span className="text-red-500">
                      {errors.seats.message as string}
                    </span>
                  )}
                </fieldset>
                <fieldset className="fieldset w-full ">
                  <legend className="fieldset-legend">
                    Bag Capability <span className="text-red-500">*</span>
                  </legend>
                  <select
                    className="select select-bordered "
                    {...register("bagCapability", { valueAsNumber: true })}
                  >
                    <option value={""}>--Select Bags Capacity--</option>
                    {bagCapabilityOptions?.map((option, index: number) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.bagCapability && (
                    <span className="text-red-500">
                      {errors.bagCapability.message as string}
                    </span>
                  )}
                </fieldset>
                <fieldset className="fieldset w-full ">
                  <legend className="fieldset-legend">
                    Fuel Type <span className="text-red-500">*</span>
                  </legend>
                  <select
                    className="select select-bordered "
                    {...register("fuelType")}
                  >
                    <option value={""}>--Select Fuel Type--</option>
                    {fuelOptions?.map((option, index: number) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.fuelType && (
                    <span className="text-red-500">
                      {errors.fuelType.message as string}
                    </span>
                  )}
                </fieldset>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <fieldset className="fieldset w-full ">
                  <legend className="fieldset-legend">
                    Transmission <span className="text-red-500">*</span>
                  </legend>
                  <select
                    className="select select-bordered "
                    {...register("transmission")}
                  >
                    <option value={""}>--Select Seats--</option>
                    {transmissionOptions?.map((option, index: number) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.transmission && (
                    <span className="text-red-500">
                      {errors.transmission.message as string}
                    </span>
                  )}
                </fieldset>
                <fieldset className="fieldset w-full ">
                  <legend className="fieldset-legend">
                    Air Conditioning <span className="text-red-500">*</span>
                  </legend>
                  <select
                    className="select select-bordered "
                    {...register("airConditioning")}
                  >
                    <option value={""}>--Select Air Contioning--</option>
                    {airConditioningOptions?.map((option, index: number) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {errors.airConditioning && (
                    <span className="text-red-500">
                      {errors.airConditioning.message as string}
                    </span>
                  )}
                </fieldset>
                <fieldset className="fieldset w-full ">
                  <legend className="fieldset-legend">
                    Driving Type <span className="text-red-500">*</span>
                  </legend>
                  <select
                    className="select select-bordered "
                    {...register("drivingType")}
                  >
                    <option value={""}>--Select Driving Type--</option>
                    {drivingOptions?.map((option, index: number) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {errors.drivingType && (
                    <span className="text-red-500">
                      {errors.drivingType.message as string}
                    </span>
                  )}
                </fieldset>
              </div>
              <fieldset className="fieldset w-full ">
                <legend className="fieldset-legend">
                  Features <span className="text-red-500">*</span>
                </legend>
                <Controller
                  name="features"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={carFeatureOptions}
                      isMulti
                      onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : [];
                        field.onChange(selectedValues);
                      }}
                      styles={selectCustomStype}
                      value={carFeatureOptions.filter((option) =>
                        field.value.includes(option.value)
                      )}
                      placeholder="--Select Features--"
                    />
                  )}
                />
                {errors.features && (
                  <span className="text-red-500">
                    {errors.features.message as string}
                  </span>
                )}
              </fieldset>
              <fieldset className="fieldset w-full ">
                <legend className="fieldset-legend">Description</legend>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <JoditEditor
                      value={field.value}
                      className="-z-20"
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.description && (
                  <span className="text-red-500">
                    {errors.description.message as string}
                  </span>
                )}
              </fieldset>

              <div className="modal-action">
                <button
                  type="submit"
                  className={`btn btn-success  ${
                    isBtnSubmit && "btn-disabled"
                  }`}
                >
                  <FaArrowsRotate />
                  {carId ? "Update" : "Submit "}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default CarForm;
