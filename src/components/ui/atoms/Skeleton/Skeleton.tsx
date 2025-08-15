import { cn } from '@/lib/utils';
import type { SkeletonProps } from './types';

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      data-slot='skeleton'
      className={cn('bg-gray-200 animate-pulse rounded-lg', className)}
      {...props}
    />
  );
};
export default Skeleton;
