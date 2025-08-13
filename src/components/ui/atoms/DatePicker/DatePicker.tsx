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
          className='w-full justify-between font-normal h-10 rounded-lg border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-500'
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
