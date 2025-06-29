import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carTypeValidation } from "../../validations/cartype.validation";
import {
  useCreateCarTypeMutation,
  useGetSingleCarTypeQuery,
  useUpdateCarTypeMutation,
} from "../../redux/features/car-type/carTypeApi";
import { toast } from "sonner";
import { FaArrowsRotate } from "react-icons/fa6";
import Loading from "../ui/Loading";

const CarTypeForm = ({
  editId,
}: {
  editId?: string | null;
}) => {
  const [isBtnSubmit, setIsBtnSubmit] = useState<boolean>(false);
  const [createCarType] = useCreateCarTypeMutation();
  const [updateCarType] = useUpdateCarTypeMutation();
  const {
      data: tpye,
      isLoading,
      isFetching
    } = useGetSingleCarTypeQuery(editId, { skip: !editId });
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
    if (editId && tpye?.data) {
      reset();
      setValue("_id", tpye.data._id);
      setValue("name", tpye.data.name);
      setValue("description", tpye.data.description);
    }
  }, [editId, tpye?.data]);

  const handleSubmitCarType: SubmitHandler<FieldValues> = async (data) => {
    setIsBtnSubmit(true);

    try {
      const formData = new FormData();
      if (Object.keys(data.icon).length !== 0) {
        formData.append("file", data.icon[0]);
      } else {
        delete data["icon"];
      }
      formData.append("data", JSON.stringify(data));
      const uppdateData = {
        _id: data._id,
        data: formData,
      };
      const res = editId
        ? await updateCarType(uppdateData).unwrap()
        : await createCarType(formData).unwrap();
      console.log(res);
      toast.success(res.message);
      !editId && reset();
    } catch (error: any) {
      console.log(error);
      const errorMessages = error?.data.errorMessages;
      if (errorMessages.length > 0) {
        errorMessages.forEach((errorMessage: any) =>
          setError(errorMessage.path, {
            type: "manual",
            message: errorMessage.message,
          })
        );
      }
    }finally{
      setIsBtnSubmit(false);
    }
    
  };

  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal " role="dialog">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-lg">
            {editId ? "Update Type" : "Create Type"}
          </h3>
          <label
            htmlFor="my_modal_6"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => reset()}
          >
            X
          </label>
          {isLoading || isFetching ? (
            <Loading className="h-32" />
          ) : (
            <form onSubmit={handleSubmit(handleSubmitCarType)}>
              {editId && (
                <input type="text" {...register("_id")} hidden />
              )}
               <fieldset className="fieldset w-full">
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
               <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Icon</legend>
                <input
                  type="file"
                  {...register("icon")}
                  className="file-input file-input-bordered file-input-success w-full"
                />
                {errors.icon && (
                  <span className="text-red-500">
                    {errors.icon.message as string}
                  </span>
                )}
              </fieldset>
              <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Description</legend>
                <textarea
                  {...register("description")}
                  className="textarea textarea-bordered resize-none w-full"
                  placeholder="Description"
                ></textarea>
              </fieldset>

              <button
                type="submit"
                className={`btn btn-sm btn-success px-10 my-3 ${
                  isBtnSubmit ? "disabled" : ""
                }`}
              >
                <FaArrowsRotate />
                {editId ? "Update" : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default CarTypeForm;
