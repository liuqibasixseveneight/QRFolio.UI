import type { CVFormValues } from '../types';

const isWorkEntryEmpty = (
  entry: NonNullable<CVFormValues['workExperience']>[number]
) =>
  !entry?.jobTitle &&
  !entry?.companyName &&
  !entry?.location &&
  !entry?.dateFrom &&
  !entry?.dateTo &&
  !entry?.responsibilities;

const isEduEntryEmpty = (
  entry: NonNullable<CVFormValues['education']>[number]
) =>
  !entry?.schoolName &&
  !entry?.degree &&
  !entry?.fieldOfStudy &&
  !entry?.dateFrom &&
  !entry?.dateTo &&
  !entry?.description;

const isLanguageEntryEmpty = (
  entry: NonNullable<CVFormValues['languages']>[number]
) =>
  !entry?.language &&
  (!entry?.fluencyLevel || entry?.fluencyLevel === 'Beginner');

const isSkillEntryEmpty = (
  entry: NonNullable<CVFormValues['skills']>[number]
) => !entry?.title || !entry?.skills || entry.skills.length === 0;

export {
  isWorkEntryEmpty,
  isEduEntryEmpty,
  isLanguageEntryEmpty,
  isSkillEntryEmpty,
};
