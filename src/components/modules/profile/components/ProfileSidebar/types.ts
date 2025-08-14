import type { Availability } from '@/apollo/profile/types';

export type ProfileSidebarProps = {
  email?: string;
  phone?:
    | string
    | {
        countryCode: string;
        dialCode: string;
        number: string;
        flag: string;
      };
  linkedin?: string;
  portfolio?: string;
  availability?: Availability;
};
