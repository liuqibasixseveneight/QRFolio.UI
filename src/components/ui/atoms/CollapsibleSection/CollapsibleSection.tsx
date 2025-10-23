import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

import type { CollapsibleSectionProps } from './types';

const CollapsibleSection = ({
  title,
  count,
  children,
}: CollapsibleSectionProps) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className='rounded-2xl bg-gradient-to-r from-slate-50/90 via-slate-50/80 to-slate-50/90 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:from-slate-50/95 hover:via-slate-50/90 hover:to-slate-50/95 border border-slate-200/40 shadow-xl shadow-slate-200/20'>
      <button
        onClick={toggleCollapsed}
        className='w-full p-4 sm:p-6 flex items-center justify-between text-left hover:bg-white/30 transition-all duration-300 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        aria-expanded={!collapsed}
        aria-label={`${collapsed ? 'Expand' : 'Collapse'} ${title} section`}
      >
        <div className='flex items-center gap-3'>
          <h3 className='text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-slate-700 transition-colors duration-300'>
            {title}
          </h3>
          {count !== undefined && (
            <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 border border-slate-300/40 shadow-sm'>
              {count}
            </span>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-xs text-slate-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            {collapsed ? 'Click to expand' : 'Click to collapse'}
          </span>
          <ChevronDown
            className={cn(
              'h-5 w-5 text-slate-500 transition-all duration-300 group-hover:text-slate-600',
              !collapsed && 'rotate-180'
            )}
          />
        </div>
      </button>

      {!collapsed && (
        <div className='px-4 sm:px-6 pb-4 sm:pb-6 border-t border-slate-200/40 bg-white/40'>
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
