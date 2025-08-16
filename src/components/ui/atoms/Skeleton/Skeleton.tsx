import { cn } from '@/lib/utils';
import type { SkeletonProps } from './types';

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn('bg-slate-200 animate-pulse rounded-xl', className)}
      {...props}
    />
  );
};
export default Skeleton;
