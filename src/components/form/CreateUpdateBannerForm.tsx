import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaArrowsRotate } from "react-icons/fa6";
import {
  useCreateBannerMutation,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
} from "../../redux/banner/bannerAPi";
import Loading from "../ui/Loading";
import { useGetAllCarsQuery } from "../../redux/features/car/carApi";
import { TCar } from "../../type/car.type";
import { toast } from "sonner";
import { createBannerValidation, updateBannerValidation } from "../../validations/banner.validation";

export default function CreateUpdateBannerForm({
  bannerId,
}: {
  bannerId: string;
}) {
  const [isBtnSubmit, setIsBtnSubmit] = useState<boolean>(false);
  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const { data: activeCars } = useGetAllCarsQuery([
    { label: "isActive", value: true },
  ]);
  const {
    data: banner,
    isLoading,
    isFetching,
  } = useGetSingleBannerQuery(bannerId, { skip: !bannerId });
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(bannerId?updateBannerValidation:createBannerValidation),
  });
  useEffect(() => {
    if (bannerId && banner?.data) {
      reset();
      setValue("_id", banner.data._id);
      setValue("title", banner.data.title);
      setValue("subtitle", banner.data.subtitle);
      setValue("link", banner.data.link);
       setValue("car", banner.data.car?._id);
      setValue("description", banner.data.description);
    }
  }, [bannerId, banner?.data]);

  const handleSubmitCarType: SubmitHandler<FieldValues> = async (data) => {
    setIsBtnSubmit(true);

    try {
      const formData = new FormData();
      if (Object.keys(data.image).length !== 0) {
        formData.append("file", data.image[0]);
      } else {
        delete data["image"];
      }
      formData.append("data", JSON.stringify(data));
      const uppdateData = {
        _id: data._id,
        payload: formData,
      };
      const res = bannerId
        ? await updateBanner(uppdateData).unwrap()
        : await createBanner(formData).unwrap();
      console.log(res);
      toast.success(res.message);
      !bannerId && reset();
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
            {bannerId ? "Update Banner" : "Create Banner"}
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
              {bannerId && <input type="text" {...register("_id")} hidden />}
              <div className="flex flex-col md:flex-row gap-2">
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">
                    Title <span className="text-red-500">*</span>
                  </legend>
                  <input
                    type="text"
                    {...register("title")}
                    placeholder="Title"
                    className="input  w-full"
                  />
                  {errors.title && (
                    <span className="text-red-500">
                      {errors.title.message as string}
                    </span>
                  )}
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">Sub Title</legend>
                  <input
                    type="text"
                    {...register("subtitle")}
                    placeholder="Sub Title"
                    className="input w-full"
                  />
                  {errors.subtitle && (
                    <span className="text-red-500">
                      {errors.subtitle.message as string}
                    </span>
                  )}
                </fieldset>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">
                    Image <span className="text-red-500">*</span>
                  </legend>
                  <input
                    type="file"
                    {...register("image")}
                    className="file-input file-input-success w-full"
                  />

                  {errors.image && (
                    <span className="text-red-500">
                      {errors.image.message as string}
                    </span>
                  )}
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">
                    Car <span className="text-red-500">*</span>
                  </legend>
                  <select
                    defaultValue=""
                    {...register("car")}
                    className="select"
                  >
                    <option disabled={true} value={undefined}>Select Car</option>
                    {activeCars?.data?.data?.map((car: TCar, index:number) => (
                      <option key={index} value={car._id}>
                        <div className="flex gap-1.5">
                          <img className="mask mask-squircle" src={car.image} />
                          <div>
                            <p className="font-semibold">{car.name}</p>
                          </div>
                        </div>
                      </option>
                    ))}
                  </select>

                  {errors.car && (
                    <span className="text-red-500">
                      {errors.car.message as string}
                    </span>
                  )}
                </fieldset>
              </div>
              <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">
                    Link 
                  </legend>
                  <input
                    type="url"
                    {...register("link")}
                    placeholder="Link"
                    className="input  w-full"
                  />
                  {errors.link && (
                    <span className="text-red-500">
                      {errors.link.message as string}
                    </span>
                  )}
                </fieldset>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Description <span className="text-red-500">*</span></legend>
                <textarea
                  {...register("description")}
                  className="textarea textarea-bordered resize-none w-full"
                  placeholder="Description"
                ></textarea>
                {errors.description && (
                    <span className="text-red-500">
                      {errors.description.message as string}
                    </span>
                  )}
              </fieldset>

              <button
                type="submit"
                className={`btn btn-sm btn-success px-10 my-3 ${
                  isBtnSubmit ? "disabled" : ""
                }`}
              >
                <FaArrowsRotate />
                {bannerId ? "Update" : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
