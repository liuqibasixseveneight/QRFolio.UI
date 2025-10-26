import { memo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { ArrowUp, User, Lock } from 'lucide-react';

import { useAuth } from '@/context';
import { useGetProfile, useAddAccessRequest } from '@/apollo/profile';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import {
  Button,
  LoadingSpinner,
  useToast,
  Card,
  CardContent,
} from '@/components/ui';
import { ProfileEmptyState, ProfileSectionsContainer } from '@/components/ui';
import { checkProfileAccess } from '@/utils/profileAccess';

const Profile = memo(() => {
  const { userId } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    workExperience: true,
    education: true,
    languages: true,
    skills: true,
  });
  const [accessRequested, setAccessRequested] = useState(false);

  const profileId = id || userId || '';
  const isOwner = profileId === userId;

  const [data, { loading, error, refetch }] = useGetProfile(profileId);
  const [addAccessRequest, { loading: addingUser }] = useAddAccessRequest();
  const profile = data?.profile;

  // Check if current user can view this profile
  const accessCheck = checkProfileAccess(profile, userId);

  // Update accessRequested state when profile data changes
  useEffect(() => {
    if (profile?.accessRequests?.includes(userId || '')) {
      setAccessRequested(true);
    }
  }, [profile, userId]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleEditClick = () => {
    if (isOwner && profileId) {
      navigate(`/profile/${profileId}/edit`);
    }
  };

  const handleRequestAccess = async () => {
    if (!userId || !profile?.id) return;

    try {
      // Debug logging
      console.log('Requesting access:', {
        profileId: profile.id,
        requestingUserId: userId,
        currentAccessRequests: profile.accessRequests,
        currentPermittedUsers: profile.permittedUsers,
      });

      await addAccessRequest({
        profileId: profile.id,
        userId: userId,
        currentAccessRequests: profile.accessRequests || [],
      });

      setAccessRequested(true);

      toast({
        title: 'Access Request Sent ✓',
        description: 'The profile owner will be notified of your request.',
        variant: 'success',
      });

      // Refetch the profile data to get updated requests
      await refetch();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send access request. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (error) {
    return (
      <main className='min-h-screen w-full bg-white flex items-center justify-center p-8 text-center'>
        <div className='max-w-md mx-auto'>
          <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center'>
            <User className='w-10 h-10 text-red-600' />
          </div>
          <h2 className='text-2xl sm:text-3xl font-light text-gray-900 mb-4'>
            Error Loading Profile
          </h2>
          <p className='text-gray-600 text-base sm:text-lg leading-relaxed'>
            There was an error loading this profile. Please try again later.
          </p>
        </div>
      </main>
    );
  }

  // Check access permissions after profile is loaded
  if (!loading && profile && !accessCheck.canView) {
    const canRequestAccess =
      userId &&
      !isOwner &&
      (profile.accessLevel === 'private' ||
        profile.accessLevel === 'restricted') &&
      !profile.permittedUsers?.includes(userId) &&
      !profile.accessRequests?.includes(userId);

    const hasRequestedAccess =
      userId && profile.accessRequests?.includes(userId);

    // Check if user is approved but profile is private
    const isApprovedButPrivate =
      userId &&
      profile.permittedUsers?.includes(userId) &&
      profile.accessLevel === 'private';

    return (
      <main className='min-h-screen w-full bg-white flex items-center justify-center p-8 text-center'>
        <div className='max-w-md mx-auto'>
          <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center'>
            <Lock className='w-10 h-10 text-gray-600' />
          </div>
          <h2 className='text-2xl sm:text-3xl font-light text-gray-900 mb-4'>
            Profile Not Available
          </h2>
          <p className='text-gray-600 text-base sm:text-lg leading-relaxed mb-6'>
            {accessCheck.reason ||
              'You do not have permission to view this profile.'}
          </p>

          {/* Alert for approved users viewing private profiles */}
          {isApprovedButPrivate && (
            <Card className='mb-6 border-yellow-200 bg-yellow-50'>
              <CardContent className='pt-6 text-left'>
                <div className='flex gap-3'>
                  <div className='flex-shrink-0'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100'>
                      <svg
                        className='h-5 w-5 text-yellow-600'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                        />
                      </svg>
                    </div>
                  </div>
                  <div className='flex-1'>
                    <h4 className='text-sm font-semibold text-yellow-900'>
                      <FormattedMessage id='profile.accessAlerts.approvedPrivateTitle' />
                    </h4>
                    <p className='mt-2 text-sm text-yellow-800 leading-relaxed'>
                      <FormattedMessage id='profile.accessAlerts.approvedPrivateMessage' />
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {hasRequestedAccess && (
            <Card className='mb-6 border-blue-200 bg-blue-50'>
              <CardContent className='pt-6 text-left'>
                <div className='flex gap-3'>
                  <div className='flex-shrink-0'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100'>
                      <svg
                        className='h-5 w-5 text-blue-600'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                    </div>
                  </div>
                  <div className='flex-1'>
                    <h4 className='text-sm font-semibold text-blue-900'>
                      Pending Access Request
                    </h4>
                    <p className='mt-2 text-sm text-blue-800 leading-relaxed'>
                      You have already requested access to view this profile.
                      Your request is pending approval from the profile owner.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {canRequestAccess && !hasRequestedAccess && (
            <div className='flex flex-col gap-4 items-center'>
              {accessRequested ? (
                <div className='text-blue-600 font-medium'>
                  Access request sent! Waiting for approval...
                </div>
              ) : (
                <Button
                  onClick={handleRequestAccess}
                  disabled={addingUser}
                  className='cursor-pointer'
                >
                  {addingUser ? 'Requesting...' : 'Request Access'}
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    );
  }

  if (!loading && !profile) {
    return (
      <main className='min-h-screen w-full bg-white flex items-center justify-center p-8 text-center'>
        <div className='max-w-md mx-auto'>
          <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center'>
            <User className='w-10 h-10 text-gray-600' />
          </div>
          <h2 className='text-2xl sm:text-3xl font-light text-gray-900 mb-4'>
            Profile Not Found
          </h2>
          <p className='text-gray-600 text-base sm:text-lg leading-relaxed'>
            The profile you're looking for doesn't exist or has been deleted.
          </p>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className='min-h-screen w-full bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 mx-auto mb-6'>
            <LoadingSpinner />
          </div>
          <p className='text-gray-600 text-sm font-medium'>
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  const {
    fullName,
    professionalSummary,
    email,
    phone,
    linkedin,
    portfolio,
    availability,
    accessLevel,
    workExperience = [],
    education = [],
    languages = [],
    skills = [],
    updatedAt,
    // Privacy settings
    showName,
    showEmail,
    showPhone,
    showLinkedIn,
    showPortfolio,
    showWorkExperience,
    showEducation,
    showLanguages,
    showSkills,
  } = profile || {};

  const hasContent =
    (workExperience && workExperience.length > 0) ||
    (education && education.length > 0) ||
    (languages && languages.length > 0) ||
    (skills && skills.length > 0);

  const allSectionsCollapsed =
    !expandedSections.workExperience &&
    !expandedSections.education &&
    !expandedSections.languages &&
    !expandedSections.skills;

  return (
    <main
      data-profile-page
      className={`${
        allSectionsCollapsed ? '' : 'min-h-screen'
      } w-full bg-gray-50 text-gray-900 font-sans relative overflow-hidden`}
    >
      <div>
        <ProfileHeader
          fullName={fullName || ''}
          summary={professionalSummary || ''}
          email={email || ''}
          phone={phone}
          linkedin={linkedin || ''}
          portfolio={portfolio || ''}
          availability={availability}
          accessLevel={accessLevel}
          workExperience={workExperience || []}
          education={education || []}
          languages={languages || []}
          skills={skills || []}
          updatedAt={updatedAt}
          isOwner={isOwner}
          onEditClick={handleEditClick}
          showName={showName}
          showEmail={showEmail}
          showPhone={showPhone}
          showLinkedIn={showLinkedIn}
          showPortfolio={showPortfolio}
          showWorkExperience={showWorkExperience}
          showEducation={showEducation}
          showLanguages={showLanguages}
          showSkills={showSkills}
        />

        {hasContent ? (
          <ProfileSectionsContainer
            workExperience={workExperience || []}
            education={education || []}
            languages={languages || []}
            skills={skills || []}
            expandedSections={expandedSections}
            onToggleSection={toggleSection}
            showWorkExperience={showWorkExperience}
            showEducation={showEducation}
            showLanguages={showLanguages}
            showSkills={showSkills}
          />
        ) : (
          <ProfileEmptyState />
        )}
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 z-50 w-16 h-16 bg-white text-gray-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
        >
          <ArrowUp className='w-8 h-8 mx-auto' />
        </button>
      )}
    </main>
  );
});

Profile.displayName = 'Profile';

export default Profile;
