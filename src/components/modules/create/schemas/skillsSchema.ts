import { z } from 'zod';

export const skillsSchema = z.object({
  skill: z.string().optional(),
});
