import type {
  Control,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';

import type { CVFormValues } from '../../types';

export type contentsProps = {
  register: UseFormRegister<CVFormValues>;
  errors: FieldErrors<CVFormValues>;
  control: Control<CVFormValues>;
  workFields: readonly any[];
  appendWork: UseFieldArrayAppend<CVFormValues, 'workExperience'>;
  removeWork: UseFieldArrayRemove;
  eduFields: readonly any[];
  appendEdu: UseFieldArrayAppend<CVFormValues, 'education'>;
  removeEdu: UseFieldArrayRemove;
  languageFields: readonly any[];
  appendLanguage: UseFieldArrayAppend<CVFormValues, 'languages'>;
  removeLanguage: UseFieldArrayRemove;
};
