import type { Skill, SkillCategory } from '@/apollo/profile';

export type SkillsInputProps = {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
  placeholder?: string;
};

export type CategorizedSkillsInputProps = {
  skillCategories: SkillCategory[];
  onSkillsChange: (skillCategories: SkillCategory[]) => void;
  placeholder?: string;
};
