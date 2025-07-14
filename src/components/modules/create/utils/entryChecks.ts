import type { CVFormValues } from '../types';

const isWorkEntryEmpty = (entry: CVFormValues['workExperience'][number]) =>
  !entry?.jobTitle &&
  !entry?.companyName &&
  !entry?.location &&
  !entry?.dateFrom &&
  !entry?.dateTo &&
  !entry?.responsibilities;

const isEduEntryEmpty = (entry: CVFormValues['education'][number]) =>
  !entry?.schoolName &&
  !entry?.degree &&
  !entry?.fieldOfStudy &&
  !entry?.dateFrom &&
  !entry?.dateTo &&
  !entry?.description;

const isLanguageEntryEmpty = (entry: CVFormValues['languages'][number]) =>
  !entry?.language &&
  (!entry?.fluencyLevel || entry?.fluencyLevel === 'Beginner');

export { isWorkEntryEmpty, isEduEntryEmpty, isLanguageEntryEmpty };
