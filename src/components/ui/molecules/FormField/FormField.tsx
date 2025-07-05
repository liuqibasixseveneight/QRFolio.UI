import type { ChangeEvent } from 'react';
import { format, parseISO } from 'date-fns';

import { Input, Label, Textarea } from '../../atoms';
import type { FormFieldProps } from './types';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Calendar } from '../Calendar';

const FormField = (props: FormFieldProps) => {
  if (props.type === 'date') {
    const { label, placeholder, value, onChange, error } = props;
    const dateObj = value ? parseISO(value) : undefined;
    const formattedDate = dateObj ? format(dateObj, 'MMMM do, yyyy') : '';

    return (
      <div className='mb-6'>
        {label && (
          <Label className='block text-sm font-medium text-gray-800 mb-1'>
            {label}
          </Label>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Input
              placeholder={placeholder ?? 'Select date'}
              readOnly
              value={formattedDate}
              className='
                border-0 border-b border-gray-300 bg-transparent px-0 py-2
                focus:border-primary focus:outline-none focus:ring-0
                transition-colors duration-200 ease-in-out
              '
            />
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={dateObj}
              onSelect={(date) => {
                if (date) {
                  onChange?.(format(date, 'yyyy-MM-dd'));
                }
              }}
            />
          </PopoverContent>
        </Popover>

        {error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
      </div>
    );
  }

  const {
    label,
    type = 'input',
    placeholder,
    rows,
    value = '',
    onChange,
    register,
    registerName,
    readOnly = false,
    error,
  } = props;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange?.(e.target.value);
  };

  const commonInputProps =
    register && registerName
      ? { ...register(registerName) }
      : {
          value: typeof value === 'string' ? value : '',
          onChange: handleInputChange,
        };

  const inputClasses = `
    border-0 border-b border-gray-300 bg-transparent px-0 py-2
    focus:border-primary focus:outline-none focus:ring-0
    transition-colors duration-200 ease-in-out
  `;

  return (
    <div className='mb-6'>
      {label && (
        <Label className='block text-sm font-medium text-gray-800 mb-1'>
          {label}
        </Label>
      )}
      {type === 'textarea' ? (
        <Textarea
          placeholder={placeholder}
          rows={rows}
          readOnly={readOnly}
          className={inputClasses}
          {...commonInputProps}
        />
      ) : (
        <Input
          placeholder={placeholder}
          readOnly={readOnly}
          className={inputClasses}
          {...commonInputProps}
        />
      )}

      {error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
    </div>
  );
};

export default FormField;
