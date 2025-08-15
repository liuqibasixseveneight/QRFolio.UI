import type { FieldValues, Path } from 'react-hook-form';
import type { MouseEvent, ReactNode } from 'react';
import { useWatch } from 'react-hook-form';
import { Trash2 } from 'lucide-react';
// @ts-expect-error lodash import error
import get from 'lodash/get';

import { Button } from '../../atoms';
import { FormField } from '../FormField';
import type { DynamicFieldSectionProps } from './types';

const cx = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const isEntryComplete = (
  entry: any,
  config: DynamicFieldSectionProps<any>['fieldsConfig'][number]
) => {
  const value = get(entry, config.name);
  if (value === undefined || value === null) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  return true;
};

const DynamicFieldSection = <T extends FieldValues>({
  title,
  titleField,
  fields,
  fieldsConfig,
  registerNamePrefix,
  errors,
  onRemove,
  onAppend,
  appendLabel,
  register,
  control,
  activeIndex,
  setActiveIndex,
}: DynamicFieldSectionProps<T>) => {
  const lastIndex = fields.length - 1;

  const lastEntryValues = useWatch({
    control,
    name: (registerNamePrefix + '.' + lastIndex) as unknown as Path<T>,
  });

  const isLastEntryComplete =
    fields.length === 0 ||
    fieldsConfig.every((config) => isEntryComplete(lastEntryValues, config));

  const handleAppend = () => {
    if (!isLastEntryComplete) return;
    onAppend();
    setActiveIndex(fields.length);
  };

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleRemove = (index: number, e: MouseEvent) => {
    e.stopPropagation();
    onRemove(index);
    if (activeIndex === index) {
      setActiveIndex(null);
      return;
    }
    if (activeIndex !== null && activeIndex > index) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <section className='space-y-6'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <h3 className='text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent'>
          {title}
        </h3>
        <Button
          type='button'
          onClick={handleAppend}
          disabled={!isLastEntryComplete}
          className={cx(
            'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35',
            !isLastEntryComplete &&
              'opacity-50 cursor-not-allowed hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg'
          )}
        >
          {appendLabel}
        </Button>
      </div>

      {fields?.length === 0 && (
        <div className='text-center py-12 text-slate-500 bg-gradient-to-r from-slate-50/80 via-white to-blue-50/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-200/50 shadow-lg shadow-slate-200/20'>
          <p className='text-sm sm:text-base font-medium'>
            No {title.toLowerCase()} added yet.
          </p>
          <p className='text-xs sm:text-sm mt-2 text-slate-400'>
            Click the button above to get started.
          </p>
        </div>
      )}

      {fields?.map((field, index) => {
        const isActive = activeIndex === index;
        let displayTitle: string | React.ReactNode = '';

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
                <span className='font-medium text-slate-900 block truncate'>
                  {displayTitle}
                </span>
                {/* Show additional context for different section types */}
                {titleField === 'schoolName' &&
                  get(fields?.[index], 'degree') && (
                    <span className='text-sm text-slate-600 block truncate'>
                      {get(fields?.[index], 'degree')}
                      {get(fields?.[index], 'fieldOfStudy') &&
                        ` - ${get(fields?.[index], 'fieldOfStudy')}`}
                    </span>
                  )}
                {titleField === 'language' &&
                  get(fields?.[index], 'fluencyLevel') && (
                    <span className='text-sm text-slate-600 block truncate'>
                      {get(fields?.[index], 'fluencyLevel')} level
                    </span>
                  )}
                {titleField === 'jobTitle' &&
                  get(fields?.[index], 'companyName') && (
                    <span className='text-sm text-slate-600 block truncate'>
                      {get(fields?.[index], 'companyName')}
                    </span>
                  )}
              </div>
              <div className='flex items-center gap-2 flex-shrink-0'>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={(e) => handleRemove(index, e)}
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
                  {fieldsConfig?.map((config) => {
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
