import { z } from 'zod';

export const languageSchema = z.object({
  language: z.string().min(1, 'Language is required'),
  fluencyLevel: z.enum(
    ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native'],
    {
      required_error: 'Fluency level is required',
    }
  ),
});
