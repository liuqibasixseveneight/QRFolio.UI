import type { TimelineItemProps } from './types';
import { Card, CardContent } from '../Card';

const TimelineItem = ({
  title,
  subtitle,
  date,
  description,
  accentColor,
}: TimelineItemProps) => (
  <Card className='shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 rounded-xl'>
    <CardContent>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='text-lg font-semibold font-poppins text-gray-900'>
          {title}
        </h3>
        <time className='text-xs font-mono text-gray-400'>{date}</time>
      </div>
      <p className={`text-sm font-semibold text-${accentColor} mb-2`}>
        {subtitle}
      </p>
      <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
        {description}
      </p>
    </CardContent>
  </Card>
);

export default TimelineItem;
