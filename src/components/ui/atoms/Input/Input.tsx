import { useState } from 'react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({ className, type, ...props }: ComponentProps<'input'>) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const EyeIcon = showPassword ? Eye : EyeOff;

  return (
    <div className='relative'>
      <input
        type={inputType}
        data-slot='input'
        className={cn(
          'flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-gray-300',
          className
        )}
        {...props}
      />
      {isPassword && (
        <button
          type='button'
          onClick={() => setShowPassword((prev) => !prev)}
          className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 transition-colors duration-300'
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          <EyeIcon className='h-4 w-4' />
        </button>
      )}
    </div>
  );
};

export default Input;
