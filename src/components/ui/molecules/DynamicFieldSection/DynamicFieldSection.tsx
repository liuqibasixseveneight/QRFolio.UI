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
    <section className='space-y-4'>
      <h2 className='text-xl font-semibold text-neutral-800'>{title}</h2>

      {fields.map((field, index) => {
        const isActive = activeIndex === index;
        const displayTitle = get(fields[index], titleField as string, '') || (
          <em>Awaiting completion</em>
        );

        return (
          <div
            key={field?.id}
            className='border border-neutral-200 rounded-md shadow-sm'
          >
            <div
              className='p-3 bg-neutral-100 cursor-pointer flex justify-between items-center'
              onClick={() => toggleIndex(index)}
            >
              <span className='font-medium'>{displayTitle}</span>
              <Button
                type='button'
                variant='destructive'
                size='sm'
                onClick={(e) => handleRemove(index, e)}
              >
                Remove
              </Button>
            </div>

            {isActive && (
              <div className='p-4 space-y-4 bg-white'>
                {fieldsConfig?.map((config) => {
                  const error = get(
                    errors,
                    `${registerNamePrefix}.${index}.${config?.name}.message`
                  ) as string | undefined;

                  return (
                    <FormField
                      key={config?.name}
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
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <Button
        type='button'
        onClick={handleAppend}
        disabled={!isLastEntryComplete}
        className={cx(
          'bg-neutral-900 text-white px-4 py-2 rounded-md hover:bg-neutral-800 transition',
          !isLastEntryComplete && 'opacity-50 cursor-not-allowed'
        )}
      >
        {appendLabel}
      </Button>
    </section>
  );
};

export default DynamicFieldSection;
