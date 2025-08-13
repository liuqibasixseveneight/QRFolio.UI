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
    <article className='mb-8 last:mb-0'>
      <header className='flex justify-between items-center mb-1'>
        <h3 className='text-lg font-semibold font-poppins text-gray-900'>
          {title}
        </h3>
        <time className='text-xs font-mono text-gray-400'>{date}</time>
      </header>
      <p className={`${accentColorClass} text-sm font-semibold mb-1`}>
        {subtitle}
      </p>
      <p className='text-gray-700 leading-relaxed whitespace-pre-wrap text-sm'>
        {description}
      </p>
    </article>
  );
};

export default TimelineItem;
