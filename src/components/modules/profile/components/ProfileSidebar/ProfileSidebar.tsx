import { Mail, Phone, Linkedin, Globe } from 'lucide-react';
import { ContactItem } from '@/components/ui';
import type { ProfileSidebarProps } from './types';

const ProfileSidebar = ({
  email,
  phone,
  linkedin,
  portfolio,
}: ProfileSidebarProps) => (
  <aside className='w-full lg:w-1/4 px-6 sm:px-8 xl:px-12 2xl:px-20 py-10 border-t lg:border-t-0 lg:border-r border-gray-200 bg-white/70 backdrop-blur-md space-y-8 overflow-visible lg:overflow-auto flex-shrink-0'>
    <h2 className='text-xl font-semibold text-gray-800 tracking-tight'>
      Contact
    </h2>
    <div className='space-y-5'>
      {email && (
        <ContactItem
          icon={<Mail />}
          label='Email'
          value={email}
          href={`mailto:${email}`}
        />
      )}
      {phone && <ContactItem icon={<Phone />} label='Phone' value={phone} />}
      {linkedin && (
        <ContactItem
          icon={<Linkedin />}
          label='LinkedIn'
          value={linkedin}
          href={linkedin}
        />
      )}
      {portfolio && (
        <ContactItem
          icon={<Globe />}
          label='Portfolio'
          value={portfolio}
          href={portfolio}
        />
      )}
    </div>
  </aside>
);

export default ProfileSidebar;
