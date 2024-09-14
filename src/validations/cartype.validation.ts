import { z } from "zod";

export const carTypeValidation=z.object({
    _id:z.string().optional(),
    name:z.string().nonempty("The field is required."),
    icon:z.instanceof(FileList).optional(),
    description:z.string().optional()
})

