import type { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-md hover:shadow-lg focus-visible:ring-indigo-500',
        destructive:
          'bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg focus-visible:ring-red-500',
        outline:
          'border border-gray-300/50 bg-white/95 backdrop-blur-sm text-gray-700 shadow-md hover:bg-white hover:border-gray-400/50 hover:shadow-lg focus-visible:ring-gray-500',
        secondary:
          'bg-gray-100/90 backdrop-blur-sm text-gray-900 shadow-md hover:bg-gray-200/90 hover:shadow-lg focus-visible:ring-gray-500',
        ghost:
          'hover:bg-gray-100/90 hover:text-gray-900 focus-visible:ring-gray-500',
        link: 'text-gray-900 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-5 py-2.5 has-[>svg]:px-4',
        sm: 'h-9 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-12 px-6 py-3 has-[>svg]:px-5',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export default Button;
