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
 * Displays contact information in a responsive grid layout
 */
export const ContactInformation = ({
  email,
  phone,
  linkedin,
  portfolio,
}: ContactInformationProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12'>
      {email && (
        <ProfileHeaderBadge
          icon={Mail}
          label={email}
          type='email'
          href={email}
        />
      )}
      {phone && (
        <ProfileHeaderBadge
          icon={Phone}
          label={formatPhoneDisplay(phone)}
          type='phone'
        />
      )}
      {linkedin && (
        <ProfileHeaderBadge
          icon={Linkedin}
          label='LinkedIn'
          type='linkedin'
          href={linkedin}
        />
      )}
      {portfolio && (
        <ProfileHeaderBadge
          icon={Globe}
          label={portfolio}
          type='link'
          href={portfolio}
        />
      )}
    </div>
  );
};
