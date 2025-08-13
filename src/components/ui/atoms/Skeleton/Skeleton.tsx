import { cn } from '@/lib/utils';
import type { SkeletonProps } from './types';

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      data-slot='skeleton'
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  );
};
export default Skeleton;
