
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carTypeValidation } from "../../validations/cartype.validation";
import {
  useCreateCarTypeMutation,
  useUpdateCarTypeMutation,
} from "../../redux/features/car-type/carTypeApi";
import { toast } from "sonner";
import { FaArrowsRotate } from "react-icons/fa6";


const CarTypeForm = ({ editableData }: { editableData?: FieldValues | null }) => {
  const [isBtnSubmit, setIsBtnSubmit] = useState<boolean>(false);
  const [createCarType] = useCreateCarTypeMutation();
  const [updateCarType] = useUpdateCarTypeMutation();
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(carTypeValidation),
  });
  useEffect(() => {
    if (editableData) {
      reset();
      setValue("_id", editableData._id);
      setValue("name", editableData.name);
      setValue("description", editableData.description);
    }
  }, [editableData]);

  const handleSubmitCarType: SubmitHandler<FieldValues> = async (data) => {
    setIsBtnSubmit(true);
    try {
      const res = editableData
        ? await updateCarType(data).unwrap()
        : await createCarType(data).unwrap();
        console.log(res)
      toast.success(res.message);
      !editableData && reset();
    } catch (error: any) {
      const errorMessages = error?.data.errorMessages;
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

  return (
    <form onSubmit={handleSubmit(handleSubmitCarType)}>
      {editableData && <input type="text" {...register("_id")} hidden />}
      <label className="form-control w-full ">
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
          <span className="text-red-500">{errors.name.message as string}</span>
        )}
      </label>

      <label className="form-control w-full ">
        <span className="label-text ">Description</span>
        <textarea
          {...register("description")}
          className="textarea textarea-bordered resize-none"
          placeholder="Description"
        ></textarea>
      </label>

      <button
        type="submit"
        className={`btn btn-sm btn-success rounded-full px-10 my-3 ${
          isBtnSubmit ? "disabled" : ""
        }`}
      >
        <FaArrowsRotate />
        {editableData ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default CarTypeForm;
