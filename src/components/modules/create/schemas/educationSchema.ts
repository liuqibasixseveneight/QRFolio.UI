import { z } from 'zod';

export const educationSchema = z.object({
  schoolName: z.string().min(1, 'Required'),
  degree: z.string().min(1, 'Required'),
  fieldOfStudy: z.string().min(1, 'Required'),
  dateFrom: z.string().min(1, 'Required'),
  dateTo: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
});
