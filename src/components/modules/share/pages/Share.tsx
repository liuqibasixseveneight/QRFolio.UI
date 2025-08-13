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
      <div className='min-h-screen w-full items-center flex justify-center'>
        <LoadingSpinner size={20} />
      </div>
    );
  }

  return (
    <div className='min-h-screen w-full'>
      <ProfileQRCard
        labels={{ fullName, professionalSummary }}
        link={profileLink}
      />
    </div>
  );
};

export default Share;
