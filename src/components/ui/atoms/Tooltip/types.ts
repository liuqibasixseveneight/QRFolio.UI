import type { ReactNode } from 'react';

export type TooltipProps = {
  content: string;
  children: ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  show?: boolean;
};
