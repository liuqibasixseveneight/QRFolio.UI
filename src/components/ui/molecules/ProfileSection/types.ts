import type { ReactNode } from 'react';

export type ProfileSectionProps = {
  title: string;
  count: number;
  icon: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
  isLast?: boolean;
  isCollapsedMode?: boolean;
};
