import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SignInValidation } from "../../validations/signin.validation";

import useTitle from "../../hook/useTitle";

import { FaArrowRightToBracket } from "react-icons/fa6";


export const ChangePassword = () => {
  useTitle("Change Password");


 
  
  

  const {
    register,
    handleSubmit,
 
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(SignInValidation),
   
  });


  const onSubmit: SubmitHandler<FieldValues> = async () => {
  
  };
  return (
    <div>
      
      <div className="flex justify-center items-center my-20">
        <div className="max-w-xl w-full mx-auto p-4">
          <div className="bg-white  shadow-md rounded-md px-10 md:px-20  py-10">
            <h2 className="text-2xl font-bold text-center mb-4">
              Change Password
            </h2>
            {/* {authError && <p className="text-red-500 pb-2">{authError}</p>} */}
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


