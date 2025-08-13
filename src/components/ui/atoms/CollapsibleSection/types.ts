import type { ReactNode } from 'react';

export type CollapsibleSectionProps = {
  title: string;
  count?: number;
  children: ReactNode;
};
