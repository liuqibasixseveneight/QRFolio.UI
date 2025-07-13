import type { ChangeEvent } from 'react';
import { format, parseISO } from 'date-fns';
import { Controller } from 'react-hook-form';

import { Input, Label, Textarea } from '../../atoms';
import type { FormFieldProps } from './types';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Calendar } from '../Calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';

const FormField = (props: FormFieldProps) => {
  const {
    label,
    type = 'input',
    placeholder,
    rows,
    value,
    onChange,
    error,
    register,
    registerName,
    readOnly = false,
    options = [],
    control,
    required,
  } = props;

  if (type === 'date') {
    if (control && registerName) {
      return (
        <Controller
          control={control}
          name={registerName}
          render={({ field }) => {
            const dateObj = field.value ? parseISO(field.value) : undefined;
            const formattedDate = dateObj
              ? format(dateObj, 'MMMM do, yyyy')
              : '';

            return (
              <div className='mb-4'>
                {label && (
                  <Label htmlFor={registerName} className='mb-1'>
                    {label}
                    {required && <span className='text-red-500'> *</span>}
                  </Label>
                )}
                <Popover>
                  <PopoverTrigger asChild>
                    <Input
                      id={registerName}
                      placeholder={placeholder ?? 'Select date'}
                      readOnly
                      value={formattedDate}
                      className='cursor-pointer'
                    />
                  </PopoverTrigger>
                  <PopoverContent align='start' className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={dateObj}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(format(date, 'yyyy-MM-dd'));
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {error && <p className='text-sm text-red-600 mt-1'>{error}</p>}
              </div>
            );
          }}
        />
      );
    } else {
      const dateObj = value ? parseISO(value) : undefined;
      const formattedDate = dateObj ? format(dateObj, 'MMMM do, yyyy') : '';

      return (
        <div className='mb-4'>
          {label && (
            <Label className='mb-1'>
              {label}
              {required && <span className='text-red-500'> *</span>}
            </Label>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Input
                placeholder={placeholder ?? 'Select date'}
                readOnly
                value={formattedDate}
                className='cursor-pointer'
              />
            </PopoverTrigger>
            <PopoverContent align='start' className='w-auto p-0'>
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
          {error && <p className='text-sm text-red-600 mt-1'>{error}</p>}
        </div>
      );
    }
  }

  if (type === 'select') {
    if (control && registerName) {
      return (
        <Controller
          control={control}
          name={registerName}
          render={({ field }) => (
            <div className='mb-4'>
              {label && (
                <Label htmlFor={registerName} className='mb-1'>
                  {label}
                  {required && <span className='text-red-500'> *</span>}
                </Label>
              )}
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id={registerName} className='w-full'>
                  <SelectValue
                    placeholder={placeholder ?? 'Select an option'}
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {error && <p className='text-sm text-red-600 mt-1'>{error}</p>}
            </div>
          )}
        />
      );
    } else {
      const handleValueChange = (val: string) => {
        if (register && registerName) {
          const event = { target: { name: registerName, value: val } };
          register(registerName).onChange(event);
        }
        onChange?.(val);
      };

      const selectedValue = register && registerName ? undefined : value ?? '';

      return (
        <div className='mb-4'>
          {label && (
            <Label className='mb-1'>
              {label}
              {required && <span className='text-red-500'> *</span>}
            </Label>
          )}
          <Select value={selectedValue} onValueChange={handleValueChange}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={placeholder ?? 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className='text-sm text-red-600 mt-1'>{error}</p>}
        </div>
      );
    }
  }

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
    <div className='mb-4'>
      {label && (
        <Label className='mb-1'>
          {label}
          {required && <span className='text-red-500'> *</span>}
        </Label>
      )}
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
      {error && <p className='text-sm text-red-600 mt-1'>{error}</p>}
    </div>
  );
};

export default FormField;
