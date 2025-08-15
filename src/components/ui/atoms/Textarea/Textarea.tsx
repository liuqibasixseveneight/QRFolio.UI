import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import React from 'react';

interface TextareaProps extends ComponentProps<'textarea'> {}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-xl border border-slate-200/50 bg-white/95 backdrop-blur-sm px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-slate-300/70 hover:bg-white hover:shadow-lg hover:shadow-slate-200/30',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export default Textarea;
