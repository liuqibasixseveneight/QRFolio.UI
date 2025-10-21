import { useNavigate } from 'react-router-dom';
import { ArrowRight, Copy } from 'lucide-react';

import { Button, LoadingSpinner, ProfileQRCard } from '@/components/ui';
import { useAuth } from '@/context';
import { useGetProfile } from '@/apollo/profile';
import { PRODUCTION_URL } from '@/config';

const ProfileCreated = () => {
  const navigate = useNavigate();

  const { userId } = useAuth();

  // @ts-ignore
  const [data, { loading, error }] = useGetProfile(userId || '');
  const profileData = data?.profile;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!profileData || !userId) {
    return (
      <main className='flex flex-col items-center justify-center min-h-screen w-full bg-neutral-50 p-8 text-center'>
        <p className='text-lg text-neutral-600 mb-6'>Profile data not found.</p>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </main>
    );
  }

  const profileLink = PRODUCTION_URL
    ? `${PRODUCTION_URL}/profile/${userId}`
    : `${window.location.origin}/profile/${userId}`;
  const fullName = profileData?.fullName ?? 'Your resume';

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(profileLink);
  };

  return (
    <main className='flex flex-col items-center justify-start w-full min-h-screen bg-neutral-50 overflow-auto p-8 sm:p-10'>
      <div className='relative w-full max-w-2xl space-y-16'>
        <header className='text-center space-y-4'>
          <h1 className='text-3xl md:text-4xl font-semibold text-neutral-900'>
            🎉 Your resume is Ready!
          </h1>
          <p className='text-neutral-600 text-base max-w-xl mx-auto'>
            Your personal QR code makes sharing your resume easy and
            professional. Hand it to potential employers or connections and let
            your story speak for itself.
          </p>
        </header>

        <div className='w-full flex flex-col items-center gap-10 px-4 sm:px-0'>
          <div className='flex justify-center w-full max-w-xl mx-auto px-6 sm:px-0 mb-8'>
            <ProfileQRCard
              labels={{
                fullName,
                professionalSummary:
                  profileData?.professionalSummary || 'Professional profile',
              }}
              link={profileLink}
            />
          </div>

          <div className='flex flex-wrap gap-4 justify-center'>
            <Button size='lg' variant='default' onClick={copyLinkToClipboard}>
              <Copy className='mr-2' size={18} /> Copy Link
            </Button>
            <Button
              size='lg'
              variant='default'
              onClick={() => navigate(`/profile/${userId}`)}
            >
              View Full Profile <ArrowRight size={20} className='ml-2' />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileCreated;
