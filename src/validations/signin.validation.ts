import { z } from "zod";

export const SignInValidation = z.object({

    email: z.string().nonempty('The field is required').email('Invalid email address'),
    password: z.string().nonempty('The field is required').min(8, 'Password must be at least 8 characters long'),
    
  })