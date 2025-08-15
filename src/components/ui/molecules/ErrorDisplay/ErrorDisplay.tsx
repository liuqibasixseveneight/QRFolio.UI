import type { ErrorDisplayProps } from './types';

const ErrorDisplay = ({ errors }: ErrorDisplayProps) => {
  if (!errors?.length) return null;

  return (
    <div
      className='bg-red-50/90 backdrop-blur-sm border border-red-200/50 text-red-800 p-6 rounded-2xl space-y-3 shadow-lg'
      aria-live='polite'
    >
      <p className='font-bold text-red-900 text-lg'>
        Please fix the following errors:
      </p>
      <ul className='list-disc list-inside text-sm space-y-2 text-red-700'>
        {errors?.map((error, index) => (
          <li key={index} className='font-medium'>
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorDisplay;
