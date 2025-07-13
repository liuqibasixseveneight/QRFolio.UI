import type { FieldValues } from 'react-hook-form';
// @ts-expect-error lodash import error
import get from 'lodash/get';

import { Button } from '../../atoms';
import { FormField } from '../FormField';
import type { DynamicFieldSectionProps } from './types';

const DynamicFieldSection = <T extends FieldValues>({
  title,
  fields,
  fieldsConfig,
  registerNamePrefix,
  errors,
  onRemove,
  onAppend,
  appendLabel,
  register,
  control,
}: DynamicFieldSectionProps<T> & { control?: any }) => {
  return (
    <section className='space-y-4'>
      <h2 className='text-xl font-semibold text-neutral-800'>{title}</h2>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className='p-4 rounded-md bg-white border border-neutral-200 shadow-sm space-y-4'
        >
          {fieldsConfig.map((config) => {
            const error = get(
              errors,
              `${registerNamePrefix}.${index}.${config.name}.message`
            ) as string | undefined;

            return (
              <FormField
                key={config.name}
                label={config.label}
                type={config.type}
                rows={config.rows}
                options={config.options}
                register={register}
                registerName={`${registerNamePrefix}.${index}.${config.name}`}
                error={error}
                control={control}
              />
            );
          })}

          <div className='flex justify-end'>
            <Button
              type='button'
              variant='destructive'
              onClick={() => onRemove(index)}
              className='text-sm'
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <Button
        type='button'
        onClick={onAppend}
        className='bg-neutral-900 text-white px-4 py-2 rounded-md hover:bg-neutral-800 transition'
      >
        {appendLabel}
      </Button>
    </section>
  );
};

export default DynamicFieldSection;
