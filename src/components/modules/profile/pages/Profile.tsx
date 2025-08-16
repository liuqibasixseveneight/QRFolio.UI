import { useAuth } from '@/context';
import { useGetProfile } from '@/apollo/profile';
import { useState, useEffect } from 'react';
import {
  ArrowUp,
  Sparkles,
  Briefcase,
  GraduationCap,
  Languages,
  User,
} from 'lucide-react';
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
      <main className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-8 text-center'>
        <div className='max-w-md mx-auto'>
          <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-lg'>
            <User className='w-10 h-10 text-blue-600' />
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
    updatedAt,
  } = profile;

  return (
    <main className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900 font-sans relative'>
      {/* Simplified background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 rounded-full blur-3xl'></div>
      </div>

      {loading ? (
        <main className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center'>
          <div className='text-center'>
            <LoadingSpinner />
            <p className='mt-4 text-gray-600 text-lg'>Loading profile...</p>
          </div>
        </main>
      ) : (
        <>
          <ProfileHeader
            fullName={fullName}
            summary={professionalSummary}
            email={email}
            phone={phone}
            linkedin={linkedin}
            portfolio={portfolio}
            workExperience={workExperience}
            education={education}
            languages={languages}
            updatedAt={updatedAt}
          />

          <div className='flex flex-col xl:flex-row flex-1 overflow-visible xl:overflow-hidden w-full relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12'>
            {/* Sidebar - Made bigger */}
            <div className='xl:w-96 xl:flex-shrink-0'>
              <ProfileSidebar
                {...{ email, phone, linkedin, portfolio, availability }}
              />
            </div>

            {/* Main Content Area */}
            <div className='flex-1 xl:ml-8 py-8 lg:py-12'>
              <div className='space-y-8 lg:space-y-12'>
                {/* Work Experience Section */}
                {workExperience && workExperience.length > 0 && (
                  <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300'>
                    <div className='flex items-center gap-3 mb-6'>
                      <div className='w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md'>
                        <Briefcase className='w-6 h-6 text-white' />
                      </div>
                      <h2 className='text-2xl font-bold text-gray-900'>
                        Work Experience
                      </h2>
                    </div>
                    <ExperienceSection workExperience={workExperience} />
                  </div>
                )}

                {/* Education Section */}
                {education && education.length > 0 && (
                  <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300'>
                    <div className='flex items-center gap-3 mb-6'>
                      <div className='w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-md'>
                        <GraduationCap className='w-6 h-6 text-white' />
                      </div>
                      <h2 className='text-2xl font-bold text-gray-900'>
                        Education
                      </h2>
                    </div>
                    <EducationSection education={education} />
                  </div>
                )}

                {/* Languages Section */}
                {languages && languages.length > 0 && (
                  <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300'>
                    <div className='flex items-center gap-3 mb-6'>
                      <div className='w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-md'>
                        <Languages className='w-6 h-6 text-white' />
                      </div>
                      <h2 className='text-2xl font-bold text-gray-900'>
                        Languages
                      </h2>
                    </div>
                    <LanguageSection languages={languages} />
                  </div>
                )}

                {/* Empty State */}
                {(!workExperience || workExperience.length === 0) &&
                  (!education || education.length === 0) &&
                  (!languages || languages.length === 0) && (
                    <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-16 text-center border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300'>
                      <div className='w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-lg'>
                        <Sparkles className='w-12 h-12 text-blue-600' />
                      </div>
                      <h3 className='text-3xl font-bold text-gray-900 mb-4'>
                        Ready to Build Your Profile
                      </h3>
                      <p className='text-gray-600 text-xl leading-relaxed max-w-lg mx-auto'>
                        Add your work experience, education, and language skills
                        to create a compelling digital resume.
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
          className='fixed bottom-8 right-8 z-50 w-14 h-14 bg-white/90 backdrop-blur-sm text-blue-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border border-white/60 hover:border-blue-200/60 hover:bg-white cursor-pointer'
        >
          <ArrowUp className='w-7 h-7 mx-auto' />
        </button>
      )}
    </main>
  );
};

export default Profile;
