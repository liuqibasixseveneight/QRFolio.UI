import type {
  WorkExperience,
  Education,
  Language,
  SkillCategory,
} from '@/apollo/profile/types';

export type ProfileSectionsContainerProps = {
  workExperience: WorkExperience[];
  education: Education[];
  languages: Language[];
  skills: SkillCategory[];
  expandedSections: {
    workExperience: boolean;
    education: boolean;
    languages: boolean;
    skills: boolean;
  };
  onToggleSection: (
    section: keyof ProfileSectionsContainerProps['expandedSections']
  ) => void;
  className?: string;
};
