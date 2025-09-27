export interface SafeHtmlProps {
  content: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}
