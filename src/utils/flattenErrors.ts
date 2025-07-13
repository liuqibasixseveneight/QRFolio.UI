import type { FieldErrors } from 'react-hook-form';

import type { CVFormValues } from '@/components/modules/create/types';

export const flattenErrors = (errors: FieldErrors<CVFormValues>): string[] =>
  Object.values(errors)
    .flatMap((err: any) =>
      err?.message
        ? [err.message]
        : err?.types
        ? Object.values(err.types)
        : typeof err === 'string'
        ? [err]
        : []
    )
    .filter(Boolean) as string[];
