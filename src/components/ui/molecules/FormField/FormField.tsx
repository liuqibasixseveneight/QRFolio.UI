import type { ChangeEvent } from 'react';
import { format } from 'date-fns';

import { Input, Label, Textarea } from '../../atoms';
import type { FormFieldProps } from './types';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Calendar } from '../Calendar';

const FormField = (props: FormFieldProps) => {
  if (props.type === 'date') {
    const { label, placeholder, value, onChange, error } = props;

    const dateObj = value ? new Date(value) : undefined;

    const formattedDate = dateObj ? format(dateObj, 'yyyy-MM-dd') : '';

    return (
      <div>
        {label && <Label>{label}</Label>}
        <Popover>
          <PopoverTrigger asChild>
            <Input
              placeholder={placeholder ?? 'Select date'}
              readOnly={true}
              value={formattedDate}
            />
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={dateObj}
              onSelect={(date) => {
                if (date) {
                  onChange?.(date.toISOString().split('T')[0]);
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

  return (
    <div>
      {label && <Label>{label}</Label>}
      {type === 'textarea' ? (
        <Textarea
          placeholder={placeholder}
          rows={rows}
          readOnly={readOnly}
          {...commonInputProps}
        />
      ) : (
        <Input
          placeholder={placeholder}
          readOnly={readOnly}
          {...commonInputProps}
        />
      )}

      {error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
    </div>
  );
};

export default FormField;
