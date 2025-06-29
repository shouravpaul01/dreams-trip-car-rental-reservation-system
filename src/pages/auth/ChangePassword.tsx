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
import { FaArrowRightToBracket } from "react-icons/fa6";

export const ChangePassword = () => {
  useTitle("Change Password");

  const [isBtnSubmitDisable, setIsBtnSubmitDisable] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(SignInValidation),
   
  });


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // setIsBtnSubmitDisable(true);
    // try {
    //   const res = await signin(data).unwrap();
    //   const userdata = {
    //     user: jwtDecode(res.data.token),
    //     token: res.data.token,
    //   };
    //   dispatch(setUser(userdata));
    //   navigate(currentLocation, { replace: true });
    //   toast.success(res.message);
    // } catch (error: any) {
    //   const errorMessages = error?.data?.errorMessages;
    //   if (errorMessages.length > 0) {
    //     errorMessages.forEach((errorMessage: any) => {
    //       if (errorMessage.path == "auth") {
    //         setAuthError(errorMessage.message);
    //       }
    //       setError(errorMessage.path, {
    //         type: "manual",
    //         message: errorMessage.message,
    //       });
    //     });
    //   }
    // } finally {
    //   setIsBtnSubmitDisable(false);
    // }
  };
  return (
    <div>
      
      <div className="flex justify-center items-center my-20">
        <div className="max-w-xl w-full mx-auto p-4">
          <div className="bg-white  shadow-md rounded-md px-10 md:px-20  py-10">
            <h2 className="text-2xl font-bold text-center mb-4">
              Change Password
            </h2>
            {authError && <p className="text-red-500 pb-2">{authError}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              {/* Email Address Field */}
               <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
              Current Password <span className="text-red-500">*</span>
            </legend>
                <input
                  type="password"
                  className="input input-bordered w-full "
                  placeholder="Password"
                  {...register("currentPassword")}
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currentPassword.message as string}
                  </p>
                )}
              </fieldset>

              <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
              New Password <span className="text-red-500">*</span>
            </legend>
                <input
                  type="password"
                  className="input input-bordered w-full "
                  placeholder="New Password"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword.message as string}
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


