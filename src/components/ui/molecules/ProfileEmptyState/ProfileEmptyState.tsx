import { Sparkles } from 'lucide-react';

import type { ProfileEmptyStateProps } from './types';

const ProfileEmptyState = ({ className = '' }: ProfileEmptyStateProps) => {
  return (
    <div
      className={`relative z-10 px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-12 sm:py-16 lg:py-20 ${className}`}
    >
      <div className='max-w-6xl mx-auto w-full text-center'>
        <div className='w-28 h-28 mx-auto mb-10 rounded-full bg-gray-100 flex items-center justify-center'>
          <Sparkles className='w-14 h-14 text-gray-400' />
        </div>
        <h3 className='text-2xl sm:text-3xl font-light text-gray-900 mb-6'>
          Ready to build your profile
        </h3>
        <p className='text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed'>
          Add your work experience, education, and language skills to create a
          compelling digital resume.
        </p>
      </div>
    </div>
  );
};

export default ProfileEmptyState;
