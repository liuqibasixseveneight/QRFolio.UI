import type { z } from 'zod';
import { introSchema } from './schemas';

export type CVFormValues = z.infer<typeof introSchema>;
