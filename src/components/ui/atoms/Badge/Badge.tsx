import type { BadgeProps } from './types';

const Badge = ({ label, subLabel }: BadgeProps) => {
  return (
    <span className='group bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl select-none inline-flex items-center gap-2 border border-gray-300 hover:from-gray-200 hover:to-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-md hover:shadow-gray-500/20'>
      <span className='font-semibold'>{label}</span>
      {subLabel && (
        <span className='text-xs text-gray-600 font-normal bg-white/80 px-2 py-1 rounded-lg border border-gray-200'>
          {subLabel}
        </span>
      )}
    </span>
  );
};

export default Badge;
