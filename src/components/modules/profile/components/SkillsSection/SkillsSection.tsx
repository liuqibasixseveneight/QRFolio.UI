import { SkillsBadgeList } from '../SkillsBadgeList';
import type { SkillsSectionProps } from './types';

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div className='space-y-12'>
      {skills.map((category, index) => (
        <div
          key={`${category.title}-${index}`}
          className='group relative p-0 bg-transparent border-0'
        >
          <div className='mb-6'>
            <h3 className='text-base sm:text-lg md:text-xl font-light text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300'>
              {category.title}
            </h3>
            <div className='space-y-3'>
              <SkillsBadgeList skills={category.skills} />
            </div>
          </div>

          {index < skills.length - 1 && (
            <div className='w-full h-px bg-gray-100 my-8'></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;
