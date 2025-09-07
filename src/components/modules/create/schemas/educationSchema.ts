import { z } from 'zod';

export const educationSchema = z.object({
  schoolName: z.string().optional(),
  degree: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  description: z.string().optional(),
});
