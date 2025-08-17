import { formatDate } from '../../helpers';
import { Calendar, MapPin } from 'lucide-react';
import type { ExperienceSectionProps } from './types';

const ExperienceSection = ({ workExperience = [] }: ExperienceSectionProps) => {
  if (!workExperience?.length) return null;

  return (
    <div className='space-y-12'>
      {workExperience?.map((exp, index) => (
        <div
          key={`${exp?.companyName}-${index}`}
          className='group relative p-0 bg-transparent border-0'
        >
          {/* Job Title and Company */}
          <div className='mb-6'>
            <h3 className='text-2xl font-light text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300'>
              {exp?.jobTitle}
            </h3>
            <div className='flex items-center gap-3 mb-4'>
              <span className='text-xl font-medium text-gray-700'>
                {exp?.companyName}
              </span>
              {exp?.location && (
                <>
                  <span className='text-gray-400'>•</span>
                  <span className='text-gray-600 text-sm flex items-center gap-1'>
                    <MapPin className='w-4 h-4' />
                    {exp?.location}
                  </span>
                </>
              )}
            </div>

            {/* Date Range */}
            <div className='flex items-center gap-3 mb-6'>
              <span className='text-sm text-gray-500 font-medium flex items-center gap-2'>
                <Calendar className='w-4 h-4' />
                {exp?.dateFrom ? formatDate(exp.dateFrom) : 'N/A'} -{' '}
                {exp?.dateTo ? formatDate(exp.dateTo) : 'Present'}
              </span>
            </div>

            {/* Responsibilities */}
            {exp?.responsibilities && (
              <div className='space-y-3 mb-6'>
                <p className='text-gray-700 leading-relaxed text-base'>
                  {exp?.responsibilities}
                </p>
              </div>
            )}

            {/* Skills/Tags */}
            <div className='flex flex-wrap gap-3 pt-6 border-t border-gray-100'>
              <span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-200'>
                Leadership
              </span>
              <span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-200'>
                Strategy
              </span>
              <span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-200'>
                Team Management
              </span>
              <span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-200'>
                Innovation
              </span>
            </div>
          </div>

          {/* Separator line */}
          {index < workExperience.length - 1 && (
            <div className='w-full h-px bg-gray-100 my-8'></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;
