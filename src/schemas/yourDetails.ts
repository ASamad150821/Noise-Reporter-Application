import { z } from 'zod';

export const yourDetailsSchema = z.object({
  firstName : z.string().trim().min(1, 'First Name Is Required').max(10, 'First Name Cannot Be Greater Than 10 Characters'),
  lastName: z.string().trim().min(1, 'Last name is required').max(10, "Last Name cannot be greater than 10 characters"),
  email: z.string().trim().email('Enter A Valid Email Address')
})

