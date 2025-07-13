import { z } from 'zod';

import { workExperienceSchema } from './workExperienceSchema';
import { educationSchema } from './educationSchema';
import { languageSchema } from './languageSchema';

export const introSchema = z.object({
  fullName: z.string().min(1, 'Full name required'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]+$/.test(val), {
      message: 'Phone must contain numbers only',
    }),
  email: z.string().min(1, 'Email required').email('Invalid email'),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  professionalSummary: z.string().min(1, 'Professional summary required'),
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  languages: z.array(languageSchema),
});
