import { z } from 'zod';

export const workExperienceSchema = z.object({
  jobTitle: z.string(),
  companyName: z.string(),
  location: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  responsibilities: z.string(),
});
