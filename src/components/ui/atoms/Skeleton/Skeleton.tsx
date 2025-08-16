import { cn } from '@/lib/utils';
import type { SkeletonProps } from './types';

const Skeleton = ({
  className,
  variant = 'default',
  ...props
}: SkeletonProps) => {
  const variantStyles: Record<NonNullable<SkeletonProps['variant']>, string> = {
    default:
      'bg-gradient-to-r from-slate-200/80 via-slate-300/80 to-slate-200/80',
    primary:
      'bg-gradient-to-r from-blue-200/80 via-indigo-300/80 to-blue-200/80',
    success:
      'bg-gradient-to-r from-emerald-200/80 via-teal-300/80 to-emerald-200/80',
    warning:
      'bg-gradient-to-r from-amber-200/80 via-orange-300/80 to-amber-200/80',
    danger: 'bg-gradient-to-r from-red-200/80 via-pink-300/80 to-red-200/80',
    purple:
      'bg-gradient-to-r from-purple-200/80 via-pink-300/80 to-purple-200/80',
  };

  return (
    <div
      className={cn(
        'animate-pulse rounded-2xl backdrop-blur-sm border border-white/60 shadow-sm',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
};

export default Skeleton;
