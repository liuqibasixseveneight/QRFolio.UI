import { z } from 'zod';

export const educationSchema = z.object({
  schoolName: z.string().min(1, 'School name required'),
  degree: z.string().min(1, 'Degree required'),
  fieldOfStudy: z.string().min(1, 'Field of study required'),
  dateFrom: z.string().min(1, 'Date from required'),
  dateTo: z.string().min(1, 'Date to required'),
  description: z.string().min(1, 'Description required'),
});
