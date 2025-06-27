import { z } from "zod";

export const carValidation = z.object({
  _id: z.string().optional(),
  type: z.string().nonempty("The field is required."),
  name: z.string().nonempty("The field is required."),
  quantity: z
    .number({ required_error: "The field is required." })
    .nonnegative("Quantity must be a postive number."),
  price: z.string().nonempty("The field is required."),
  image: z.instanceof(FileList).optional(),
  seats: z.preprocess((val) => {
    if (typeof val === "string") {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, z.number({ message: "The field is required." }).nonnegative("Price per hour must be a positive number")),
  bagCapability: z.number({required_error:"The field is required."}),
  fuelType: z.string().nonempty("The field is required."),
  transmission: z.string().nonempty("The field is required."),
  airConditioning: z.string().nonempty("The field is required."),
  drivingType: z.string().nonempty("The field is required."),
  color: z.string().nonempty("The field is required."),
  features: z
    .array(z.string().nonempty("The field is required."))
    .nonempty("The field is required."),
  description: z.string().nonempty("The field is required."),
});
