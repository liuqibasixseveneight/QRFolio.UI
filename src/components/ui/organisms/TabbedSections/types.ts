import type { ReactNode } from 'react';

export type TabItem = {
  label: string;
  value: string;
};

export type ContentsItem = {
  value: string;
  content: ReactNode;
};

export type TabbedSectionsProps = {
  tabs: TabItem[];
  contents: ContentsItem[];
  defaultValue?: string;
  className?: string;
};
