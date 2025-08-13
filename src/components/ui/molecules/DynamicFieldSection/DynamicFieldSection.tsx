import type { FieldValues, Path } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
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

  const handleRemove = (index: number, e: React.MouseEvent) => {
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
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-semibold text-gray-800 tracking-tight'>
          {title}
        </h3>
        <Button
          type='button'
          onClick={handleAppend}
          disabled={!isLastEntryComplete}
          className={cx(
            'bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm',
            !isLastEntryComplete &&
              'opacity-50 cursor-not-allowed hover:bg-gray-900'
          )}
        >
          {appendLabel}
        </Button>
      </div>

      {fields?.length === 0 && (
        <div className='text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200'>
          <p className='text-sm'>No {title.toLowerCase()} added yet.</p>
          <p className='text-xs mt-1'>Click the button above to get started.</p>
        </div>
      )}

      {fields?.map((field, index) => {
        const isActive = activeIndex === index;

        // Generate a meaningful display title based on the section type and available data
        let displayTitle: string | React.ReactNode;

        if (titleField) {
          const titleValue = get(fields?.[index], titleField as string, '');
          if (titleValue && titleValue.trim() !== '') {
            displayTitle = titleValue;
          } else {
            // Show section-specific fallback text
            if (titleField === 'schoolName') {
              displayTitle = (
                <em className='text-gray-500 italic'>New Education Entry</em>
              );
            } else if (titleField === 'language') {
              displayTitle = (
                <em className='text-gray-500 italic'>New Language Entry</em>
              );
            } else if (titleField === 'jobTitle') {
              displayTitle = (
                <em className='text-gray-500 italic'>New Work Entry</em>
              );
            } else {
              displayTitle = (
                <em className='text-gray-500 italic'>New Entry</em>
              );
            }
          }
        } else {
          // No titleField specified, show generic fallback
          displayTitle = <em className='text-gray-500 italic'>New Entry</em>;
        }

        return (
          <div
            key={field?.id}
            className='border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden transition-all duration-200 hover:shadow-md'
          >
            <div
              className='p-4 bg-gray-50 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-100 transition-colors duration-200'
              onClick={() => toggleIndex(index)}
            >
              <div className='flex-1 min-w-0'>
                <span className='font-medium text-gray-900 block truncate'>
                  {displayTitle}
                </span>
                {/* Show additional context for different section types */}
                {titleField === 'schoolName' &&
                  get(fields?.[index], 'degree') && (
                    <span className='text-sm text-gray-600 block truncate'>
                      {get(fields?.[index], 'degree')}
                      {get(fields?.[index], 'fieldOfStudy') &&
                        ` - ${get(fields?.[index], 'fieldOfStudy')}`}
                    </span>
                  )}
                {titleField === 'language' &&
                  get(fields?.[index], 'fluencyLevel') && (
                    <span className='text-sm text-gray-600 block truncate'>
                      {get(fields?.[index], 'fluencyLevel')} level
                    </span>
                  )}
                {titleField === 'jobTitle' &&
                  get(fields?.[index], 'companyName') && (
                    <span className='text-sm text-gray-600 block truncate'>
                      {get(fields?.[index], 'companyName')}
                    </span>
                  )}
              </div>
              <div className='flex items-center gap-2 flex-shrink-0'>
                <Button
                  type='button'
                  variant='destructive'
                  size='sm'
                  onClick={(e) => handleRemove(index, e)}
                  className='px-3 py-1.5 text-xs font-medium'
                >
                  Remove
                </Button>
              </div>
            </div>

            {isActive && (
              <div className='p-6 space-y-6 bg-white border-t border-gray-100'>
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
