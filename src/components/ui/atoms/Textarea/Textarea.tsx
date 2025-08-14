import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const Textarea = ({ className, ...props }: ComponentProps<'textarea'>) => {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'flex w-full min-h-20 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition-all duration-300 outline-none',
        'placeholder:text-gray-500',
        'focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'resize-vertical',
        'hover:border-gray-300',
        className
      )}
      {...props}
    />
  );
};

export default Textarea;
