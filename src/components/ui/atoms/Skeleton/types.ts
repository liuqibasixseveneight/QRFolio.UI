import type { ComponentProps } from 'react';

export type SkeletonProps = ComponentProps<'div'> & {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'purple';
};
