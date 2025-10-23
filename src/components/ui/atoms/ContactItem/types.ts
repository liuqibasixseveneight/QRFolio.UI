import type { ReactNode } from 'react';

export type ContactItemProps = {
  icon: ReactNode;
  label: string;
  value: string | ReactNode;
  href?: string;
};
