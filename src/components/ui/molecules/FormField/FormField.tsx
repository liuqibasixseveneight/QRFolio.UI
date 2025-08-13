import type { ChangeEvent } from 'react';
import { format, parseISO } from 'date-fns';
import { Controller } from 'react-hook-form';

import { DatePicker, Input, Label, Textarea } from '../../atoms';
import type { FormFieldProps } from './types';
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

            return (
              <div className='space-y-2'>
                {label && (
                  <Label
                    htmlFor={registerName}
                    className='text-sm font-medium text-gray-700'
                  >
                    {label}
                    {required && <span className='text-red-500 ml-1'>*</span>}
                  </Label>
                )}
                <DatePicker
                  date={dateObj}
                  onDateChange={(date) => {
                    if (date) {
                      field.onChange(format(date, 'yyyy-MM-dd'));
                    } else {
                      field.onChange('');
                    }
                  }}
                  placeholder={placeholder ?? 'Select date'}
                  disabled={readOnly}
                />
                {error && <p className='text-sm text-red-600'>{error}</p>}
              </div>
            );
          }}
        />
      );
    } else {
      const dateObj = value ? parseISO(value) : undefined;

      return (
        <div className='space-y-2'>
          {label && (
            <Label className='text-sm font-medium text-gray-700'>
              {label}
              {required && <span className='text-red-500 ml-1'>*</span>}
            </Label>
          )}
          <DatePicker
            date={dateObj}
            onDateChange={(date) => {
              if (date) {
                onChange?.(format(date, 'yyyy-MM-dd'));
              } else {
                onChange?.('');
              }
            }}
            placeholder={placeholder ?? 'Select date'}
            disabled={readOnly}
          />
          {error && <p className='text-sm text-red-600'>{error}</p>}
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
            <div className='space-y-2'>
              {label && (
                <Label
                  htmlFor={registerName}
                  className='text-sm font-medium text-gray-700'
                >
                  {label}
                  {required && <span className='text-red-500 ml-1'>*</span>}
                </Label>
              )}
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id={registerName}
                  className='w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200'
                >
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
              {error && <p className='text-sm text-red-600'>{error}</p>}
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
        <div className='space-y-2'>
          {label && (
            <Label className='text-sm font-medium text-gray-700'>
              {label}
              {required && <span className='text-red-500 ml-1'>*</span>}
            </Label>
          )}
          <Select value={selectedValue} onValueChange={handleValueChange}>
            <SelectTrigger className='w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200'>
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
          {error && <p className='text-sm text-red-600'>{error}</p>}
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
    <div className='space-y-2'>
      {label && (
        <Label className='text-sm font-medium text-gray-700'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </Label>
      )}
      {type === 'textarea' ? (
        <Textarea
          placeholder={placeholder}
          rows={rows}
          readOnly={readOnly}
          className='bg-white border-gray-300 focus:border-gray-500 focus:ring-gray-500 resize-vertical'
          {...commonInputProps}
        />
      ) : (
        <Input
          placeholder={placeholder}
          readOnly={readOnly}
          type={type}
          className='bg-white border-gray-300 focus:border-gray-500 focus:ring-gray-500'
          {...commonInputProps}
        />
      )}
      {error && <p className='text-sm text-red-600'>{error}</p>}
    </div>
  );
};

export default FormField;
