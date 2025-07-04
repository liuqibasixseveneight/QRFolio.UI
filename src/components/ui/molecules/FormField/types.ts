import type { UseFormRegister } from 'react-hook-form';

export type FormFieldProps = {
  label?: string;
  type?: 'input' | 'textarea' | 'date';
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  register?: UseFormRegister<any>;
  registerName?: string;
  readOnly?: boolean;
  rows?: number;
  error?: string;
};
