import { z } from "zod";

export const priceValidation = z.object({
  _id: z.string().optional(),
  hourly: z.object({
    ratePerHour: z.preprocess((val) => {
      if (typeof val === "string") {
        const parsed = parseFloat(val);
        return isNaN(parsed) ? undefined : parsed;
      }
      return val;
    }, z.number({ message: "The field is required." }).nonnegative("Price per hour must be a positive number")),
    policy: z.string().min(1, "Policy cannot be empty"),
  }),
  daily: z.object({
    ratePerDay: z.preprocess((val) => {
      if (typeof val === "string") {
        const parsed = parseFloat(val);
        return isNaN(parsed) ? undefined : parsed;
      }
      return val;
    }, z.number({ message: "The field is required." }).nonnegative("Price per hour must be a positive number")),
    policy: z.string().min(1, "Policy cannot be empty"),
  }),
});
