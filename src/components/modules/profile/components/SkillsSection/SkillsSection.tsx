import { SkillsBadgeList } from '../SkillsBadgeList';
import type { SkillsSectionProps } from './types';

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div className='space-y-8 pb-16'>
      {skills.map((category, index) => (
        <div key={`${category.title}-${index}`} className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-800 tracking-tight'>
            {category.title}
          </h3>
          <SkillsBadgeList skills={category.skills} />
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;
