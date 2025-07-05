import { z } from "zod";

export const createBannerValidation = z.object({
  image: z
    .any()
    .refine(
      (fileList) => fileList instanceof FileList && fileList.length > 0,
      {
        message: "Image is required",
      }
    )
    .refine(
      (fileList) =>
        fileList instanceof FileList &&
        fileList[0]?.type?.startsWith("image/"),
      {
        message: "File must be an image",
      }
    ),
  title: z.string().nonempty('Title is required' ),
  subtitle: z.string().optional(),
  description: z.string().nonempty('Description is required' ),
    link: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/\S+$/.test(val),
      { message: "Link must be a valid URL" }
    ),
  car: z
    .string()
    .optional(),

});
export const updateBannerValidation = z.object({
  _id:z.string(),
  image: z
    .any().optional(),
    
  title: z.string().nonempty('Title is required' ),
  subtitle: z.string().optional(),
  description: z.string().nonempty('Description is required' ),
    link: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/\S+$/.test(val),
      { message: "Link must be a valid URL" }
    ),
  car: z
    .string()
    .optional(),

});