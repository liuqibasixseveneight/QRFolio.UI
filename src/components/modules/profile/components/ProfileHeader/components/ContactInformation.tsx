import { Mail, Phone, Linkedin, Globe } from 'lucide-react';

import { ProfileHeaderBadge } from '@/components/ui';
import { formatPhoneDisplay } from '../utils';

interface ContactInformationProps {
  email?: string;
  phone?: any;
  linkedin?: string;
  portfolio?: string;
}

/**
 * Displays contact information as icon buttons with hover tooltips
 */
export const ContactInformation = ({
  email,
  phone,
  linkedin,
  portfolio,
}: ContactInformationProps) => {
  return (
    <div className='flex flex-wrap items-center gap-3 xs:gap-4 mb-8 xs:mb-10 sm:mb-12'>
      {email && (
        <ProfileHeaderBadge
          icon={Mail}
          label={email}
          type='email'
          href={email}
          className='w-10 h-10 xs:w-12 xs:h-12'
        />
      )}
      {phone && (
        <ProfileHeaderBadge
          icon={Phone}
          label={formatPhoneDisplay(phone)}
          type='phone'
          className='w-10 h-10 xs:w-12 xs:h-12'
        />
      )}
      {linkedin && (
        <ProfileHeaderBadge
          icon={Linkedin}
          label='LinkedIn'
          type='linkedin'
          href={linkedin}
          className='w-10 h-10 xs:w-12 xs:h-12'
        />
      )}
      {portfolio && (
        <ProfileHeaderBadge
          icon={Globe}
          label={portfolio}
          type='link'
          href={portfolio}
          className='w-10 h-10 xs:w-12 xs:h-12'
        />
      )}
    </div>
  );
};
