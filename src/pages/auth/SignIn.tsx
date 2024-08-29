import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SignInValidation } from "../../validations/signin.validation";
import { Link } from "react-router-dom";
import useTitle from "../../hook/useTitle";
import { useSignInMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/auth/authSlice";

const SignIn = () => {
  useTitle("Sign In");
  const [isBtnSubmitDisable, setIsBtnSubmitDisable] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({ resolver: zodResolver(SignInValidation) });
  const [signin] = useSignInMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    setIsBtnSubmitDisable(true);
    try {
      const res = await signin(data).unwrap();
      console.log(res);
      const userdata = {
        user: jwtDecode(res.data.token),
        token: res.data.token,
      };
      console.log(userdata);
      dispatch(setUser(userdata));
      toast.success(res.message);
    } catch (error: any) {
      console.log(error);
      const errorMessages = error?.data?.errorMessages;
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-2xl w-full mx-auto p-4">
        <div className="flex flex-col md:flex-row md:items-center border border-primary border-dashed rounded-md p-3 mb-3">
          <h2 className="grow text-2xl font-semibold">
            Welcome to Dreams Trip
          </h2>
          <p className="">
            New member?{" "}
            <Link to="/signup" className="link-primary">
              Register
            </Link>{" "}
            here
          </p>
        </div>
        <div className="bg-white shadow-md rounded-md px-20 py-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Email Address Field */}
            <div className="form-control w-full">
              <label className="label-text">Email Address</label>
              <input
                type="email"
                id="email"
                className={`input input-bordered w-full ${
                  errors.email && "input-error"
                }`}
                placeholder="email@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label-text">Password</label>
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

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary uppercase w-full"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
