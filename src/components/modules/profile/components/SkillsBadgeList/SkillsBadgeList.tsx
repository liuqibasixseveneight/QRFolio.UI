import type { SkillsBadgeListProps } from './types';

const SkillsBadgeList = ({ skills }: SkillsBadgeListProps) => (
  <ul className='flex flex-wrap gap-3'>
    {skills?.map((skill, index) => (
      <li key={`${skill?.skill}-${index}`}>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors duration-200'>
          <span className='tracking-wide whitespace-nowrap'>
            {skill?.skill}
          </span>
        </div>
      </li>
    ))}
  </ul>
);

export default SkillsBadgeList;
