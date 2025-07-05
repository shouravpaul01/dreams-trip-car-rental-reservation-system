import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SignInValidation } from "../../validations/signin.validation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../hook/useTitle";
import { useSignInMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/auth/authSlice";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import { FaArrowRightToBracket, FaEye, FaEyeSlash } from "react-icons/fa6";

const SignIn = () => {
  useTitle("Sign In");

  const [isBtnSubmitDisable, setIsBtnSubmitDisable] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      
    },
  });
  const [signin] = useSignInMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsBtnSubmitDisable(true);
    try {
      const res = await signin(data).unwrap();
      const userdata = {
        user: jwtDecode(res.data.token),
        token: res.data.token,
      };
      dispatch(setUser(userdata));
      navigate(currentLocation, { replace: true });
      toast.success(res.message);
    } catch (error: any) {
      const errorMessages = error?.data?.errorMessages;
      if (errorMessages.length > 0) {
        errorMessages.forEach((errorMessage: any) => {
          if (errorMessage.path == "auth") {
            setAuthError(errorMessage.message);
          }
          setError(errorMessage.path, {
            type: "manual",
            message: errorMessage.message,
          });
        });
      }
    } finally {
      setIsBtnSubmitDisable(false);
    }
  };
  return (
    <div>
      <Breadcrumbs title="Login" />
      <div className="flex justify-center items-center my-20">
        <div className="max-w-xl w-full mx-auto p-4">
          <div className="bg-white  shadow-md rounded-md px-10 md:px-20  py-10 space-y-3.5">
            <div className="border-b border-dashed border-success pb-2">
              <h2 className=" text-2xl font-Spicy_Rice">
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
            <div className="flex gap-1.5">
              <button className="btn btn-xs btn-soft btn-success" onClick={() => {setValue("email", "paul.shourav01@gmail.com"); setValue("password", "paul.shourav01@gmail");}}>User Credentials</button>
              <button className="btn btn-xs btn-soft btn-success" onClick={() => {setValue("email", "admin@gmail.com"); setValue("password", "admin@gmail");}}>Admin Credentials</button>
            </div>
            {authError && <p className="text-red-500 ">{authError}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              {/* Email Address Field */}
               <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">
                  Email <span className="text-red-500">*</span>
                </legend>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered w-full "
                  placeholder="email@site.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message as string}
                  </p>
                )}
              </fieldset>

              <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">
                  Password <span className="text-red-500">*</span>
                </legend>
                <label className="input w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="grow "
                    placeholder="Password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </label>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message as string}
                  </p>
                )}
              </fieldset>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-success uppercase w-full"
                  disabled={isBtnSubmitDisable}
                >
                  <FaArrowRightToBracket /> Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
