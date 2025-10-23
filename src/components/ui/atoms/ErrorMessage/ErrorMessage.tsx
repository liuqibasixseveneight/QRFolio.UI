import { AlertCircle } from 'lucide-react';
import type { ErrorMessageProps } from './types';

const ErrorMessage = ({ message, variant = 'default' }: ErrorMessageProps) => {
  const variantStyles: Record<
    NonNullable<ErrorMessageProps['variant']>,
    string
  > = {
    default:
      'bg-gradient-to-r from-red-50/90 via-red-100/80 to-red-50/90 border-red-200/60 text-red-800',
    destructive:
      'bg-gradient-to-r from-red-100/90 via-red-200/80 to-red-100/90 border-red-300/60 text-red-900',
    warning:
      'bg-gradient-to-r from-amber-50/90 via-amber-100/80 to-amber-50/90 border-amber-200/60 text-amber-800',
    info: 'bg-gradient-to-r from-blue-50/90 via-blue-100/80 to-blue-50/90 border-blue-200/60 text-blue-800',
  };

  const iconStyles: Record<
    NonNullable<ErrorMessageProps['variant']>,
    string
  > = {
    default: 'text-red-600',
    destructive: 'text-red-700',
    warning: 'text-amber-600',
    info: 'text-blue-600',
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-sm shadow-lg ${variantStyles[variant]}`}
    >
      <AlertCircle className={`w-5 h-5 flex-shrink-0 ${iconStyles[variant]}`} />
      <p className='text-sm font-medium leading-relaxed'>{message}</p>
    </div>
  );
};

export default ErrorMessage;
