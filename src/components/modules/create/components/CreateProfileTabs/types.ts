import type { Dispatch, SetStateAction } from 'react';
import type {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';

import type { CVFormValues } from '../../types';
import type { Skill } from '@/components/ui/molecules/SkillsInput';

export type contentsProps = {
  register: UseFormRegister<CVFormValues>;
  errors: FieldErrors<CVFormValues>;
  control: Control<CVFormValues>;
  workFields: FieldArrayWithId<CVFormValues, 'workExperience', 'id'>[];
  appendWork: UseFieldArrayAppend<CVFormValues, 'workExperience'>;
  removeWork: UseFieldArrayRemove;
  eduFields: FieldArrayWithId<CVFormValues, 'education', 'id'>[];
  appendEdu: UseFieldArrayAppend<CVFormValues, 'education'>;
  removeEdu: UseFieldArrayRemove;
  languageFields: FieldArrayWithId<CVFormValues, 'languages', 'id'>[];
  appendLanguage: UseFieldArrayAppend<CVFormValues, 'languages'>;
  removeLanguage: UseFieldArrayRemove;
  skillsFields: FieldArrayWithId<CVFormValues, 'skills', 'id'>[];
  onSkillsChange: (skills: Skill[]) => void;
  activeWorkIndex: number | null;
  setActiveWorkIndex: Dispatch<SetStateAction<number | null>>;
  activeEduIndex: number | null;
  setActiveEduIndex: Dispatch<SetStateAction<number | null>>;
  activeLanguageIndex: number | null;
  setActiveLanguageIndex: Dispatch<SetStateAction<number | null>>;
};
