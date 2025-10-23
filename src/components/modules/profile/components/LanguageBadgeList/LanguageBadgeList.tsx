import { Badge } from '@/components/ui';
import type { LanguagesBadgeListProps } from './types';

const LanguagesBadgeList = ({ languages }: LanguagesBadgeListProps) => (
  <ul className='flex flex-wrap gap-3'>
    {languages?.map((lang, index) => (
      <li key={`${lang?.language}-${index}`}>
        <Badge label={lang?.language || ''} subLabel={lang?.fluencyLevel} />
      </li>
    ))}
  </ul>
);

export default LanguagesBadgeList;
