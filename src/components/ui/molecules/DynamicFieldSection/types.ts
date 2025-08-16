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
  required?: boolean;
};

export type DynamicFieldSectionProps<T extends FieldValues> = {
  title: string;
  titleField?: keyof T[string extends keyof T ? keyof T : never];
  fields: { id: string }[];
  fieldsConfig: FieldConfig[];
  registerNamePrefix: string;
  errors: FieldErrors<T>;
  onRemove: (index: number) => void;
  register: UseFormRegister<T>;
  control: Control<T>;
};
