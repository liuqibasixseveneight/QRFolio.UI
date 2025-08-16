import type { UseFormRegister, Control } from 'react-hook-form';

export type FormFieldProps = {
  label?: string;
  type?: 'input' | 'textarea' | 'date' | 'select' | 'password' | 'phone';
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  register?: UseFormRegister<any>;
  registerName?: string;
  control?: Control<any>;
  readOnly?: boolean;
  rows?: number;
  error?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  onPhoneChange?: (value: any) => void;
};
