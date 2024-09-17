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

const CarForm = ({ editableData }: { editableData?: FieldValues | null }) => {
  const [isBtnSubmit, setIsBtnSubmit] = useState<boolean>(false);

  const { data: carTypes, isLoading } = useGetAllActiveCarTypesQuery(undefined);
  const {data:prices}=useGetAllActivePricesQuery(undefined)

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
    if (editableData) {
      reset();
      setValue("_id", editableData._id);
      setValue("name", editableData.name);
      setValue("type", editableData.type._id);
      setValue("color", editableData.color);
      setValue("price", editableData.price);
      setValue("features", editableData.features);
      setValue("description", editableData.description);
    }
    if (editableData == null) {
      reset();
    }
  }, [editableData, isLoading]);

  const handleSubmitCar: SubmitHandler<FieldValues> = async (data) => {

    const formData = new FormData();
    if (Object.keys(data.image).length!==0) {
      formData.append("file", data.image[0]);
    }else{
      delete data["image"]
    }
    
    formData.append("data", JSON.stringify(data));
    const uppdateData = {
      _id: data._id,
      data: formData,
    };
   
    setIsBtnSubmit(true);
    try {
      const res = editableData
        ? await updateCar(uppdateData).unwrap()
        : await createCar(formData).unwrap();
      console.log(res);
      toast.success(res.message);
      !editableData && reset();
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
    }
    setIsBtnSubmit(false);
  };
  if (isLoading) {
    return <Loading className="h-screen" />;
  }
  return (
    <form onSubmit={handleSubmit(handleSubmitCar)} className="space-y-1" style={{ zIndex: 9999 }}>
      {editableData && <input type="text" {...register("_id")} hidden />}
      <div className="flex flex-col md:flex-row gap-5">
        <label className="form-control w-full md:w-[25%]">
          <span className="label-text ">
            Type <span className="text-red-500">*</span>
          </span>
          <select className="select select-bordered " {...register("type")}>
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
        </label>
        <label className="form-control w-full  md:w-[75%]">
          <span className="label-text ">
            Name <span className="text-red-500">*</span>
          </span>
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
        </label>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="form-control w-full  md:w-[25%]">
          <span className="label-text ">
            Price <span className="text-red-500">*</span>
          </span>
          <select className="select select-bordered " {...register("price")}>
            <option value={""}>--Select Price--</option>
            {prices?.data?.map((price:TPrice, index: number) => (
              <option key={index} value={price._id}>
                {price.hourly.ratePerHour}TK/H ---- {price.daily.ratePerDay}TK/D
              </option>
            ))}
          </select>
          {errors.price && (
            <span className="text-red-500">
              {errors.price.message as string}
            </span>
          )}
        </label>
        <label className="form-control w-full  md:w-[50%]">
          <span className="label-text ">Image</span>
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
        </label>
        <label className="form-control w-full md:w-[25%]">
          <span className="label-text ">
            Color <span className="text-red-500">*</span>
          </span>
          <select className="select select-bordered " {...register("color")}>
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
        </label>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="form-control w-full ">
          <span className="label-text ">
            Seats <span className="text-red-500">*</span>
          </span>
          <select className="select select-bordered " {...register("seats")}>
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
        </label>
        <label className="form-control w-full ">
          <span className="label-text ">
            Bag Capability <span className="text-red-500">*</span>
          </span>
          <select className="select select-bordered " {...register("bagCapability")}>
            <option value={""}>--Select Seats--</option>
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
        </label>
        <label className="form-control w-full ">
          <span className="label-text ">
            Fuel Type <span className="text-red-500">*</span>
          </span>
          <select className="select select-bordered " {...register("fuelType")}>
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
        </label>
        
      </div>
      <div className="flex flex-col md:flex-row gap-5">
      <label className="form-control w-full ">
          <span className="label-text ">
            Transmission <span className="text-red-500">*</span>
          </span>
          <select className="select select-bordered " {...register("transmission")}>
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
        </label>
        <label className="form-control w-full ">
          <span className="label-text ">
          Air Conditioning <span className="text-red-500">*</span>
          </span>
          <select className="select select-bordered " {...register("airConditioning")}>
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
        </label>
        <label className="form-control w-full ">
          <span className="label-text ">
          Driving Type <span className="text-red-500">*</span>
          </span>
          <select className="select select-bordered " {...register("drivingType")}>
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
        </label>
      </div>
      <label className="form-control w-full  ">
          <span className="label-text ">
            Features <span className="text-red-500">*</span>
          </span>
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
        </label>
      <label className="form-control w-full ">
        <span className="label-text ">Description</span>
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
      </label>

      <button
        type="submit"
        className={`btn btn-sm btn-success rounded-full px-10 my-3 `}
        disabled={isBtnSubmit}
      >
        <FaArrowsRotate />
        {editableData ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default CarForm;
