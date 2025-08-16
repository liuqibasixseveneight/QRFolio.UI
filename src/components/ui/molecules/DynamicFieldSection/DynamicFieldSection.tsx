import React, { useState } from 'react';
import { get } from 'lodash';
import { Trash2 } from 'lucide-react';
import { Button, Ellipsis } from '@/components/ui';
import { FormField } from '../FormField';
import type { DynamicFieldSectionProps, FieldConfig } from './types';

const DynamicFieldSection = <T extends Record<string, any>>({
  title,
  fields = [],
  fieldsConfig = [],
  register,
  registerNamePrefix,
  errors,
  control,
  onRemove,
  titleField,
}: DynamicFieldSectionProps<T>) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleRemove = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(index);
  };

  if (!fields || fields.length === 0) {
    return null;
  }

  return (
    <section className='space-y-4'>
      <h3 className='text-xl font-bold text-slate-900 tracking-tight'>
        {title}
      </h3>

      {fields.map((field: { id: string }, index: number) => {
        const isActive = activeIndex === index;

        // Determine display title based on titleField
        let displayTitle: React.ReactNode;
        if (titleField && get(fields?.[index], titleField)) {
          displayTitle = get(fields?.[index], titleField);
        } else {
          // No titleField specified, show generic fallback
          displayTitle = <em className='text-gray-500 italic'>New Entry</em>;
        }

        return (
          <div
            key={field?.id}
            className='rounded-2xl bg-gradient-to-r from-slate-50/90 via-white to-blue-50/90 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:from-slate-50/95 hover:via-white hover:to-blue-50/95 border border-slate-200/40 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:shadow-slate-200/30'
          >
            <div
              className='p-4 sm:p-6 bg-gradient-to-r from-slate-50/50 via-white to-blue-50/50 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:from-slate-50/70 hover:via-white hover:to-blue-50/70 transition-all duration-300'
              onClick={() => toggleIndex(index)}
            >
              <div className='flex-1 min-w-0'>
                <span className='font-medium text-slate-900 block'>
                  {typeof displayTitle === 'string' ? (
                    <Ellipsis
                      text={displayTitle}
                      maxLength={50}
                      className='font-medium text-slate-900'
                    />
                  ) : (
                    displayTitle
                  )}
                </span>
                {/* Show additional context for different section types */}
                {titleField === 'schoolName' &&
                  get(fields?.[index], 'degree') && (
                    <span className='text-sm text-slate-600 block'>
                      <Ellipsis
                        text={`${get(fields?.[index], 'degree')}${
                          get(fields?.[index], 'fieldOfStudy')
                            ? ` - ${get(fields?.[index], 'fieldOfStudy')}`
                            : ''
                        }`}
                        maxLength={60}
                        className='text-sm text-slate-600'
                      />
                    </span>
                  )}
                {titleField === 'language' &&
                  get(fields?.[index], 'fluencyLevel') && (
                    <span className='text-sm text-slate-600 block'>
                      <Ellipsis
                        text={`${get(fields?.[index], 'fluencyLevel')} level`}
                        maxLength={40}
                        className='text-sm text-slate-600'
                      />
                    </span>
                  )}
                {titleField === 'jobTitle' &&
                  get(fields?.[index], 'companyName') && (
                    <span className='text-sm text-slate-600 block'>
                      <Ellipsis
                        text={get(fields?.[index], 'companyName') || ''}
                        maxLength={50}
                        className='text-sm text-slate-600'
                      />
                    </span>
                  )}
              </div>
              <div className='flex items-center gap-2 flex-shrink-0'>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={(e: React.MouseEvent) => handleRemove(index, e)}
                  className='px-3 py-2 text-xs font-medium transition-all duration-300 hover:bg-red-50 hover:border-red-300/50 hover:text-red-700 hover:shadow-md hover:shadow-red-200/30 border-red-200/50 text-red-600 bg-white/80 backdrop-blur-sm flex items-center gap-1.5'
                >
                  <Trash2 className='h-3.5 w-3.5' />
                  Remove
                </Button>
              </div>
            </div>

            {isActive && (
              <div className='p-6 space-y-6 bg-white/90 border-t border-slate-200/40'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {fieldsConfig?.map((config: FieldConfig) => {
                    const error = get(
                      errors,
                      `${registerNamePrefix}.${index}.${config?.name}.message`
                    ) as string | undefined;

                    // Full-width fields for certain types
                    const isFullWidth =
                      config?.type === 'textarea' ||
                      config?.name === 'responsibilities' ||
                      config?.name === 'description';

                    return (
                      <div
                        key={config?.name}
                        className={isFullWidth ? 'md:col-span-2' : ''}
                      >
                        <FormField
                          label={config?.label}
                          type={config?.type}
                          rows={config?.rows}
                          options={config?.options}
                          register={register}
                          registerName={`${registerNamePrefix}.${index}.${config?.name}`}
                          error={error}
                          control={control}
                          required={config?.required}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default DynamicFieldSection;
