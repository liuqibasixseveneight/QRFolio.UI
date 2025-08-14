import type { TimelineItemProps } from './types';

const TimelineItem = ({
  title,
  subtitle,
  date,
  description,
  accentColor = 'indigo-600',
}: TimelineItemProps) => {
  const accentColorClass =
    accentColor === 'indigo-600'
      ? 'text-indigo-600'
      : accentColor === 'red-600'
      ? 'text-red-600'
      : 'text-indigo-600';

  return (
    <article className='group relative'>
      {/* Timeline connector - removed dots, kept subtle line */}
      <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-gray-300 to-transparent'></div>

      {/* Content container */}
      <div className='relative pl-8 pb-8 last:pb-0'>
        {/* Content */}
        <div className='bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:bg-white hover:border-gray-300 transition-all duration-300 group-hover:shadow-md'>
          {/* Header */}
          <header className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-2 sm:space-y-0'>
            <div className='flex-1'>
              <h3 className='text-lg sm:text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300 leading-tight'>
                {title}
              </h3>
            </div>
            <time className='text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200 flex-shrink-0'>
              {date}
            </time>
          </header>

          {/* Subtitle */}
          <p
            className={`${accentColorClass} text-sm font-semibold mb-3 flex items-center space-x-2`}
          >
            <span className='w-2 h-2 bg-current rounded-full'></span>
            <span>{subtitle}</span>
          </p>

          {/* Description */}
          <p className='text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-wrap'>
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default TimelineItem;
