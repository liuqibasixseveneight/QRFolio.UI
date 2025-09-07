import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot='card'
    className={cn(
      'rounded-2xl bg-gradient-to-r from-slate-50/95 via-white to-slate-50/95 backdrop-blur-sm transition-all duration-300 hover:from-slate-50/98 hover:via-white hover:to-slate-50/98 border border-slate-200/40 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-200/30',
      className
    )}
    {...props}
  />
);

const CardHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot='card-header'
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
);

const CardTitle = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    data-slot='card-title'
    className={cn(
      'text-lg sm:text-xl font-semibold leading-none tracking-tight text-slate-900',
      className
    )}
    {...props}
  />
);

const CardDescription = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p
    data-slot='card-description'
    className={cn('text-slate-600 text-sm sm:text-base font-light', className)}
    {...props}
  />
);

const CardContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot='card-content'
    className={cn('p-6 pt-0', className)}
    {...props}
  />
);

const CardFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot='card-footer'
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
);

const CardAction = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot='card-action'
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
);

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
};
