import type { Availability, SkillCategory } from '@/apollo/profile/types';

export type ProfileHeaderProps = {
  fullName: string;
  summary?: string;
  email?: string;
  phone?: any;
  linkedin?: string;
  portfolio?: string;
  availability?: Availability;
  workExperience?: any[];
  education?: any[];
  languages?: any[];
  skills?: SkillCategory[];
  updatedAt?: string;
  isOwner?: boolean;
  onEditClick?: () => void;
  // Privacy settings
  showName?: boolean;
  showEmail?: boolean;
  showPhone?: boolean;
  showLinkedIn?: boolean;
  showPortfolio?: boolean;
  showWorkExperience?: boolean;
  showEducation?: boolean;
  showLanguages?: boolean;
  showSkills?: boolean;
};
