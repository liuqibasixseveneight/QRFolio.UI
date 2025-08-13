import { useAuth } from '@/context';
import { useGetProfile } from '@/apollo/profile';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import {
  EducationSection,
  ExperienceSection,
  LanguageSection,
  ProfileSidebar,
} from '../components';
import { LoadingSpinner } from '@/components/ui';

const Profile = () => {
  const { userId } = useAuth();

  // @ts-ignore
  const [data, { loading, error }] = useGetProfile(userId || '');
  const profile = data?.profile;

  if (!profile) {
    return (
      <main className='flex items-center justify-center min-h-screen w-full bg-neutral-50 p-8 text-center'>
        <p className='text-neutral-500 text-lg font-light'>
          Profile not found or deleted.
        </p>
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
    workExperience = [],
    education = [],
    languages = [],
  } = profile;

  return (
    <main className='min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-900 font-sans flex flex-col'>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ProfileHeader fullName={fullName} summary={professionalSummary} />

          <div className='flex flex-col lg:flex-row flex-1 overflow-visible lg:overflow-hidden'>
            <ProfileSidebar {...{ email, phone, linkedin, portfolio }} />

            <section className='flex-1 px-6 sm:px-8 xl:px-12 2xl:px-20 py-10 space-y-8 overflow-visible lg:overflow-auto min-h-0'>
              <h2 className='text-xl font-semibold text-gray-800 tracking-tight'>
                About Me
              </h2>
              <ExperienceSection workExperience={workExperience} />
              <EducationSection education={education} />
              <LanguageSection languages={languages} />
            </section>
          </div>
        </>
      )}
    </main>
  );
};

export default Profile;
