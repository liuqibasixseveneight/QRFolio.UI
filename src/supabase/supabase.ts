import { createClient } from '@supabase/supabase-js';

import {
  VITE_DATABASE_PROJECT_URL,
  VITE_DATABASE_PUBLIC_API_KEY,
} from '@/config';

export const supabase = createClient(
  VITE_DATABASE_PROJECT_URL,
  VITE_DATABASE_PUBLIC_API_KEY
);
