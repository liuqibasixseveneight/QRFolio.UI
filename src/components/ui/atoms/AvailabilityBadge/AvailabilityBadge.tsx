import type { AvailabilityBadgeProps } from './types';

const AvailabilityBadge = ({
  availability,
  className = '',
}: AvailabilityBadgeProps) => {
  // Helper function to get availability configuration
  const getAvailabilityConfig = (status?: string) => {
    switch (status) {
      case 'available':
        return {
          text: 'Actively looking',
          dotColor: 'bg-green-500',
        };
      case 'open':
        return {
          text: 'Casually looking',
          dotColor: 'bg-blue-500',
        };
      case 'unavailable':
        return {
          text: 'Not looking',
          dotColor: 'bg-gray-500',
        };
      default:
        return {
          text: 'Actively looking',
          dotColor: 'bg-green-500',
        };
    }
  };

  const availabilityConfig = getAvailabilityConfig(availability);

  return (
    <div
      className={`inline-flex items-center gap-3 px-6 py-3 bg-gray-100 border border-gray-200 rounded-full text-gray-700 text-sm font-medium ${className}`}
    >
      <div className={`w-3 h-3 ${availabilityConfig.dotColor} rounded-full`} />
      <span className='tracking-wide'>{availabilityConfig.text}</span>
    </div>
  );
};

export default AvailabilityBadge;
