import { z } from "zod";

export const carTypeValidation=z.object({
    _id:z.string().optional(),
    name:z.string().nonempty("The field is required."),
    description:z.string().optional()
})

