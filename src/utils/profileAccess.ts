import type { AccessLevel, Profile } from '@/apollo/profile/types';

export type AccessCheckResult = {
  canView: boolean;
  reason?: string;
};

/**
 * Checks if a user can view a profile based on access level and ownership
 * @param profile - The profile to check access for
 * @param viewerId - The ID of the user trying to view the profile
 * @returns AccessCheckResult with canView boolean and optional reason
 */
export const checkProfileAccess = (
  profile: Profile | null | undefined,
  viewerId: string | null | undefined
): AccessCheckResult => {
  // If no profile exists, cannot view
  if (!profile) {
    return { canView: false, reason: 'Profile not found' };
  }

  // Owner can always view their own profile regardless of access level
  if (profile.id === viewerId) {
    return { canView: true };
  }

  // If no viewer ID (not logged in), check access level
  if (!viewerId) {
    switch (profile.accessLevel) {
      case 'public':
        return { canView: true };
      case 'private':
      case 'restricted':
        return { canView: false, reason: 'This profile is private' };
      default:
        return { canView: false, reason: 'Invalid access level' };
    }
  }

  // If viewer is logged in, check access level
  switch (profile.accessLevel) {
    case 'public':
      return { canView: true };
    case 'private':
      return { canView: false, reason: 'This profile is private' };
    case 'restricted':
      // For now, restricted means only owner can view
      // This could be extended to include specific user lists, etc.
      return { canView: false, reason: 'This profile is restricted' };
    default:
      return { canView: false, reason: 'Invalid access level' };
  }
};

/**
 * Gets the default access level for new profiles
 */
export const getDefaultAccessLevel = (): AccessLevel => 'public';

