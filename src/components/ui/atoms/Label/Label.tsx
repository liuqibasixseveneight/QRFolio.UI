import type { ComponentProps } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/lib/utils';

const Label = ({
  className,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root>) => {
  return (
    <LabelPrimitive.Root
      data-slot='label'
      className={cn(
        'text-sm font-medium leading-none select-none text-gray-700',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
};

export default Label;
