import type { Skill, SkillCategory } from '@/apollo/profile';

export interface SkillsInputProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
  placeholder?: string;
}

export interface CategorizedSkillsInputProps {
  skillCategories: SkillCategory[];
  onSkillsChange: (skillCategories: SkillCategory[]) => void;
  placeholder?: string;
}
