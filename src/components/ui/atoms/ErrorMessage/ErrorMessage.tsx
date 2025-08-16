import type { ErrorMessageProps } from './types';

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className='text-sm sm:text-base text-red-600 font-semibold'>{message}</p>
  );
};

export default ErrorMessage;
