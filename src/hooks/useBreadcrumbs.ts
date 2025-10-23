import { useLocation, useParams } from 'react-router-dom';
import { Settings, Pencil, Share2, User, FileText, Eye } from 'lucide-react';

import type { BreadcrumbItem } from '@/components/ui';

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();
  const params = useParams();
  const pathname = location.pathname;

  // Dashboard - root level
  if (pathname === '/dashboard') {
    return [];
  }

  // Settings
  if (pathname === '/settings') {
    return [
      {
        label: 'breadcrumb.settings',
        icon: Settings,
      },
    ];
  }

  // Profile pages
  if (params.id) {
    const profileId = params.id;

    // Edit Profile
    if (pathname.includes('/edit')) {
      return [
        {
          label: 'breadcrumb.editProfile',
          icon: Pencil,
        },
      ];
    }

    // Share Profile
    if (pathname.includes('/share')) {
      return [
        {
          label: 'breadcrumb.shareProfile',
          icon: Share2,
        },
      ];
    }

    // View Profile
    if (pathname === `/profile/${profileId}`) {
      return [
        {
          label: 'breadcrumb.viewProfile',
          icon: Eye,
        },
      ];
    }
  }

  // Create Profile
  if (pathname === '/create-profile') {
    return [
      {
        label: 'breadcrumb.createProfile',
        icon: FileText,
      },
    ];
  }

  // Profile Created
  if (pathname === '/profile-created') {
    return [
      {
        label: 'breadcrumb.profileCreated',
        icon: User,
      },
    ];
  }

  // Default fallback
  return [];
};
