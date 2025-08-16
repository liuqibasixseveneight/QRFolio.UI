import type { CVFormValues } from '../types';

const EMPTY_WORK_ENTRY: CVFormValues['workExperience'][number] = {
  jobTitle: '',
  companyName: '',
  location: '',
  dateFrom: '',
  dateTo: '',
  responsibilities: '',
};

const EMPTY_EDU_ENTRY: CVFormValues['education'][number] = {
  schoolName: '',
  degree: '',
  fieldOfStudy: '',
  dateFrom: '',
  dateTo: '',
  description: '',
};

const EMPTY_LANGUAGE_ENTRY: CVFormValues['languages'][number] = {
  language: '',
  fluencyLevel: 'Beginner' as 'Beginner',
};

export { EMPTY_WORK_ENTRY, EMPTY_EDU_ENTRY, EMPTY_LANGUAGE_ENTRY };
