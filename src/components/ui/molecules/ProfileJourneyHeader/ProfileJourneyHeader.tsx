import type { ProfileJourneyHeaderProps } from './types';

const ProfileJourneyHeader = ({
  className = '',
  isCollapsedMode = false,
}: ProfileJourneyHeaderProps) => {
  const containerClasses = isCollapsedMode
    ? 'bg-white rounded-t-2xl shadow-sm border border-gray-100 px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-12 sm:py-16'
    : 'px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-12 sm:py-16 border-b border-gray-100';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className='text-center'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 sm:mb-6 leading-tight'>
          Professional Journey
        </h2>
        <p className='text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-4 sm:px-0'>
          A curated collection of my professional achievements, experiences, and
          educational milestones.
        </p>
      </div>
    </div>
  );
};

export default ProfileJourneyHeader;
