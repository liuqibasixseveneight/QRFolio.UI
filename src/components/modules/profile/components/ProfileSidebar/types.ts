import type { Availability, Phone } from '@/apollo/profile/types';

export type ProfileSidebarProps = {
  email?: string;
  phone?: Phone;
  linkedin?: string;
  portfolio?: string;
  availability?: Availability;
};
