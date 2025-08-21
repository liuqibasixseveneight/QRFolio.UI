import type { ComponentProps } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const Tabs = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) => {
  return (
    <TabsPrimitive.Root
      data-slot='tabs'
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  );
};

const TabsList = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) => {
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      className={cn(
        'w-full bg-gradient-to-r from-slate-50/90 via-slate-50/80 to-slate-50/90 backdrop-blur-sm text-slate-700 flex items-center justify-center rounded-2xl p-1.5 border border-slate-200/40 shadow-xl shadow-slate-200/20',
        className
      )}
      {...props}
    />
  );
};

const TabsTrigger = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) => {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(
        'flex-1 h-14 px-4 sm:px-6 text-sm sm:text-base font-semibold text-slate-600 whitespace-nowrap transition-all duration-300 ease-out rounded-xl border border-transparent cursor-pointer hover:text-slate-800 hover:bg-white/80 hover:shadow-lg hover:shadow-slate-200/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-xl data-[state=active]:shadow-slate-200/40 data-[state=active]:border-slate-200/60',
        className
      )}
      {...props}
    />
  );
};

const TabsContent = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) => {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={cn(
        'flex-1 outline-none data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-top-1 duration-200',
        className
      )}
      {...props}
    />
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
