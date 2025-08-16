import { Loader2 } from 'lucide-react';

import type { LoadingSpinnerProps } from './types';

const LoadingSpinner = ({ size = 12 }: LoadingSpinnerProps) => {
  const dimensionPx = size * 4;

  return (
    <Loader2
      style={{ height: `${dimensionPx}px`, width: `${dimensionPx}px` }}
      className='text-indigo-600 animate-spin'
    />
  );
};

export default LoadingSpinner;
