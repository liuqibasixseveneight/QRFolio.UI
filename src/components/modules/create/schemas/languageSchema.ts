import { z } from 'zod';

export const languageSchema = z.object({
  language: z.string().min(1, 'Required'),
  fluencyLevel: z.enum(
    ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native'],
    { required_error: 'Fluency level is required' }
  ),
});
