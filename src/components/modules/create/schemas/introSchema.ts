import { z } from 'zod';

import { workExperienceSchema } from './workExperienceSchema';
import { educationSchema } from './educationSchema';
import { languageSchema } from './languageSchema';

export const introSchema = z.object({
  fullName: z.string().min(1, 'Required'),
  phone: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  professionalSummary: z.string().min(1, 'Required'),
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  languages: z.array(languageSchema),
});
