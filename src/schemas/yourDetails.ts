import { z } from 'zod';

/*
 * Zod is a schema validation library.
 *
 * You describe the shape of valid data once (this file), then call
 * `.parse(input)` somewhere to validate. If invalid, it throws a
 * ZodError with a helpful list of every field that failed.
 *
 * The work app uses exactly this pattern — see `parseZodErrors` and
 * `yourDetailsSchemaWithPhoneNumber` in the app's utils.
 *
 * TypeScript bonus: `z.infer<typeof yourDetailsSchema>` gives you the
 * TypeScript type automatically from the schema. One source of truth
 * for both runtime validation AND compile-time types.
 */

export const yourDetailsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email address'),
});

export type YourDetailsInput = z.infer<typeof yourDetailsSchema>;
