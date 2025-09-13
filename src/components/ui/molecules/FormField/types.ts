import type { UseFormRegister, Control } from 'react-hook-form';
import type { ReactNode } from 'react';

export type FormFieldProps = {
  label?: string | ReactNode;
  type?: 'input' | 'textarea' | 'date' | 'select' | 'password' | 'phone';
  placeholder?: string | ReactNode;
  value?: string;
  onChange?: (val: string) => void;
  register?: UseFormRegister<any>;
  registerName?: string;
  control?: Control<any>;
  readOnly?: boolean;
  rows?: number;
  error?: string;
  options?: { label: string | ReactNode; value: string }[];
  required?: boolean;
  onPhoneChange?: (value: any) => void;
};
