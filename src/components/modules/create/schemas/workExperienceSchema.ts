import { z } from 'zod';

export const workExperienceSchema = z.object({
  jobTitle: z.string().min(1, 'Required'),
  companyName: z.string().min(1, 'Required'),
  location: z.string().min(1, 'Required'),
  dateFrom: z.string().min(1, 'Required'),
  dateTo: z.string().min(1, 'Required'),
  responsibilities: z.string().min(1, 'Required'),
});
