import { undefined, z } from "zod";

const userInfoValidation = z.object({
  car: z.string(),
  drivingType: z.string().nonempty("The field is required."),
  user: z.object({
    name: z.string().nonempty("The field is required."),
    email: z
      .string()
      .nonempty("The field is required.")
      .email("Invalid Email."),
    phone: z.string().nonempty("The field is required."),
    nid: z
      .string()
      .refine((val) => /^\d+$/.test(val), {
        message: "NID must contain only digits.",
      })
      .refine((val) => val.length === 13 || val.length === 17, {
        message: "NID must be either 13 or 17 digits long.",
      }),
    drivingLicence: z.string().optional(),
   
  }),
  priceType: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return undefined;
        }
      }
      return val;
    },
    z.object({
      price: z.number().min(0, "Price must be a positive number."),
      type: z.string().nonempty("The field is required."),
    })
  ),
  quantity: z
  .number({ required_error: "Quantity is required" })
  .min(1, "Quantity must be at least 1")
});

// Company provided driving validation schema
const companyProvidedDrivingValidation = z.object({
  startTime: z.string().nonempty("Start Time is required."),
  pickupDate: z.date({
    required_error: "Pickup Date is required.",
    invalid_type_error: "Pickup Date is required.",
  }),
  pickupLocation: z.preprocess((data: any) => {
    if (
      typeof data === "string" ||
      typeof data === "undefined" ||
      typeof data === null
    ) {
      return "";
    }
    if (Object?.keys(data)?.length !== 0) {
      return data.value;
    }
    return undefined;
  }, z.string().nonempty("The field is required.")),
  returnLocation: z.preprocess((data: any) => {
    if (
      typeof data === "string" ||
      typeof data === "undefined" ||
      typeof data === null
    ) {
      return "";
    }
    if (Object?.keys(data)?.length !== 0) {
      return data.value;
    }
    return undefined;
  }, z.string().nonempty("The field is required.")),
});

// Self driving validation schema
const selfDrivingValidation = z.object({
  startTime: z.string().nonempty("Start Time is required."),
  startDate: z.date({
    required_error: "Date is required.",
    invalid_type_error: "Date is required.",
  }),
});

// Conditional validation schema based on `drivingType`
export const bookingValidation = z.union([
  userInfoValidation.extend(companyProvidedDrivingValidation.shape),
  userInfoValidation.extend(selfDrivingValidation.shape),
]);
