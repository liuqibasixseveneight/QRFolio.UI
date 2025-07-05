import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const Input = ({ className, type, ...props }: ComponentProps<'input'>) => {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'flex h-9 w-full border border-border bg-background px-3 py-1 text-base transition-colors outline-none',
        'placeholder:text-muted-foreground file:text-foreground',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'rounded-none md:text-sm',
        className
      )}
      {...props}
    />
  );
};

export default Input;
