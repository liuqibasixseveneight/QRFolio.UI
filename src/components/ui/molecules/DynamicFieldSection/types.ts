import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Control,
} from 'react-hook-form';

export type FieldConfig = {
  label: string;
  name: string;
  type?: 'input' | 'textarea' | 'date' | 'select';
  options?: { label: string; value: string }[];
  rows?: number;
};

export type DynamicFieldSectionProps<T extends FieldValues> = {
  title: string;
  fields: { id: string }[];
  fieldsConfig: FieldConfig[];
  registerNamePrefix: string;
  errors: FieldErrors<T>;
  onRemove: (index: number) => void;
  onAppend: () => void;
  appendLabel: string;
  register: UseFormRegister<T>;
  control?: Control<T>;
};
