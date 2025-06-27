import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  FaArrowRight,
  FaPenToSquare,
  FaRegFaceSadCry,
  FaXmark,
} from "react-icons/fa6";
import { useAppSelector } from "../../../redux/hook";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "../../../validations/user.validation";
import { useUpdateAccountMutation } from "../../../redux/features/user/userApi";
import { toast } from "sonner";

const ProfileInfo = () => {
  const [isBtnSubmitDisable, setIsBtnSubmitDisable] = useState<boolean>(false);
  const [userError, setUserError] = useState<string>('');
  const { user } = useAppSelector((state) => state.auth);
  const [updateAccount] = useUpdateAccountMutation();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({ resolver: zodResolver(userValidation) });
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("nid", user.nid);
    }
  }, [user]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    
    setIsBtnSubmitDisable(true);
    try {
      const res = await updateAccount(data).unwrap();
      if (res.status) {
        toast.success(res.message);
      }
    } catch (error:any) {
      
      const errorMessages = error?.data?.errorMessages;
      if (errorMessages.length > 0) {
        errorMessages.forEach((errorMessage: any) => {
          if (errorMessage.path == "userError") {
            setUserError(errorMessage.message);
          }
          setError(errorMessage.path, {
            type: "manual",
            message: errorMessage.message,
          });
        });
    }
  }
    setIsBtnSubmitDisable(false);
  };
  return (
    <div className="p-3">
     {
      userError &&  <div role="alert" className="alert alert-error rounded-lg py-1 mb-3">
      <FaRegFaceSadCry className="text-xl" />
      <span>{userError}</span>
      <button className="btn btn-sm btn-circle" onClick={()=>setUserError("")}>
        <FaXmark />
      </button>
    </div>
     }
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 ">
        <label className="w-32 h-32 flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 relative">
          <input type="file" className="hidden" accept="image/*" />
          <span className="text-gray-500">Profile</span>
          <div className="absolute bottom-4 right-2 translate-y-1/2 bg-white rounded-full p-1">
            <FaPenToSquare />
          </div>
        </label>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="form-control w-full md:w-[40%]">
            <span className="label-text">
              Name <span className="text-red-500">*</span>
            </span>
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className="input input-bordered w-full "
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message as string}
              </p>
            )}
          </label>
          <label className="form-control w-full md:w-[60%]">
            <span className="label-text">
              Email <span className="text-red-500">*</span>
            </span>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full "
            />
          </label>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="form-control w-full md:w-[40%]">
            <span className="label-text">
              Phone Number <span className="text-red-500">*</span>
            </span>
            <input
              {...register("phone")}
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full "
              disabled={user ? true : false}
            />
          </label>
          <label className="form-control w-full md:w-[60%]">
            <span className="label-text">
              NID <span className="text-red-500">*</span>
            </span>
            <input
              {...register("nid")}
              type="text"
              placeholder="Natioanal Id"
              className="input input-bordered w-full "
            />
            {errors.nid && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nid.message as string}
              </p>
            )}
          </label>
        </div>
        <label className="form-control w-full ">
          <span className="label-text">
            Driving Licence<span className="text-red-500">*</span>
          </span>
          <input
            {...register("drivingLicence")}
            type="text"
            placeholder="Driving Licence"
            className="input input-bordered w-full "
          />
        </label>
        <label className="form-control w-full ">
          <span className="label-text">Address</span>
          <input
            {...register("address")}
            type="text"
            placeholder="Address"
            className="input input-bordered w-full "
          />
        </label>
        <button
          className="btn btn-success rounded-full px-8"
          disabled={isBtnSubmitDisable}
        >
          <FaArrowRight className="me-2 animate-bounceLR" /> Update
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
