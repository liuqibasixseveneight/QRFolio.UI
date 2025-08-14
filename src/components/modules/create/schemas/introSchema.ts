import { z } from 'zod';

import { workExperienceSchema } from './workExperienceSchema';
import { educationSchema } from './educationSchema';
import { languageSchema } from './languageSchema';

const phoneNumberSchema = z.object({
  countryCode: z.string().min(1, 'Country code required'),
  dialCode: z.string().min(1, 'Dial code required'),
  number: z.string().min(1, 'Phone number required'),
  flag: z.string().min(1, 'Flag emoji required'),
});

export const introSchema = z.object({
  fullName: z.string().min(1, 'Full name required'),
  phone: phoneNumberSchema.optional(),
  email: z.string().min(1, 'Email required').email('Invalid email'),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  professionalSummary: z.string().min(1, 'Professional summary required'),
  availability: z.enum(
    ['AVAILABLE', 'OPEN_TO_OPPORTUNITIES', 'NOT_AVAILABLE'],
    {
      required_error: 'Please select your availability status',
    }
  ),
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  languages: z.array(languageSchema),
});
