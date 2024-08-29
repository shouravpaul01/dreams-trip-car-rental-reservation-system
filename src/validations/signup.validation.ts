import { z } from "zod";

export const SignUpValidation = z
  .object({
    name: z.string().nonempty("The field is required"),
    email: z
      .string()
      .nonempty("The field is required")
      .email("Invalid email address"),
    password: z
      .string()
      .nonempty("The field is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .nonempty("The field is required")
      .min(8, "Confirm Password is required"),
   
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
