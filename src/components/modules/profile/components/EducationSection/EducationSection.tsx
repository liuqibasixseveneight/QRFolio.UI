import { formatDate } from '../../helpers';
import type { EducationSectionProps } from './types';

const ACCENT_COLOR = 'emerald-600';

const EducationSection = ({ education = [] }: EducationSectionProps) => {
  if (!education?.length) return null;

  return (
    <div className='space-y-6'>
      {education?.map((edu, index) => (
        <div
          key={`${edu?.degree}-${index}`}
          className='group relative p-6 bg-gradient-to-br from-emerald-50/80 via-white/90 to-teal-50/80 backdrop-blur-xl rounded-2xl border border-white/60 hover:border-emerald-200/60 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-100/50 hover:scale-[1.01]'
        >
          {/* Subtle border glow on hover */}
          <div className='absolute inset-0 rounded-2xl border border-transparent group-hover:border-emerald-200/30 transition-all duration-500 pointer-events-none'></div>

          {/* School Logo Placeholder with techzen aesthetic */}
          <div className='absolute top-6 right-6 w-14 h-14 bg-gradient-to-br from-emerald-100/80 via-teal-100/80 to-cyan-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 border border-white/60'>
            <div className='w-7 h-7 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl'></div>
          </div>

          {/* Degree and Field of Study */}
          <div className='pr-20'>
            <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-500'>
              {edu?.degree} in {edu?.fieldOfStudy}
            </h3>
            <div className='flex items-center gap-2 mb-3'>
              <span className='text-lg font-semibold text-emerald-600'>
                {edu?.schoolName}
              </span>
            </div>

            {/* Date Range with techzen aesthetic */}
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse'></div>
              <span className='text-sm text-gray-500 font-medium'>
                {formatDate(edu?.dateFrom)} - {formatDate(edu?.dateTo)}
              </span>
            </div>

            {/* Description */}
            {edu?.description && (
              <div className='space-y-2'>
                <p className='text-gray-700 leading-relaxed'>
                  {edu?.description}
                </p>
              </div>
            )}

            {/* Academic Achievements with techzen aesthetic */}
            <div className='flex flex-wrap gap-2 mt-4 pt-4 border-t border-emerald-200/50'>
              <span className='px-3 py-1 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 backdrop-blur-sm text-emerald-700 text-xs font-medium rounded-xl border border-emerald-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105'>
                Dean's List
              </span>
              <span className='px-3 py-1 bg-gradient-to-r from-teal-50/80 to-cyan-50/80 backdrop-blur-sm text-teal-700 text-xs font-medium rounded-xl border border-teal-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105'>
                Honors
              </span>
              <span className='px-3 py-1 bg-gradient-to-r from-slate-50/80 to-emerald-50/80 backdrop-blur-sm text-slate-700 text-xs font-medium rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105'>
                Research
              </span>
            </div>
          </div>

          {/* Enhanced hover effect with techzen aesthetic */}
          <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-emerald-50/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none'></div>
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
