import type { ReactNode } from 'react';

export type DatePickerProps = {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string | ReactNode;
  disabled?: boolean;
};
