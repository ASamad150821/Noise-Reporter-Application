import { z } from 'zod';

export type FieldErrors = Partial<Record<'firstName' | 'lastName' | 'email', string>>;

export const yourDetailsSchema = z.object({
  firstName : z.string().trim().min(1, 'First Name Is Required').max(10, 'First Name Cannot Be Greater Than 10 Characters'),
  lastName: z.string().trim().min(1, 'Last name is required').max(10, "Last Name cannot be greater than 10 characters"),
  email: z.string().trim().email('Enter A Valid Email Address')
});

export const reportSchema = yourDetailsSchema.extend({
  noiseType: z.enum(['music', 'construction', 'shouting', 'other'], { message: 'Select a valid noise type' }),
  howLong: z.enum(['under-hour', 'hours', 'days', 'weeks'], { message: 'Select how long the noise has lasted' }),
  description: z.string().trim().min(1, 'Description is required'),
});

export const updateReportSchema = reportSchema
.partial()
.strict()
.refine((data) => Object.keys(data).length > 0, {
  message: "Provide at least One Field To Update"
})

export type Report = z.infer<typeof reportSchema> & {
    caseReference: string,
    submittedAt: string
}

export type ReportUpdate = z.infer<typeof updateReportSchema>;

