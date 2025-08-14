import { useAuth } from '@/context';
import { useGetProfile } from '@/apollo/profile';
import { useState, useEffect } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
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
  const [showScrollTop, setShowScrollTop] = useState(false);

  // @ts-ignore
  const [data, { loading, error }] = useGetProfile(userId || '');
  const profile = data?.profile;

  // Handle scroll to top functionality
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

  if (!profile) {
    return (
      <main className='flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-8 text-center'>
        <div className='max-w-md mx-auto'>
          <div className='w-16 h-16 mx-auto mb-6 rounded-full bg-indigo-100 flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-indigo-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-gray-900 mb-3'>
            Profile Not Found
          </h2>
          <p className='text-gray-600 text-lg leading-relaxed'>
            The profile you're looking for doesn't exist or has been deleted.
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
  } = profile;

  return (
    <main className='min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-900 font-sans relative'>
      {/* Subtle background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-50/40 rounded-full blur-3xl'></div>
      </div>

      {loading ? (
        <div className='flex items-center justify-center min-h-screen'>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <ProfileHeader fullName={fullName} summary={professionalSummary} />

          <div className='flex flex-col xl:flex-row flex-1 overflow-visible xl:overflow-hidden max-w-7xl mx-auto relative z-10'>
            {/* Sidebar - Sticky on larger screens */}
            <div className='xl:w-80 xl:flex-shrink-0'>
              <ProfileSidebar
                {...{ email, phone, linkedin, portfolio, availability }}
              />
            </div>

            {/* Main Content */}
            <section className='flex-1 px-4 sm:px-6 lg:px-8 xl:px-12 py-8 xl:py-12 space-y-8 overflow-visible xl:overflow-auto min-h-0'>
              {/* About Me Section */}
              <div className='space-y-6'>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-8 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full'></div>
                  <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight'>
                    About Me
                  </h2>
                  <Sparkles className='w-6 h-6 text-indigo-500' />
                </div>

                {professionalSummary && (
                  <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300'>
                    <p className='text-gray-700 leading-relaxed text-base sm:text-lg'>
                      {professionalSummary}
                    </p>
                  </div>
                )}
              </div>

              {/* Experience Sections */}
              <div className='space-y-8'>
                <ExperienceSection workExperience={workExperience} />
                <EducationSection education={education} />
                <LanguageSection languages={languages} />
              </div>
            </section>
          </div>
        </>
      )}

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 active:scale-95 border border-white/20 cursor-pointer'
          aria-label='Scroll to top'
        >
          <ArrowUp className='w-6 h-6 text-white mx-auto' />
        </button>
      )}
    </main>
  );
};

export default Profile;
