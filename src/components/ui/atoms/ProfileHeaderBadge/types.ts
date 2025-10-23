import type { LucideIcon } from 'lucide-react';

export type ProfileHeaderBadgeType = 'email' | 'phone' | 'link' | 'linkedin';

export type ProfileHeaderBadgeProps = {
  icon: LucideIcon;
  label: string;
  type: ProfileHeaderBadgeType;
  href?: string;
  className?: string;
};
