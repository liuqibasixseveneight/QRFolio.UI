import type { ProfileHeaderBadgeProps } from './types';

const ProfileHeaderBadge = ({
  icon: Icon,
  label,
  href,
  className = '',
}: ProfileHeaderBadgeProps) => {
  const badgeContent = (
    <div
      className={`flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100 min-w-0 ${className}`}
    >
      <Icon className='w-5 h-5 text-gray-500 flex-shrink-0' />
      <span className='text-sm text-gray-700 truncate'>{label}</span>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='block transition-opacity hover:opacity-80 cursor-pointer'
      >
        {badgeContent}
      </a>
    );
  }

  return badgeContent;
};

export default ProfileHeaderBadge;
