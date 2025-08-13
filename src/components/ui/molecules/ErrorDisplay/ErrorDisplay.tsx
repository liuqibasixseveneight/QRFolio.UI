import type { ErrorDisplayProps } from './types';

const ErrorDisplay = ({ errors }: ErrorDisplayProps) => {
  if (!errors?.length) return null;

  return (
    <div
      className='bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg space-y-2 shadow-sm'
      aria-live='polite'
    >
      <p className='font-semibold text-red-900'>
        Please fix the following errors:
      </p>
      <ul className='list-disc list-inside text-sm space-y-1 text-red-700'>
        {errors?.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorDisplay;
