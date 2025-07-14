import { z } from 'zod';

export const languageSchema = z.object({
  language: z.string(),
  fluencyLevel: z.enum(
    ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native'],
    { required_error: 'Fluency level required' }
  ),
});
