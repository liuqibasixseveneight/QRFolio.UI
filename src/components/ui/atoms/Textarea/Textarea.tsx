import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const Textarea = ({ className, ...props }: ComponentProps<'textarea'>) => {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'flex w-full min-h-20 rounded-2xl border border-gray-200/50 bg-white/95 backdrop-blur-sm px-4 py-3 text-sm text-gray-900 transition-all duration-300 outline-none',
        'placeholder:text-gray-500',
        'focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'resize-vertical',
        'hover:border-gray-300/70 hover:bg-white shadow-sm hover:shadow-md',
        className
      )}
      {...props}
    />
  );
};

export default Textarea;
