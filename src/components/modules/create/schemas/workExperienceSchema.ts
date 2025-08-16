import { z } from 'zod';

export const workExperienceSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required'),
  companyName: z.string().min(1, 'Company name is required'),
  location: z.string().min(1, 'Location is required'),
  dateFrom: z.string().min(1, 'Start date is required'),
  dateTo: z.string().min(1, 'End date is required'),
  responsibilities: z.string().min(1, 'Responsibilities are required'),
});
