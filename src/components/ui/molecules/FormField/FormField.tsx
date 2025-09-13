import { type ChangeEvent } from 'react';
import { Controller } from 'react-hook-form';
import { format, parseISO } from 'date-fns';
import { DatePicker, Input, Label, Textarea } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';
import { PhoneInput } from '../PhoneInput';
import type { FormFieldProps } from './types';

const FormField = (props: FormFieldProps) => {
  const {
    label,
    type = 'input',
    register,
    registerName,
    control,
    placeholder,
    rows,
    readOnly,
    required,
    error,
    options = [],
    onPhoneChange,
    value,
    onChange,
  } = props;

  if (type === 'phone') {
    if (control && registerName) {
      return (
        <Controller
          control={control}
          name={registerName}
          render={({ field }) => (
            <PhoneInput
              label={label}
              value={field.value}
              onChange={(phoneData) => {
                // The PhoneInput component now returns the full phone data structure
                field.onChange(phoneData);
                onPhoneChange?.(phoneData);
              }}
              error={error}
              required={required}
            />
          )}
        />
      );
    }
  }

  if (type === 'date') {
    if (control && registerName) {
      return (
        <Controller
          control={control}
          name={registerName}
          render={({ field }) => {
            const dateObj = field.value ? parseISO(field.value) : undefined;

            return (
              <div className='space-y-3'>
                {label && (
                  <Label
                    htmlFor={registerName}
                    className='text-sm sm:text-base font-semibold text-gray-800 tracking-wide'
                  >
                    {label}
                    {required && <span className='text-red-500 ml-1'>*</span>}
                  </Label>
                )}
                <DatePicker
                  date={dateObj}
                  onDateChange={(date: Date | undefined) => {
                    if (date) {
                      field.onChange(format(date, 'yyyy-MM-dd'));
                    } else {
                      field.onChange('');
                    }
                  }}
                  placeholder={
                    typeof placeholder === 'string'
                      ? placeholder
                      : 'Select date'
                  }
                  disabled={readOnly}
                />
                {error && (
                  <p className='text-sm sm:text-base text-red-600 font-semibold'>
                    {error}
                  </p>
                )}
              </div>
            );
          }}
        />
      );
    } else {
      const dateObj = value ? parseISO(value) : undefined;

      return (
        <div className='space-y-3'>
          {label && (
            <Label className='text-sm sm:text-base font-semibold text-gray-800 tracking-wide'>
              {label}
              {required && <span className='text-red-500 ml-1'>*</span>}
            </Label>
          )}
          <DatePicker
            date={dateObj}
            onDateChange={(date: Date | undefined) => {
              if (date) {
                onChange?.(format(date, 'yyyy-MM-dd'));
              } else {
                onChange?.('');
              }
            }}
            placeholder={
              typeof placeholder === 'string' ? placeholder : 'Select date'
            }
            disabled={readOnly}
          />
          {error && (
            <p className='text-sm sm:text-base text-red-600 font-semibold'>
              {error}
            </p>
          )}
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
          render={({ field }) => {
            return (
              <div className='space-y-3'>
                {label && (
                  <Label
                    htmlFor={registerName}
                    className='text-sm sm:text-base font-semibold text-gray-800 tracking-wide'
                  >
                    {label}
                    {required && <span className='text-red-500 ml-1'>*</span>}
                  </Label>
                )}
                <Select
                  key={`${registerName}-${field.value}`}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={registerName}
                    className='w-full h-12 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200'
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
                {error && (
                  <p className='text-sm sm:text-base text-red-600 font-semibold'>
                    {error}
                  </p>
                )}
              </div>
            );
          }}
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
        <div className='space-y-3'>
          {label && (
            <Label className='text-sm sm:text-base font-semibold text-gray-800 tracking-wide'>
              {label}
              {required && <span className='text-red-500 ml-1'>*</span>}
            </Label>
          )}
          <Select value={selectedValue} onValueChange={handleValueChange}>
            <SelectTrigger className='w-full h-12 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200'>
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
          {error && (
            <p className='text-sm sm:text-base text-red-600 font-semibold'>
              {error}
            </p>
          )}
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
    <div className='space-y-3'>
      {label && (
        <Label className='text-sm sm:text-base font-semibold text-gray-800 tracking-wide'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </Label>
      )}
      {type === 'textarea' ? (
        <Textarea
          placeholder={
            typeof placeholder === 'string' ? placeholder : undefined
          }
          rows={rows}
          readOnly={readOnly}
          className='bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent resize-vertical transition-all duration-200 rounded-xl'
          {...commonInputProps}
        />
      ) : (
        <Input
          placeholder={
            typeof placeholder === 'string' ? placeholder : undefined
          }
          readOnly={readOnly}
          type={type}
          className='bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200 rounded-xl h-12'
          {...commonInputProps}
        />
      )}
      {error && (
        <p className='text-sm sm:text-base text-red-600 font-semibold'>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
