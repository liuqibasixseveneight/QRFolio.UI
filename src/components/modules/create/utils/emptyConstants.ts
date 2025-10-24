import type { CVFormValues } from '../types';

const EMPTY_WORK_ENTRY: NonNullable<CVFormValues['workExperience']>[number] = {
  jobTitle: '',
  companyName: '',
  location: '',
  dateFrom: '',
  dateTo: '',
  responsibilities: '',
};

const EMPTY_EDU_ENTRY: NonNullable<CVFormValues['education']>[number] = {
  schoolName: '',
  degree: '',
  dateFrom: '',
  dateTo: '',
  description: '',
};

const EMPTY_LANGUAGE_ENTRY: NonNullable<CVFormValues['languages']>[number] = {
  language: '',
  fluencyLevel: 'Beginner' as 'Beginner',
};

const EMPTY_SKILL_ENTRY: NonNullable<CVFormValues['skills']>[number] = {
  title: '',
  skills: [],
};

export {
  EMPTY_WORK_ENTRY,
  EMPTY_EDU_ENTRY,
  EMPTY_LANGUAGE_ENTRY,
  EMPTY_SKILL_ENTRY,
};
