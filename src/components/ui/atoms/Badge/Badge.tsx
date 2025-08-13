import type { BadgeProps } from './types';

const Badge = ({ label, subLabel }: BadgeProps) => {
  return (
    <span className='bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-1 rounded-full select-none inline-flex items-center gap-1'>
      {label}
      {subLabel && (
        <span className='italic text-indigo-800 font-normal'>({subLabel})</span>
      )}
    </span>
  );
};

export default Badge;
