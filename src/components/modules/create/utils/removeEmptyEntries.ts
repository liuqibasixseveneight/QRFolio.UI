import type { CVFormValues } from '../types';
import {
  isEduEntryEmpty,
  isLanguageEntryEmpty,
  isWorkEntryEmpty,
} from './entryChecks';

export const removeEmptyEntries = (data: CVFormValues): CVFormValues => ({
  ...data,
  workExperience: data.workExperience.filter(
    (entry) => !isWorkEntryEmpty(entry)
  ),
  education: data.education.filter((entry) => !isEduEntryEmpty(entry)),
  languages: data.languages.filter((entry) => !isLanguageEntryEmpty(entry)),
});
