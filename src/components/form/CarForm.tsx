import { useEffect, useState } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carValidation } from "../../validations/car.validation";
import { useGetAllActiveCarTypesQuery } from "../../redux/features/car-type/carTypeApi";
import { useCreateCarMutation, useUpdateCarMutation } from "../../redux/features/car/carApi";
import { toast } from "sonner";
import { FaArrowsRotate } from "react-icons/fa6";
import { TCarType } from "../../type/cartype.type";
import { carColorOptions, carFeatureOptions } from "../../constant";
import Select from 'react-select';
import JoditEditor from "jodit-react";
import Loading from "../ui/Loading";


const CarForm = ({ editableData }: { editableData?: FieldValues | null }) => {
  const [isBtnSubmit, setIsBtnSubmit] = useState<boolean>(false);

  const { data: carTypes ,isLoading} = useGetAllActiveCarTypesQuery(undefined);
  
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
  } = useForm<FieldValues>({resolver:zodResolver(carValidation)});
  useEffect(() => {
    if (editableData) {
      reset();
      setValue("_id", editableData._id);
      setValue("name", editableData.name);
      setValue("type",editableData.type._id)
      setValue("color",editableData.color)
      setValue("pricePerHour",editableData.pricePerHour)
      setValue("features",editableData.features)
      setValue("description", editableData.description);
    }
    if (editableData==null) {
      reset()
    }
  }, [editableData,isLoading]);

  const handleSubmitCar: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)
    const formData=new FormData()
    formData.append("file",data.image[0])
    formData.append("data",JSON.stringify(data))
    const uppdateData={
      _id:data._id,
      data:formData
    }
    console.log(uppdateData)
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
      console.log(error)
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
  return <Loading className="h-screen"/>
}
  return (
    <form onSubmit={handleSubmit(handleSubmitCar)} style={{zIndex:9999}}>
      {editableData && <input type="text" {...register("_id")} hidden />}
      <div className="flex flex-col md:flex-row gap-5">
        <label className="form-control w-full md:w-[30%]">
          <span className="label-text ">
            Type <span className="text-red-500">*</span>
          </span>
          <select className="select select-bordered " {...register("type")}>
            <option value={""}>--Select Type--</option>
            {carTypes?.data?.map((type: TCarType,index:number) => (
              <option key={index} value={type._id}>{type.name}</option>
            ))}
          </select>
          {errors.type && (
            <span className="text-red-500">
              {errors.type.message as string}
            </span>
          )}
        </label>
        <label className="form-control w-full  md:w-[70%]">
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
        <label className="form-control w-full md:w-[30%]">
          <span className="label-text ">
            Color <span className="text-red-500">*</span>
          </span>
          <select className="select select-bordered " {...register("color")}>
            <option value={""}>--Select Color--</option>
            {carColorOptions?.map((color,index:number) => (
              <option key={index} value={color.value}>{color.label}</option>
            ))}
          </select>
          {errors.color && (
            <span className="text-red-500">
              {errors.color.message as string}
            </span>
          )}
        </label>
        <label className="form-control w-full  md:w-[30%]">
          <span className="label-text ">
            Price for Per Hour  <span className="text-red-500">*</span>
          </span>
          <input
            type="number"
            {...register("pricePerHour")}
            placeholder="Price"
            className="input input-bordered  w-full"
          />
          {errors.pricePerHour && (
            <span className="text-red-500">
              {errors.pricePerHour.message as string}
            </span>
          )}
        </label>
        <label className="form-control w-full  md:w-[40%]">
          <span className="label-text ">
            Image 
          </span>
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
                const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                field.onChange(selectedValues);
              }}
              value={carFeatureOptions.filter(option => field.value.includes(option.value))}
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
      <label className="form-control w-full " >
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
