import { useState } from 'react';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';

import type { DatePickerProps } from './types';

const DatePicker = ({
  date,
  onDateChange,
  placeholder = 'Select date',
  disabled = false,
}: DatePickerProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-full justify-between font-semibold h-12 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 transition-all duration-200',
            !date && 'text-slate-500'
          )}
          disabled={disabled}
        >
          {date ? format(date, 'MMMM dd, yyyy') : placeholder}
          <ChevronDown className='ml-2 h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={(selectedDate) => {
            onDateChange(selectedDate);
            setOpen(false);
          }}
          initialFocus
          captionLayout='dropdown'
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
