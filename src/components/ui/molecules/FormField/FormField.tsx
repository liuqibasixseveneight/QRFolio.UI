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
import { PhoneInput } from '../PhoneInput';

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
                    className='w-full h-12 rounded-xl border border-gray-200/50 bg-white/95 backdrop-blur-sm px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-indigo-300/70 hover:bg-white shadow-lg hover:shadow-xl'
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
            <SelectTrigger className='w-full h-12 rounded-xl border border-gray-200/50 bg-white/95 backdrop-blur-sm px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-indigo-300/70 hover:bg-white shadow-lg hover:shadow-xl'>
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
          placeholder={placeholder}
          rows={rows}
          readOnly={readOnly}
          className='bg-white/95 backdrop-blur-sm border-gray-200/50 focus:border-indigo-500 focus:ring-indigo-500/20 resize-vertical transition-all duration-300 hover:border-indigo-300/70 hover:bg-white shadow-lg hover:shadow-xl rounded-xl'
          {...commonInputProps}
        />
      ) : (
        <Input
          placeholder={placeholder}
          readOnly={readOnly}
          type={type}
          className='bg-white/95 backdrop-blur-sm border-gray-200/50 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-300 hover:border-indigo-300/70 hover:bg-white shadow-lg hover:shadow-xl rounded-xl h-12'
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
