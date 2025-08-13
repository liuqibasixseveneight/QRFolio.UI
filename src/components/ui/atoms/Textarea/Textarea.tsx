import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const Textarea = ({ className, ...props }: ComponentProps<'textarea'>) => {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'flex w-full min-h-20 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors outline-none',
        'placeholder:text-gray-500',
        'focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:border-gray-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'resize-vertical',
        className
      )}
      {...props}
    />
  );
};

export default Textarea;
