import { formatDate } from '../../helpers';
import { Calendar } from 'lucide-react';
import type { EducationSectionProps } from './types';

const EducationSection = ({ education = [] }: EducationSectionProps) => {
  if (!education?.length) return null;

  return (
    <div className='space-y-12'>
      {education?.map((edu, index) => (
        <div
          key={`${edu?.degree}-${index}`}
          className='group relative p-0 bg-transparent border-0'
        >
          {/* Degree and Field of Study */}
          <div className='mb-6'>
            <h3 className='text-2xl font-light text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300'>
              {edu?.degree} in {edu?.fieldOfStudy}
            </h3>
            <div className='flex items-center gap-3 mb-4'>
              <span className='text-xl font-medium text-gray-700'>
                {edu?.schoolName}
              </span>
            </div>

            {/* Date Range */}
            <div className='flex items-center gap-3 mb-6'>
              <span className='text-sm text-gray-500 font-medium flex items-center gap-2'>
                <Calendar className='w-4 h-4' />
                {edu?.dateFrom ? formatDate(edu.dateFrom) : 'N/A'} -{' '}
                {edu?.dateTo ? formatDate(edu.dateTo) : 'Present'}
              </span>
            </div>

            {/* Description */}
            {edu?.description && (
              <div className='space-y-3 mb-6'>
                <p className='text-gray-700 leading-relaxed text-base'>
                  {edu?.description}
                </p>
              </div>
            )}

            {/* Academic Achievements */}
            <div className='flex flex-wrap gap-3 pt-6 border-t border-gray-100'>
              <span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-200'>
                Dean's List
              </span>
              <span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-200'>
                Honors
              </span>
              <span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-200'>
                Research
              </span>
              <span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-200'>
                Academic Excellence
              </span>
            </div>
          </div>

          {/* Separator line */}
          {index < education.length - 1 && (
            <div className='w-full h-px bg-gray-100 my-8'></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
