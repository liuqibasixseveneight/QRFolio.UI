import { z } from 'zod';

export const workExperienceSchema = z.object({
  jobTitle: z.string().min(1, 'Job title required'),
  companyName: z.string().min(1, 'Company name required'),
  location: z.string().min(1, 'Location required'),
  dateFrom: z.string().min(1, 'Date from required'),
  dateTo: z.string().min(1, 'Date to required'),
  responsibilities: z.string().min(1, 'Responsibilities required'),
});
