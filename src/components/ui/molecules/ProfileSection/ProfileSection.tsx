import { memo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

import type { ProfileSectionProps } from './types';

const SECTION_TITLES = {
  WORK_EXPERIENCE: 'work experience',
  EDUCATION: 'education',
  LANGUAGES: 'languages',
  SKILLS: 'skills',
} as const;

const ProfileSection = memo<ProfileSectionProps>(
  ({
    title,
    count,
    icon,
    isExpanded,
    onToggle,
    children,
    className = '',
    isLast = false,
    isCollapsedMode = false,
  }) => {
    const getItemLabel = () => {
      switch (title.toLowerCase()) {
        case SECTION_TITLES.WORK_EXPERIENCE:
          return `${count} position${count !== 1 ? 's' : ''}`;
        case SECTION_TITLES.EDUCATION:
          return `${count} degree${count !== 1 ? 's' : ''}`;
        case SECTION_TITLES.LANGUAGES:
          return `${count} language${count !== 1 ? 's' : ''}`;
        case SECTION_TITLES.SKILLS:
          return `${count} skill${count !== 1 ? 's' : ''}`;
        default:
          return `${count} item${count !== 1 ? 's' : ''}`;
      }
    };

    const getEmptyLabel = () => {
      switch (title.toLowerCase()) {
        case SECTION_TITLES.WORK_EXPERIENCE:
          return 'No positions yet';
        case SECTION_TITLES.EDUCATION:
          return 'No degrees yet';
        case SECTION_TITLES.LANGUAGES:
          return 'No languages yet';
        case SECTION_TITLES.SKILLS:
          return 'No skills yet';
        default:
          return 'No items yet';
      }
    };

    const containerClasses = isCollapsedMode
      ? `bg-white shadow-sm border border-gray-100 px-6 sm:px-8 lg:px-12 py-12 sm:py-16 -mt-2 ${
          isLast ? 'rounded-b-2xl' : ''
        }`
      : `px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-12 sm:py-16 ${
          isLast ? 'rounded-b-2xl' : 'border-b border-gray-100'
        }`;

    return (
      <div className={`${containerClasses} ${className}`}>
        <div className='group'>
          <button
            onClick={onToggle}
            className='w-full text-left p-0 bg-transparent hover:bg-transparent rounded-none border-0 transition-all duration-300 cursor-pointer'
          >
            <div className='flex items-center justify-between mb-6 sm:mb-8 gap-4'>
              <div className='flex items-center gap-4 sm:gap-6 lg:gap-8'>
                <div className='w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0'>
                  {icon}
                </div>
                <div className='min-w-0 flex-1'>
                  <h3 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-2 sm:mb-3'>
                    {title}
                  </h3>
                  <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                    <span className='text-sm text-gray-900 font-medium'>
                      {getItemLabel()}
                    </span>
                    <div className='hidden sm:block w-1 h-1 bg-gray-300 rounded-full'></div>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-gray-400'>
                        {count > 0
                          ? isExpanded
                            ? 'Click to collapse'
                            : 'Click to expand'
                          : getEmptyLabel()}
                      </span>
                      <div className='text-gray-400 group-hover:text-gray-600 transition-colors duration-300'>
                        {isExpanded ? (
                          <ChevronDown className='w-4 h-4' />
                        ) : (
                          <ChevronRight className='w-4 h-4' />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>

          <div
            className={`transition-all duration-700 ease-in-out ${
              isExpanded
                ? 'opacity-100 mt-8'
                : 'opacity-0 mt-0 max-h-0 overflow-hidden'
            }`}
            aria-hidden={!isExpanded}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

ProfileSection.displayName = 'ProfileSection';

export default ProfileSection;
