import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Control,
} from 'react-hook-form';
import type { ReactNode } from 'react';

export type FieldConfig = {
  label: string;
  name: string;
  type?: 'input' | 'textarea' | 'date' | 'select' | 'richText';
  options?: { label: string; value: string }[];
  rows?: number;
  required?: boolean;
  hasCurrentCheckbox?: boolean;
  currentCheckboxLabel?: string;
};

export type DynamicFieldSectionProps<T extends FieldValues> = {
  title: string | ReactNode;
  titleField?: keyof T[string extends keyof T ? keyof T : never];
  fields: { id: string }[];
  fieldsConfig: FieldConfig[];
  registerNamePrefix: string;
  errors: FieldErrors<T>;
  onRemove: (index: number) => void;
  register: UseFormRegister<T>;
  control: Control<T>;
};
