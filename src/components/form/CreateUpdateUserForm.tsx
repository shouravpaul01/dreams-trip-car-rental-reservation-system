import { useEffect, useState } from "react";
import { FaArrowsRotate, FaEye, FaEyeSlash } from "react-icons/fa6";
import { userRoles } from "../../constant";
import { adminCreateUserSchemaValidation, adminEditUserSchemaValidation } from "../../validations/user.validation";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCreateUserByAdminMutation, useGetSingleUserQuery, useUpdateUserMutation } from "../../redux/features/user/userApi";
import Loading from "../ui/Loading";

export default function CreateUpdateUserForm({userEmail}:{userEmail:string}
) {
  const [isBtnSubmit, setIsBtnSubmit] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [createUserByAdmin] = useCreateUserByAdminMutation();
  const [updateUser] = useUpdateUserMutation();
  const {
    data: user,
    isLoading,
    isFetching
  } = useGetSingleUserQuery(userEmail, { skip: !userEmail });
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userEmail ? adminEditUserSchemaValidation : adminCreateUserSchemaValidation) });
  useEffect(() => {
    if (userEmail && user?.data) {
      reset();
      setValue("_id", user.data?._id);
      setValue("name", user.data?.name);
      setValue("email", user.data?.email);
      setValue("phone", user.data?.phone);
      setValue("role", user.data?.role);
    }
  }, [userEmail,user?.data]);

  const handleSubmitUser: SubmitHandler<FieldValues> = async (data) => {
    setIsBtnSubmit(true);
    console.log(data, "form");
    try {
      const updateData = {
        _id: data._id,
        payload: data,
      };
      const res = userEmail ? await updateUser(updateData).unwrap() : await createUserByAdmin(data).unwrap();

      console.log(res, "res");
      toast.success(res.message);
    !userEmail && reset();
    } catch (error: any) {
      console.log(error, "error");
      const errorMessages = error?.data.errorMessages;
      if (errorMessages?.length > 0) {
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
  
  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal " role="dialog">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-lg">
            {userEmail ? "Update User" : "Create User"}
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
            <form onSubmit={handleSubmit(handleSubmitUser)} className="pt-4">
              {userEmail && (
                <input type="text" {...register("_id")} hidden />
              )}
              <div className="flex flex-col md:flex-row gap-2">
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">
                    Name <span className="text-red-500">*</span>
                  </legend>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Name"
                    className="input w-full"
                  />
                  {errors.name && (
                    <span className="text-red-500">{errors?.name.message as string}</span>
                  )}
                </fieldset>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend">
                    Phone <span className="text-red-500">*</span>
                  </legend>
                  <input
                    type="text"
                    {...register("phone")}
                    placeholder="Phone"
                    className="input w-full"
                  />
                  {errors.phone && (
                    <span className="text-red-500">
                      {errors?.phone.message as string}
                    </span>
                  )}
                </fieldset>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <fieldset className="fieldset w-full md:w-3/5">
                  <legend className="fieldset-legend">
                    Email <span className="text-red-500">*</span>
                  </legend>
                  <input
                    type="text"
                    {...register("email")}
                    placeholder="Email"
                    autoComplete="Email"
                    className="input   w-full"
                  />
                  {errors.email && (
                    <span className="text-red-500">
                      {errors?.email?.message as string}
                    </span>
                  )}
                </fieldset>
                <fieldset className="fieldset w-full md:w-2/5">
                  <legend className="fieldset-legend">
                    Role <span className="text-red-500">*</span>
                  </legend>
                  <select {...register("role")} className="select  w-full">
                    <option disabled={true} value={""}>
                      Select Role
                    </option>
                    {userRoles.map((role, index) => (
                      <option key={index} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>

                  {errors.role && (
                    <span className="text-red-500">
                      {errors.role.message as any}
                    </span>
                  )}
                </fieldset>
              </div>
              {!userEmail && (
                <div className="flex flex-col md:flex-row gap-2">
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">Password</legend>
                    <label className="input ">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className="grow"
                        autoComplete="password"
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </label>
                    {errors.password && (
                      <span className="text-red-500">
                        {errors?.password.message as string}
                      </span>
                    )}
                  </fieldset>
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">
                      Confirm Password
                    </legend>
                    <label className="input ">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        className="grow"
                        autoComplete="current-password"
                        placeholder="Confirm Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </label>
                    {errors.confirmPassword && (
                      <span className="text-red-500">
                        {errors?.confirmPassword.message as string}
                      </span>
                    )}
                  </fieldset>
                </div>
              )}
              <div className="modal-action">
                <button
                  type="submit"
                  className={`btn btn-success  ${isBtnSubmit && "btn-disabled"}`}
                >
                  <FaArrowsRotate />
                  {userEmail ? "Update" : "Submit "}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
