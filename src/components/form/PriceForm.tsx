import { useEffect, useState } from "react";
import {
  useCreatePriceMutation,
  useGetSinglePriceQuery,
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
import Loading from "../ui/Loading";

const PriceForm = ({ editId }: { editId?: string | null }) => {
  const [isBtnSubmit, setIsBtnSubmit] = useState<boolean>(false);
  const [createPrice] = useCreatePriceMutation();
  const [updatePrice] = useUpdatePriceMutation();
  const {
    data: price,
    isLoading,
    isFetching,
  } = useGetSinglePriceQuery(editId, { skip: !editId });
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
    if (editId && price?.data) {
      reset();
      setValue("_id", price.data._id);
      setValue("hourly.ratePerHour", price.data.hourly.ratePerHour);
      setValue("hourly.policy", price.data.hourly.policy);
      setValue("daily.ratePerDay", price.data.daily.ratePerDay);
      setValue("daily.policy", price.data.daily.policy);
    }
  }, [editId, price?.data]);

  const handleSubmitCarType: SubmitHandler<FieldValues> = async (data) => {
    setIsBtnSubmit(true);

    try {
      const uppdateData = {
        _id: data._id,
        data: data,
      };
      const res = editId
        ? await updatePrice(uppdateData).unwrap()
        : await createPrice(data).unwrap();
      toast.success(res.message);
      !editId && reset();
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
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-lg">
            {editId ? "Update Price" : "Create Price"}
          </h3>
          <label
            htmlFor="my_modal_6"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => reset()}
          >
            X
          </label>
          {isLoading || isFetching ? (
            <Loading className="h-40" />
          ) : (
            <form onSubmit={handleSubmit(handleSubmitCarType)}>
              {editId && <input type="text" {...register("_id")} hidden />}
              <div className="flex flex-col md:flex-row gap-5 ">
                <div className="w-full md:w-[50%]">
                  <p className="text-xl font-semibold border-b pb-1">Hourly</p>
                 <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">
                      Price <span className="text-red-500">*</span>
                    </legend>
                    <input
                      type="number"
                      {...register("hourly.ratePerHour")}
                      placeholder="Houly Price"
                      className="input   w-full"
                    />
                    {(errors.hourly as any)?.ratePerHour && (
                      <span className="text-red-500">
                        {(errors.hourly as any).ratePerHour.message as string}
                      </span>
                    )}
                  </fieldset>
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">Policy</legend>
                    <Controller
                      name="hourly.policy"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <JoditEditor
                          config={{ height: "300px" }}
                          value={field.value}
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
                  </fieldset>
                </div>
                <div className="w-full md:w-[50%]">
                  <p className="text-xl font-semibold border-b pb-1">Daily</p>
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">
                      Price <span className="text-red-500">*</span>
                    </legend>
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
                  </fieldset>
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">Policy</legend>
                    <Controller
                      name="daily.policy"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <JoditEditor
                        config={{ height: "300px" }}
                          value={field.value}
                          
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
                  </fieldset>
                </div>
              </div>
              <div className="modal-action">
                <button
                  type="submit"
                  className={`btn btn-success  ${
                    isBtnSubmit && "btn-disabled"
                  }`}
                >
                  <FaArrowsRotate />
                  {editId ? "Update" : "Submit "}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default PriceForm;
