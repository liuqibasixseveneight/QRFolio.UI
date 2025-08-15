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
      <main className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-8 text-center'>
        <div className='max-w-md mx-auto'>
          <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center shadow-lg'>
            <svg
              className='w-10 h-10 text-indigo-600'
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
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
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
    <main className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-gray-900 font-sans'>
      {/* Subtle background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/10 to-purple-100/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl'></div>
      </div>

      {loading ? (
        <main className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center'>
          <div className='text-center'>
            <LoadingSpinner />
            <p className='mt-4 text-gray-600 text-lg'>Loading profile...</p>
          </div>
        </main>
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

            {/* Main Content Area */}
            <div className='flex-1 xl:ml-0 px-4 sm:px-6 lg:px-8 xl:px-12 py-6 lg:py-8'>
              <div className='space-y-6'>
                {/* Work Experience Section */}
                {workExperience && workExperience.length > 0 && (
                  <div className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-6 lg:p-8'>
                    <ExperienceSection workExperience={workExperience} />
                  </div>
                )}

                {/* Education Section */}
                {education && education.length > 0 && (
                  <div className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-6 lg:p-8'>
                    <EducationSection education={education} />
                  </div>
                )}

                {/* Languages Section */}
                {languages && languages.length > 0 && (
                  <div className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-6 lg:p-8'>
                    <LanguageSection languages={languages} />
                  </div>
                )}

                {/* Empty State */}
                {(!workExperience || workExperience.length === 0) &&
                  (!education || education.length === 0) &&
                  (!languages || languages.length === 0) && (
                    <div className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-12 text-center'>
                      <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center shadow-lg'>
                        <Sparkles className='w-10 h-10 text-indigo-600' />
                      </div>
                      <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                        No Content Yet
                      </h3>
                      <p className='text-gray-600 text-lg leading-relaxed max-w-md mx-auto'>
                        This profile doesn't have any work experience,
                        education, or language information yet.
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]'
        >
          <ArrowUp className='w-6 h-6 mx-auto' />
        </button>
      )}
    </main>
  );
};

export default Profile;
