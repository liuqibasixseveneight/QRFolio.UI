import { ArrowRight, Sparkles, Share2, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Button, LoadingSpinner } from '@/components/ui';
import { useAuth } from '@/context';
import { useGetProfile } from '@/apollo/profile';

const features = [
  {
    titleKey: 'landing.features.intelligentDesign.title',
    descriptionKey: 'landing.features.intelligentDesign.description',
    icon: Wand2,
  },
  {
    titleKey: 'landing.features.seamlessSharing.title',
    descriptionKey: 'landing.features.seamlessSharing.description',
    icon: Share2,
  },
  {
    titleKey: 'landing.features.modernWorkflow.title',
    descriptionKey: 'landing.features.modernWorkflow.description',
    icon: Sparkles,
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const { userId, session, loading: authLoading } = useAuth();

  const [profileData, { loading: profileLoading }] = useGetProfile(
    userId || ''
  );
  const profile = profileData?.profile;

  const isLoading = authLoading || (session && profileLoading);
  const isAuthenticated = !!session;
  const hasProfile = !!profile;

  const shouldShowGetStarted = !(isAuthenticated && hasProfile);
  const shouldShowReadySection = !(isAuthenticated && hasProfile);

  if (isLoading) {
    return (
      <main className='min-h-screen w-full bg-gray-50 text-gray-900 font-sans relative overflow-hidden flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 mx-auto mb-6'>
            <LoadingSpinner />
          </div>
          <p className='text-gray-600 text-sm font-medium'>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className='min-h-screen w-full bg-gray-50 text-gray-900 font-sans relative overflow-hidden'>
        <div className='w-full bg-white border-b border-gray-100 shadow-sm'>
          <div className='w-full px-6 sm:px-8 lg:px-12'>
            <div className='max-w-6xl mx-auto w-full'>
              <div className='px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32'>
                <div className='text-center'>
                  <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] tracking-tight text-gray-900 mb-8'>
                    <FormattedMessage id='landing.heroTitle' />
                    <span className='block text-gray-700'>
                      <FormattedMessage id='landing.heroSubtitle' />
                    </span>
                  </h1>
                  <p className='text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-10'>
                    <FormattedMessage id='landing.heroDescription' />
                  </p>

                  {shouldShowGetStarted && (
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-8'>
                      <Button
                        size='lg'
                        className='bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 cursor-pointer'
                        onClick={() => navigate('/sign-in')}
                      >
                        <FormattedMessage id='landing.getStarted' />{' '}
                        <ArrowRight className='inline w-5 h-5 ml-2' />
                      </Button>
                      <Button
                        size='lg'
                        variant='outline'
                        className='border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 cursor-pointer'
                        onClick={() => navigate('/sign-up')}
                      >
                        <FormattedMessage id='landing.learnMore' />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='relative z-10 px-6 sm:px-8 lg:px-12 py-16 lg:py-20'>
          <div className='max-w-6xl mx-auto w-full'>
            <div className='mb-20'>
              <div className='text-center mb-16'>
                <h2 className='text-3xl font-light text-gray-900 mb-4'>
                  Designed for Professionals
                </h2>
                <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                  Every detail crafted with purpose
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {features.map(
                  ({ titleKey, descriptionKey, icon: Icon }, idx) => (
                    <div
                      key={idx}
                      className='bg-white shadow-sm border border-gray-100 rounded-2xl px-6 sm:px-8 py-12 transition-all duration-300 cursor-default hover:shadow-md group'
                    >
                      <div className='flex flex-col items-center text-center space-y-6 h-full justify-between'>
                        <div className='w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300'>
                          <Icon className='w-8 h-8 text-gray-600' />
                        </div>
                        <div className='flex-1 flex flex-col justify-center'>
                          <h3 className='text-2xl font-light text-gray-900 mb-3'>
                            <FormattedMessage id={titleKey} />
                          </h3>
                          <p className='text-gray-600 text-base leading-relaxed font-light'>
                            <FormattedMessage id={descriptionKey} />
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {shouldShowReadySection && (
              <div className='bg-white rounded-2xl shadow-sm border border-gray-100 px-8 sm:px-12 py-16 text-center'>
                <h2 className='text-3xl font-light text-gray-900 mb-4'>
                  Ready to begin?
                </h2>
                <p className='text-gray-600 text-lg mb-8 max-w-2xl mx-auto'>
                  Start building your professional resume today
                </p>
                <Button
                  size='lg'
                  className='bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 cursor-pointer'
                  onClick={() => navigate('/sign-up')}
                >
                  Create Resume <ArrowRight className='inline w-5 h-5 ml-2' />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Landing;
