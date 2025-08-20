import { useGetProfile } from '@/apollo/profile';
import { LoadingSpinner, ProfileQRCard } from '@/components/ui';
import { useAuth } from '@/context';

const Share = () => {
  const { userId } = useAuth();

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
  const profileLink = `${window.location.origin}/profile/${userId}`;

  if (loading) {
    return (
      <main className='min-h-screen w-full bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 mx-auto mb-6'>
            <LoadingSpinner />
          </div>
          <p className='text-gray-600 text-lg font-medium'>
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen w-full bg-gray-50 text-gray-900 font-sans relative overflow-hidden'>
      {/* Content container with proper width constraints */}
      <div className='relative z-10 px-6 sm:px-8 lg:px-12 py-16 lg:py-20'>
        <div className='max-w-6xl mx-auto w-full'>
          {/* Header Section */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 px-12 py-16 mb-16'>
            <div className='text-center'>
              <div className='inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6'>
                <div className='w-2 h-2 bg-gray-400 rounded-full'></div>
                <span className='text-xs font-medium text-gray-600 uppercase tracking-wider'>
                  Share
                </span>
              </div>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] tracking-tight text-gray-900 mb-6'>
                Share Your Profile
              </h1>
              <p className='text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto'>
                Generate QR codes and share your professional resume with anyone
              </p>
            </div>
          </div>

          {/* QR Card Section */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 px-12 py-16'>
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
