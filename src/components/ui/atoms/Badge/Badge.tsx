import { cn } from '@/lib/utils';
import type { BadgeProps } from './types';

const Badge = ({
  label,
  subLabel,
  className,
  variant = 'default',
}: BadgeProps) => {
  const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
    default:
      'bg-gradient-to-r from-slate-100/90 via-blue-100/80 to-indigo-100/90 text-slate-700 border-slate-200/60 hover:from-slate-200/90 hover:via-blue-200/80 hover:to-indigo-200/90 hover:border-slate-300/60',
    primary:
      'bg-gradient-to-r from-blue-100/90 via-indigo-100/80 to-purple-100/90 text-blue-700 border-blue-200/60 hover:from-blue-200/90 hover:via-indigo-200/80 hover:to-purple-200/90 hover:border-blue-300/60',
    success:
      'bg-gradient-to-r from-emerald-100/90 via-teal-100/80 to-cyan-100/90 text-emerald-700 border-emerald-200/60 hover:from-emerald-200/90 hover:via-teal-200/80 hover:to-cyan-200/90 hover:border-emerald-300/60',
    warning:
      'bg-gradient-to-r from-amber-100/90 via-orange-100/80 to-red-100/90 text-amber-700 border-amber-200/60 hover:from-amber-200/90 hover:via-orange-200/80 hover:to-red-200/90 hover:border-amber-300/60',
    danger:
      'bg-gradient-to-r from-red-100/90 via-pink-100/80 to-rose-100/90 text-red-700 border-red-200/60 hover:from-red-200/90 hover:via-pink-200/80 hover:to-rose-200/90 hover:border-red-300/60',
    purple:
      'bg-gradient-to-r from-purple-100/90 via-pink-100/80 to-rose-100/90 text-purple-700 border-purple-200/60 hover:from-purple-200/90 hover:via-pink-200/80 hover:to-rose-200/90 hover:border-purple-300/60',
  };

  return (
    <span
      className={cn(
        'group relative inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold border backdrop-blur-sm transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl',
        variantStyles[variant],
        className
      )}
    >
      <span className='flex items-center gap-2'>
        {label}
        {subLabel && (
          <span className='inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-medium bg-white/80 text-slate-600 border border-slate-200/60 group-hover:bg-white/90 transition-all duration-500 backdrop-blur-sm'>
            {subLabel}
          </span>
        )}
      </span>

      {/* Enhanced glow effect on hover with techzen aesthetic */}
      <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
    </span>
  );
};

export default Badge;
