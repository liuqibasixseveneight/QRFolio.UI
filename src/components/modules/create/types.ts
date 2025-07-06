import type { z } from 'zod';

import type { introSchema } from './schemas/introSchema';

export type CVFormValues = z.infer<typeof introSchema>;
