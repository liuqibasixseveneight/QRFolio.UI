import { z } from 'zod';

export const skillSchema = z.object({
  skill: z.string().optional(),
});

export const skillCategorySchema = z.object({
  title: z.string().optional(),
  skills: z.array(skillSchema).optional(),
});

export const skillsSchema = z.array(skillCategorySchema).default([]);
