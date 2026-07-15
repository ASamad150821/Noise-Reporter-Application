import { z } from 'zod';

export const yourDetailsSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(5, 'First name cannot be greater than 5 characters'),
  lastName: z.string().min(1, 'Last name is required').max(5, "Last Name cannot be greater than 5 characters"),
  email: z.string().email('Enter a valid email address'),
});

