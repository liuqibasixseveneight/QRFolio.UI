import type { JSX } from 'react';

export type SafeHtmlProps = {
  content: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
};
