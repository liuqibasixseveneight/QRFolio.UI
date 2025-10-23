import { formatDate } from '../../helpers';
import { Calendar } from 'lucide-react';
import { SafeHtml } from '@/components/ui';
import type { EducationSectionProps } from './types';

const EducationSection = ({ education = [] }: EducationSectionProps) => {
  if (!education?.length) {
    return null;
  }

  return (
    <div className='space-y-12'>
      {education?.map((edu, index) => (
        <div
          key={`${edu?.degree}-${index}`}
          className='group relative p-0 bg-transparent border-0'
        >
          <div className='mb-6'>
            <h3 className='text-base sm:text-lg md:text-xl font-light text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300'>
              {edu?.degree}
            </h3>
            <div className='flex items-center gap-3 mb-4'>
              <span className='text-base sm:text-lg font-medium text-gray-700'>
                {edu?.schoolName}
              </span>
            </div>

            <div className='flex items-center gap-3 mb-6'>
              <span className='text-sm text-gray-500 font-medium flex items-center gap-2'>
                <Calendar className='w-4 h-4' />
                {edu?.dateFrom ? formatDate(edu.dateFrom) : 'N/A'} -{' '}
                {edu?.dateTo
                  ? edu.dateTo === 'current'
                    ? 'Current'
                    : formatDate(edu.dateTo)
                  : 'Present'}
              </span>
            </div>

            {edu?.description && (
              <div className='space-y-3 mb-6'>
                <SafeHtml
                  content={edu.description}
                  className='text-gray-700 leading-relaxed text-sm sm:text-base prose prose-sm max-w-none'
                />
              </div>
            )}
          </div>

          {index < education.length - 1 && (
            <div className='w-full h-px bg-gray-100 my-8'></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
