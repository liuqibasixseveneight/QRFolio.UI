import type { ReactNode } from 'react';

export type SectionProps = {
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  children: ReactNode;
  accentColor?: string;
  className?: string;
};
