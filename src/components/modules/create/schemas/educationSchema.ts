import { z } from 'zod';

export const educationSchema = z.object({
  schoolName: z.string(),
  degree: z.string(),
  fieldOfStudy: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  description: z.string(),
});
