import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const Textarea = ({ className, ...props }: ComponentProps<'textarea'>) => {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'flex w-full min-h-20 border border-border bg-background px-3 py-2 text-base transition-colors outline-none',
        'placeholder:text-muted-foreground',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'rounded-none md:text-sm',
        className
      )}
      {...props}
    />
  );
};

export default Textarea;
