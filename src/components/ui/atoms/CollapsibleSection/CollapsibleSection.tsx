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
    <div className='bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-500'>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        type='button'
        className='flex items-center justify-between w-full py-6 px-6 font-bold text-lg tracking-wide text-gray-800 hover:bg-gray-50 transition-all duration-300 cursor-pointer group'
      >
        <div className='flex items-center space-x-3'>
          <span className='whitespace-nowrap'>{title}</span>
          {count !== undefined && (
            <span className='px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700 border border-gray-300'>
              {count} item{count === 1 ? '' : 's'}
            </span>
          )}
        </div>
        <div className='flex items-center space-x-2'>
          <ChevronDown
            className={`text-gray-400 transform transition-all duration-500 ease-out group-hover:text-gray-600 ${
              open ? 'rotate-180' : 'rotate-0'
            }`}
            size={20}
            aria-hidden='true'
          />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='py-6 px-6 space-y-6 border-t border-gray-200'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
