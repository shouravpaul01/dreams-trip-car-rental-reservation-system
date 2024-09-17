import React, { useEffect, useState } from "react";
import {
  useCreatePriceMutation,
  useUpdatePriceMutation,
} from "../../redux/features/price/priceApi";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { priceValidation } from "../../validations/price.validation";
import { FaArrowsRotate } from "react-icons/fa6";
import JoditEditor from "jodit-react";

const PriceForm = ({ editableData }: { editableData?: FieldValues | null }) => {
  const [isBtnSubmit, setIsBtnSubmit] = useState<boolean>(false);
  const [createPrice] = useCreatePriceMutation();
  const [updatePrice] = useUpdatePriceMutation();
  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(priceValidation),
    defaultValues: {
      hourly: {
        policy:
          "<p><strong>Hourly Rate Policy:</strong></p><ul><li>The hourly rate applies for every full hour of service. Partial hours will be rounded up to the next full hour.</li><li>Cancellations must be made at least 24 hours in advance to avoid being charged for a minimum of one hour.</li></ul>",
      },
      daily: {
        policy:
          "<p><strong>Daily Rate Policy:</strong></p><ul><li>The daily rate applies for an 8-hour rental period. Any rentals exceeding the 8-hour period will incur additional charges based on the hourly rate.</li><li>A full day’s rate will be charged regardless of whether the vehicle is returned earlier than the 8-hour period.</li><li>Daily rates are subject to availability and may change during peak seasons.</li></ul>",
      },
    },
  });
  useEffect(() => {
    if (editableData) {
      reset();
      setValue("_id", editableData._id);
      setValue("hourly.ratePerHour", editableData.hourly.ratePerHour);
      setValue("hourly.policy", editableData.hourly.policy);
      setValue("daily.ratePerDay", editableData.daily.ratePerDay);
      setValue("daily.policy", editableData.daily.policy);
    }
  }, [editableData]);

  const handleSubmitCarType: SubmitHandler<FieldValues> = async (data) => {
    setIsBtnSubmit(true);

    try {
      const uppdateData = {
        _id: data._id,
        data: data,
      };
      const res = editableData
        ? await updatePrice(uppdateData).unwrap()
        : await createPrice(data).unwrap();
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
      <div className="flex flex-col md:flex-row gap-10 mt-2">
        <div className="w-full md:w-[50%]">
          <p className="text-xl font-semibold border-b pb-1">Hourly</p>
          <label className="form-control w-full ">
            <span className="label-text ">
              Price <span className="text-red-500">*</span>
            </span>
            <input
              type="number"
              {...register("hourly.ratePerHour")}
              placeholder="Houly Price"
              className="input input-bordered  w-full"
            />
            {(errors.hourly as any)?.ratePerHour && (
              <span className="text-red-500">
                {(errors.hourly as any).ratePerHour.message as string}
              </span>
            )}
          </label>
          <label className="form-control w-full ">
            <span className="label-text ">Policy</span>
            <Controller
              name="hourly.policy"
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
            {(errors.hourly as any)?.policy && (
              <span className="text-red-500">
                {(errors.hourly as any).policy.message as string}
              </span>
            )}
          </label>
        </div>
        <div className="w-full md:w-[50%]">
          <p className="text-xl font-semibold border-b pb-1">Daily</p>
          <label className="form-control w-full ">
            <span className="label-text ">
              Price <span className="text-red-500">*</span>
            </span>
            <input
              type="number"
              {...register("daily.ratePerDay")}
              placeholder="Daily Price"
              className="input input-bordered  w-full"
            />
            {(errors.daily as any)?.ratePerDay && (
              <span className="text-red-500">
                {(errors.daily as any)?.ratePerDay.message as string}
              </span>
            )}
          </label>
          <label className="form-control w-full ">
            <span className="label-text ">Policy</span>
            <Controller
              name="daily.policy"
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
            {(errors.daily as any)?.policy && (
              <span className="text-red-500">
                {(errors.daily as any)?.policy.message as string}
              </span>
            )}
          </label>
        </div>
      </div>

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

export default PriceForm;
