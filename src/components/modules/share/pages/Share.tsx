import { FormattedMessage } from 'react-intl';

import { useGetProfile } from '@/apollo/profile';
import { LoadingSpinner, ProfileQRCard, Breadcrumb } from '@/components/ui';
import { useAuth } from '@/context';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { PRODUCTION_URL } from '@/config';

const Share = () => {
  const { userId } = useAuth();
  const breadcrumbs = useBreadcrumbs();

  const [
    data,
    {
      loading,
      // @ts-ignore
      // TODO: Handle error state
      error,
    },
  ] = useGetProfile(userId || '');

  const { fullName = '', professionalSummary = '' } = data?.profile || {};
  const profileLink = PRODUCTION_URL
    ? `${PRODUCTION_URL}/profile/${userId}`
    : `${window.location.origin}/profile/${userId}`;

  if (loading) {
    return (
      <main className='min-h-screen w-full bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 mx-auto mb-6'>
            <LoadingSpinner />
          </div>
          <p className='text-gray-600 text-lg font-medium'>
            <FormattedMessage id='shareProfile.loadingProfile' />
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen w-full bg-gray-50 text-gray-900 font-sans relative overflow-hidden'>
      <div className='w-full bg-white border-b border-gray-100 shadow-sm'>
        <div className='w-full px-6 sm:px-8 lg:px-12'>
          <div className='max-w-6xl mx-auto w-full'>
            {breadcrumbs.length > 0 && (
              <div className='px-6 sm:px-8 lg:px-12 pt-6 pb-4'>
                <Breadcrumb items={breadcrumbs} />
              </div>
            )}
            <div className='px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32'>
              <div className='text-center'>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] tracking-tight text-gray-900 mb-6'>
                  <FormattedMessage id='shareProfile.title' />
                </h1>
                <p className='text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto'>
                  <FormattedMessage id='shareProfile.description' />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='relative z-10 px-6 sm:px-8 lg:px-12 py-16 lg:py-20'>
        <div className='max-w-6xl mx-auto w-full'>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 px-8 sm:px-12 py-16'>
            <div className='text-center mb-8'>
              <h2 className='text-2xl font-light text-gray-900 mb-2'>
                <FormattedMessage id='shareProfile.scanToView' />
              </h2>
              <p className='text-gray-600 text-sm'>
                <FormattedMessage id='shareProfile.scanDescription' />
              </p>
            </div>
            <ProfileQRCard
              labels={{ fullName, professionalSummary }}
              link={profileLink}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Share;
