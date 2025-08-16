import type { ErrorDisplayProps } from './types';

const ErrorDisplay = ({ errors }: ErrorDisplayProps) => {
  if (!errors?.length) return null;

  return (
    <div
      className='bg-red-50/60 backdrop-blur-sm border border-red-200/30 text-red-800 p-6 rounded-xl space-y-3'
      aria-live='polite'
    >
      <p className='font-bold text-red-900 text-lg sm:text-xl'>
        Please fix the following errors:
      </p>
      <ul className='list-disc list-inside text-sm sm:text-base space-y-2 text-red-700'>
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
