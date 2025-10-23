import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

const Separator = ({
  className,
  orientation = 'horizontal',
  variant = 'default',
  ...props
}: ComponentProps<typeof SeparatorPrimitive.Root> & {
  variant?: 'default' | 'gradient' | 'dashed' | 'dotted';
}) => {
  const variantStyles = {
    default:
      'bg-gradient-to-r from-slate-200/60 via-slate-300/60 to-slate-200/60',
    gradient:
      'bg-gradient-to-r from-transparent via-slate-400/60 to-transparent',
    dashed:
      'bg-gradient-to-r from-transparent via-slate-300/60 to-transparent border-dashed border-t border-slate-300/60',
    dotted:
      'bg-gradient-to-r from-transparent via-slate-300/60 to-transparent border-dotted border-t border-slate-300/60',
  };

  return (
    <SeparatorPrimitive.Root
      className={cn(
        'shrink-0 transition-all duration-500',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        variantStyles[variant],
        className
      )}
      orientation={orientation}
      {...props}
    />
  );
};

export default Separator;
