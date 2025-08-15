import { useEffect, useRef, type ComponentProps } from 'react';
import { getDefaultClassNames, type DayButton } from 'react-day-picker';

import { Button } from '../../atoms';
import { cn } from '@/lib/utils';

const CalendarDayButton = ({
  className,
  day,
  modifiers,
  ...props
}: ComponentProps<typeof DayButton>) => {
  const defaultClassNames = getDefaultClassNames();

  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant='ghost'
      size='icon'
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'data-[selected-single=true]:bg-indigo-600 data-[selected-single=true]:text-white data-[range-middle=true]:bg-indigo-100 data-[range-middle=true]:text-indigo-900 data-[range-start=true]:bg-indigo-600 data-[range-start=true]:text-white data-[range-end=true]:bg-indigo-600 data-[range-end=true]:text-white group-data-[focused=true]/day:border-indigo-500 group-data-[focused=true]/day:ring-2 group-data-[focused=true]/day:ring-indigo-500 hover:text-indigo-900 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 data-[range-end=true]:rounded-xl data-[range-end=true]:rounded-r-xl data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-xl data-[range-start=true]:rounded-l-xl [&>span]:text-xs [&>span]:opacity-70 transition-all duration-200',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
};

export default CalendarDayButton;
