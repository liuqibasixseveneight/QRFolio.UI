import { z } from 'zod';

export const workExperienceSchema = z.object({
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
  location: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  responsibilities: z.string().optional(),
});
