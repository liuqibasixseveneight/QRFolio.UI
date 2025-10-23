import { z } from 'zod';
import { skillsSchema } from './skillsSchema';

export const introSchema = z.object({
  fullName: z.string().min(1, 'Full name required'),
  phone: z.any().optional(),
  email: z.string().min(1, 'Email required').email('Invalid email'),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  professionalSummary: z.string().optional(),
  availability: z.enum(['available', 'open', 'unavailable'], {
    required_error: 'Please select your availability status',
  }),
  accessLevel: z.enum(['public', 'private', 'restricted'], {
    required_error: 'Please select your profile visibility',
  }),
  workExperience: z.array(z.any()).optional().nullable(),
  education: z.array(z.any()).optional().nullable(),
  languages: z.array(z.any()).optional().nullable(),
  skills: skillsSchema.optional().nullable(),
});
