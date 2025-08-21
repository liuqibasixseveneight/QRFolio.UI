import { Loader2 } from 'lucide-react';
import type { LoadingSpinnerProps } from './types';

const LoadingSpinner = ({
  size = 12,
  variant = 'default',
}: LoadingSpinnerProps) => {
  const dimensionPx = size * 4;

  const variantStyles: Record<
    NonNullable<LoadingSpinnerProps['variant']>,
    string
  > = {
    default: 'text-slate-600',
    primary: 'text-slate-600',
    success: 'text-emerald-600',
    warning: 'text-amber-600',
    danger: 'text-red-600',
    purple: 'text-purple-600',
  };

  return (
    <div className='relative flex items-center justify-center'>
      {/* Main spinner with techzen aesthetic */}
      <Loader2
        size={size}
        className={`${variantStyles[variant]} animate-spin drop-shadow-lg`}
      />

      {/* Enhanced glow effect with techzen aesthetic */}
      <div
        className='absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-slate-200/30 to-transparent animate-pulse'
        style={{
          height: `${dimensionPx + 12}px`,
          width: `${dimensionPx + 12}px`,
        }}
      />

      {/* Enhanced outer ring with techzen aesthetic */}
      <div
        className='absolute inset-0 rounded-full border-2 border-slate-200/40 animate-ping'
        style={{
          height: `${dimensionPx + 20}px`,
          width: `${dimensionPx + 20}px`,
        }}
      />

      {/* Additional techzen ring effect */}
      <div
        className='absolute inset-0 rounded-full border border-slate-100/60 animate-pulse delay-1000'
        style={{
          height: `${dimensionPx + 28}px`,
          width: `${dimensionPx + 28}px`,
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
