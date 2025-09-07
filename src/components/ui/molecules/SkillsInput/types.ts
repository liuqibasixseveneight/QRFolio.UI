export interface Skill {
  skill: string;
}

export interface SkillsInputProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
  placeholder?: string;
}
