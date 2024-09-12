import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SignUpValidation } from "../../validations/signup.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useCreateAccountMutation } from "../../redux/features/user/userApi";
import { toast } from "sonner";
import { useState } from "react";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import { RiAccountPinBoxFill } from "react-icons/ri";

const SignUp = () => {
  const [isBtnSubmitDisable, setIsBtnSubmitDisable] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({ resolver: zodResolver(SignUpValidation) });
  const [createAccount] = useCreateAccountMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsBtnSubmitDisable(true);
    try {
      const res = await createAccount(data).unwrap();
      toast.success(res.message);
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
    setIsBtnSubmitDisable(false);
  };
  return (
    <div>
      <Breadcrumbs title="Register" />
      <div className="flex justify-center items-center my-20">
        <div className="max-w-xl w-full mx-auto p-4">
          <div className="bg-white  shadow-md rounded-md px-10 md:px-16  py-10">
            <div className="border-b border-dashed border-success pb-2 mb-5">
              <h2 className=" text-2xl font-Spicy_Rice">Create an Account</h2>
              <p className="">
                Already a member?{" "}
                <Link to="/signin" className="link-primary">
                  Login
                </Link>{" "}
                here
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">
              {/* Name Field */}
              <div className="form-control w-full">
                <label className="label-text">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className={`input input-bordered w-full ${
                    errors.name && "input-error"
                  }`}
                  placeholder="Full Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message as React.ReactNode}
                  </p>
                )}
              </div>

              {/* Email Address Field */}
              <div className="form-control w-full">
                <label className="label-text">
                  Email  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className={`input input-bordered w-full ${
                    errors.email && "input-error"
                  }`}
                  placeholder="example@site.com"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message as string}
                  </p>
                )}
              </div>
              {/* Phone Number Field */}
              <div className="form-control w-full">
                <label className="label-text">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="input input-bordered w-full"
                  placeholder="Phone Number"
                  {...register("phone")}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                {/* Password Field */}
                <div className="form-control w-full">
                  <label className="label-text">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    className={`input input-bordered w-full ${
                      errors.password && "input-error"
                    }`}
                    placeholder="Password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="form-control w-full">
                  <label className="label-text">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className={`input input-bordered w-full ${
                      errors.confirmPassword && "input-error"
                    }`}
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                  />
                  {errors?.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message as string}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-success w-full"
                  disabled={isBtnSubmitDisable}
                >
                 <RiAccountPinBoxFill /> SIGN UP
                </button>
              </div>
            </form>

            <div>
              <p className="text-gray-600 text-sm py-1">
                By clicking "SIGN UP" I agree to{" "}
                <Link to={""} className="link-primary">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link to={""} className="link-primary">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
