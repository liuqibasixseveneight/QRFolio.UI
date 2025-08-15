import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { format } from 'date-fns';

import type { DatePickerProps } from './types';
import {
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../molecules';
import { Button } from '../Button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
            'w-full justify-between font-semibold h-12 rounded-xl border border-slate-200/50 bg-white/95 backdrop-blur-sm px-4 py-3 text-sm text-slate-900 hover:border-slate-300/70 hover:bg-white hover:shadow-lg hover:shadow-slate-200/30 transition-all duration-300',
            !date && 'text-slate-500'
          )}
          disabled={disabled}
        >
          {date ? format(date, 'MMMM dd, yyyy') : placeholder}
          <ChevronDownIcon className='ml-2 h-4 w-4 opacity-50' />
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
