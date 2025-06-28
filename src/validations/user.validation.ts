import { z } from "zod";

export const userValidation = z.object({
  name: z.string().nonempty("The field is required."),
  email: z.string().email("Invalid Email.").nonempty("The field is required."),
  phone: z
    .string()
    .regex(/^$|^[0-9]{10,15}$/, {
      message: "Phone number must be 10-15 digits or empty",
    })
    .optional(),
  nid: z.string().optional(),
  drivingLicence: z.string().optional(),
  address: z.string().optional(),
});

export const adminCreateUserSchemaValidation = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(30, { message: "Name cannot exceed 30 characters" })
      .regex(/^[a-zA-Z ]*$/, {
        message: "Name can only contain letters and spaces",
      }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" })
      .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i, {
        message: "Invalid email format",
      }),

    role: z.enum([ "admin", "user"]).optional(),
    phone: z
      .string()
      .regex(/^$|^[0-9]{1,11}$/, {
        message: "Phone number must be 1-11 digits or empty",
      })
      .optional(),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[@$!%*#?&]/, {
        message:
          "Password must contain at least one special character (@ $ ! % * # ? &)",
      }),

    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
export const adminEditUserSchemaValidation = z
  .object({
    _id: z.string().min(1, { message: "User ID is required" }),
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(30, { message: "Name cannot exceed 30 characters" })
      .regex(/^[a-zA-Z ]*$/, {
        message: "Name can only contain letters and spaces",
      }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" })
      .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i, {
        message: "Invalid email format",
      }),

    role: z.enum([ "admin", "user"]).optional(),
    phone: z
      .string()
      .regex(/^$|^[0-9]{1,11}$/, {
        message: "Phone number must be 1-11 digits or empty",
      })
      
    

    
  })
  