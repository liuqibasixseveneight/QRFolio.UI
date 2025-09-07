import { SkillsBadgeList } from '../SkillsBadgeList';
import type { SkillsSectionProps } from './types';

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div className='space-y-6 pb-16'>
      <SkillsBadgeList skills={skills} />
    </div>
  );
};

export default SkillsSection;
