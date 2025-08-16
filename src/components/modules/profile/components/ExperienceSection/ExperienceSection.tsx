import { formatDate } from '../../helpers';
import type { ExperienceSectionProps } from './types';

const ACCENT_COLOR = 'blue-600';

const ExperienceSection = ({ workExperience = [] }: ExperienceSectionProps) => {
  if (!workExperience?.length) return null;

  return (
    <div className='space-y-6'>
      {workExperience?.map((exp, index) => (
        <div
          key={`${exp?.companyName}-${index}`}
          className='group relative p-6 bg-gradient-to-br from-slate-50/80 via-white/90 to-blue-50/80 backdrop-blur-xl rounded-2xl border border-white/60 hover:border-blue-200/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100/50 hover:scale-[1.01]'
        >
          {/* Subtle border glow on hover */}
          <div className='absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-200/30 transition-all duration-500 pointer-events-none'></div>

          {/* Company Logo Placeholder with techzen aesthetic */}
          <div className='absolute top-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-100/80 via-indigo-100/80 to-purple-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 border border-white/60'>
            <div className='w-7 h-7 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl'></div>
          </div>

          {/* Job Title and Company */}
          <div className='pr-20'>
            <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-500'>
              {exp?.jobTitle}
            </h3>
            <div className='flex items-center gap-2 mb-3'>
              <span className='text-lg font-semibold text-blue-600'>
                {exp?.companyName}
              </span>
              {exp?.location && (
                <>
                  <span className='text-gray-400'>•</span>
                  <span className='text-gray-600 text-sm'>{exp?.location}</span>
                </>
              )}
            </div>

            {/* Date Range with techzen aesthetic */}
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse'></div>
              <span className='text-sm text-gray-500 font-medium'>
                {formatDate(exp?.dateFrom)} - {formatDate(exp?.dateTo)}
              </span>
            </div>

            {/* Responsibilities */}
            {exp?.responsibilities && (
              <div className='space-y-2'>
                <p className='text-gray-700 leading-relaxed'>
                  {exp?.responsibilities}
                </p>
              </div>
            )}

            {/* Skills/Tags with techzen aesthetic */}
            <div className='flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200/50'>
              <span className='px-3 py-1 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm text-blue-700 text-xs font-medium rounded-xl border border-blue-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105'>
                Leadership
              </span>
              <span className='px-3 py-1 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 backdrop-blur-sm text-indigo-700 text-xs font-medium rounded-xl border border-indigo-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105'>
                Strategy
              </span>
              <span className='px-3 py-1 bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm text-slate-700 text-xs font-medium rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105'>
                Team Management
              </span>
            </div>
          </div>

          {/* Enhanced hover effect with techzen aesthetic */}
          <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-blue-50/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none'></div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;
