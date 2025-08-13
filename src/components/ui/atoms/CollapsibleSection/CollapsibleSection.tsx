import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import type { CollapsibleSectionProps } from './types';

const CollapsibleSection = ({
  title,
  count,
  children,
}: CollapsibleSectionProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div className='rounded-xl border border-indigo-100 overflow-hidden shadow-sm bg-white/70 backdrop-blur-md'>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        type='button'
        className='flex items-center justify-between w-full py-4 px-6 font-semibold text-lg tracking-wide text-indigo-700 hover:bg-indigo-50 transition-colors cursor-pointer'
      >
        <span className='whitespace-nowrap'>
          {title}{' '}
          {count !== undefined
            ? `(${count} item${count === 1 ? '' : 's'})`
            : ''}
        </span>
        <ChevronDown
          className={`text-indigo-600 transform transition-transform duration-300 ease-in-out ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
          size={20}
          aria-hidden='true'
        />
      </button>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='py-6 px-6 space-y-4'>{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
