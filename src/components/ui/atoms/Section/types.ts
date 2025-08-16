import type { ReactNode } from 'react';

export type SectionProps = {
  title?: string | ReactNode;
  children: ReactNode;
  accentColor: string;
};
