import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { Button, ProfileQRCard } from '@/components/ui';
import type { CVFormValues } from '../types';

const ProfileCreated = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const profileId = location.state?.id ?? null;

  const profileData: CVFormValues | null = (() => {
    if (profileId) {
      const stored = localStorage.getItem(`profile-${profileId}`);
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  })();

  if (!profileData || !profileId) {
    return (
      <main className='flex flex-col items-center justify-center min-h-screen w-full bg-neutral-50 p-8 text-center'>
        <p className='text-lg text-neutral-600 mb-6'>Profile data not found.</p>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </main>
    );
  }

  const profileLink = `${window.location.origin}/profile/${profileId}`;
  const displayName = profileData.fullName ?? 'Your QRFolio';

  return (
    <main className='flex flex-col items-center justify-start w-full min-h-screen bg-neutral-50 overflow-auto p-8 sm:p-10'>
      <div className='relative w-full max-w-2xl space-y-16'>
        <header className='text-center space-y-4'>
          <h1 className='text-3xl md:text-4xl font-semibold text-neutral-900'>
            🎉 Your QRFolio is Ready!
          </h1>
          <p className='text-neutral-600 text-base max-w-xl mx-auto'>
            Your personal QR code makes sharing your resume easy and
            professional. Hand it to potential employers or connections and let
            your story speak for itself.
          </p>
        </header>

        <div className='w-full flex flex-col items-center gap-10 px-4 sm:px-0'>
          <ProfileQRCard labels={{ displayName }} link={profileLink} />
          <Button size='lg' onClick={() => navigate(`/profile/${profileId}`)}>
            View Full Profile <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProfileCreated;
