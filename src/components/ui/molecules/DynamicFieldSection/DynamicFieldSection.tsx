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
    <section className='space-y-6'>
      <h2 className='text-2xl font-semibold text-indigo-700'>{title}</h2>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className='p-6 rounded-2xl bg-white/70 border border-indigo-100 shadow space-y-4'
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
                control={control} // <-- pass control to FormField
              />
            );
          })}
          <Button
            type='button'
            variant='destructive'
            onClick={() => onRemove(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button type='button' onClick={onAppend}>
        {appendLabel}
      </Button>
    </section>
  );
};

export default DynamicFieldSection;
