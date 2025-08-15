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
          className='w-full justify-between font-semibold h-12 rounded-2xl border-gray-200/50 bg-white/95 backdrop-blur-sm text-gray-900 hover:bg-white hover:border-gray-300/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 shadow-sm hover:shadow-md'
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
