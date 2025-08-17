import { Link } from 'react-router-dom';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { ProfileHeaderBadgeProps } from './types';

const ProfileHeaderBadge = ({
  icon: Icon,
  label,
  type,
  href,
  className = '',
}: ProfileHeaderBadgeProps) => {
  const badgeContent = (
    <div
      className={`flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100 min-w-0 ${className}`}
    >
      <Icon className='w-5 h-5 text-gray-500 flex-shrink-0' />
      <Tooltip>
        <TooltipTrigger asChild>
          <span className='text-sm text-gray-700 truncate cursor-help'>
            {label}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );

  // Handle different types
  switch (type) {
    case 'email':
      // Email: open email application
      return (
        <Link
          to={`mailto:${href || label}`}
          className='block transition-opacity hover:opacity-80 cursor-pointer'
        >
          {badgeContent}
        </Link>
      );

    case 'phone':
      // Phone: no click action, just display
      return badgeContent;

    case 'linkedin':
      // LinkedIn: format URL and open in new tab
      let linkedinUsername = href || label;

      // Remove leading slash if present
      linkedinUsername = linkedinUsername.replace(/^\//, '');

      // Extract username from full LinkedIn URL if present
      const linkedinMatch = linkedinUsername.match(
        /linkedin\.com\/in\/([^\/\?]+)/i
      );
      if (linkedinMatch) {
        linkedinUsername = linkedinMatch[1];
      }

      const linkedinUrl = `https://www.linkedin.com/in/${linkedinUsername}`;

      return (
        <Link
          to={linkedinUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='block transition-opacity hover:opacity-80 cursor-pointer'
        >
          {badgeContent}
        </Link>
      );

    case 'link':
      // External links: open in new tab
      return (
        <Link
          to={href || label}
          target='_blank'
          rel='noopener noreferrer'
          className='block transition-opacity hover:opacity-80 cursor-pointer'
        >
          {badgeContent}
        </Link>
      );

    default:
      return badgeContent;
  }
};

export default ProfileHeaderBadge;
