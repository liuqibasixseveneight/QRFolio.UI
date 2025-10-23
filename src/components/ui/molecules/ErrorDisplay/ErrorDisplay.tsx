import { XCircle } from 'lucide-react';
import type { ErrorDisplayProps } from './types';

const ErrorDisplay = ({ errors, variant = 'default' }: ErrorDisplayProps) => {
  if (!errors?.length) return null;

  const variantStyles: Record<
    NonNullable<ErrorDisplayProps['variant']>,
    string
  > = {
    default: 'bg-red-50/80 border-red-200/50 text-red-800',
    destructive: 'bg-red-100/80 border-red-300/50 text-red-900',
    warning: 'bg-amber-50/80 border-amber-200/50 text-amber-800',
    info: 'bg-blue-50/80 border-blue-200/50 text-blue-800',
  };

  const iconStyles: Record<
    NonNullable<ErrorDisplayProps['variant']>,
    string
  > = {
    default: 'text-red-600',
    destructive: 'text-red-700',
    warning: 'text-amber-600',
    info: 'text-blue-600',
  };

  return (
    <div
      className={`bg-gradient-to-r ${variantStyles[variant]} backdrop-blur-sm border rounded-2xl p-6 space-y-4 shadow-lg`}
      aria-live='polite'
    >
      <div className='flex items-center gap-3'>
        <div
          className={`w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center shadow-sm`}
        >
          <XCircle className={`w-5 h-5 ${iconStyles[variant]}`} />
        </div>
        <div>
          <h3 className='font-bold text-lg leading-tight'>
            Please fix the following errors:
          </h3>
          <p className='text-sm opacity-80 mt-1'>
            Review and correct the issues below to continue
          </p>
        </div>
      </div>

      <ul className='space-y-2'>
        {errors?.map((error, index) => (
          <li
            key={index}
            className='flex items-start gap-2 text-sm font-medium'
          >
            <div
              className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${iconStyles[variant]}`}
            ></div>
            <span className='leading-relaxed'>{error}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorDisplay;
