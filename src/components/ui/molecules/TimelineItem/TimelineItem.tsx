import type { TimelineItemProps } from './types';

const TimelineItem = ({
  title,
  subtitle,
  date,
  description,
  accentColor = 'slate-600',
}: TimelineItemProps) => {
  const accentColorClass =
    accentColor === 'slate-600'
      ? 'text-slate-600'
      : accentColor === 'red-600'
      ? 'text-red-600'
      : 'text-slate-600';

  return (
    <div className='relative group'>
      <div className='absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-200 via-slate-300 to-transparent'></div>

      <div className='relative ml-12 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-50/90 via-white to-slate-50/90 backdrop-blur-sm hover:from-slate-50/95 hover:via-white hover:to-slate-50/95 transition-all duration-300 border border-slate-200/40 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:shadow-slate-200/30'>
        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4'>
          <div className='flex-1 min-w-0'>
            <h3 className='text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-slate-800 transition-colors duration-300 leading-tight mb-2'>
              {title}
            </h3>
            {subtitle && (
              <p className='text-slate-600 text-sm sm:text-base font-medium mb-2'>
                {subtitle}
              </p>
            )}
            {description && (
              <p className='text-slate-600 text-sm sm:text-base leading-relaxed font-light'>
                {description}
              </p>
            )}
          </div>

          <time className='inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 border border-slate-300/40 flex-shrink-0 shadow-sm'>
            {date}
          </time>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
