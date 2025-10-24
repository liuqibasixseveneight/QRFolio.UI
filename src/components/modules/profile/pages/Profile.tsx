import { memo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowUp, User, Lock } from 'lucide-react';

import { useAuth } from '@/context';
import { useGetProfile } from '@/apollo/profile';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import { LoadingSpinner } from '@/components/ui';
import { ProfileEmptyState, ProfileSectionsContainer } from '@/components/ui';
import { checkProfileAccess } from '@/utils/profileAccess';

const Profile = memo(() => {
  const { userId } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    workExperience: true,
    education: true,
    languages: true,
    skills: true,
  });

  const profileId = id || userId || '';
  const isOwner = profileId === userId;

  const [data, { loading, error }] = useGetProfile(profileId);
  const profile = data?.profile;

  // Check if current user can view this profile
  const accessCheck = checkProfileAccess(profile, userId);

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
    return (
      <main className='min-h-screen w-full bg-white flex items-center justify-center p-8 text-center'>
        <div className='max-w-md mx-auto'>
          <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center'>
            <Lock className='w-10 h-10 text-gray-600' />
          </div>
          <h2 className='text-2xl sm:text-3xl font-light text-gray-900 mb-4'>
            Profile Not Available
          </h2>
          <p className='text-gray-600 text-base sm:text-lg leading-relaxed'>
            {accessCheck.reason ||
              'You do not have permission to view this profile.'}
          </p>
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
