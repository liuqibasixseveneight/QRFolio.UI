import { cn } from '@/lib/utils';
import type { BadgeProps } from './types';

const Badge = ({ label, subLabel, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium bg-gradient-to-r from-slate-100 to-blue-100 text-slate-700 border border-slate-200/50 transition-all duration-300 hover:from-slate-200 hover:to-blue-200 hover:border-slate-300 hover:text-slate-800 hover:scale-105 shadow-sm',
        className
      )}
    >
      {label}
      {subLabel && (
        <span className='inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-white/60 text-slate-600 border border-slate-200/50'>
          {subLabel}
        </span>
      )}
    </span>
  );
};

export default Badge;
