import { z } from "zod";

export const userValidation=z.object({
    name:z.string().nonempty("The field is required."),
    email:z.string().email("Invalid Email.").nonempty("The field is required."),
    phone:z.string().nonempty("The field is required."),
    nid:z.string().optional(),
    drivingLicence:z.string().optional(),
    address:z.string().optional()
})