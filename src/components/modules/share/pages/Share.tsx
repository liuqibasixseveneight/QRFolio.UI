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
      <div className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center'>
        <div className='text-center space-y-4'>
          <LoadingSpinner size={20} />
          <p className='text-gray-600 text-lg font-medium'>
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden'>
      {/* Subtle background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/10 to-purple-100/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 w-full h-full'>
        <ProfileQRCard
          labels={{ fullName, professionalSummary }}
          link={profileLink}
        />
      </div>
    </div>
  );
};

export default Share;
