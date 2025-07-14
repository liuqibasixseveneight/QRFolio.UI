import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Copy, Download } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

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

  const cardRef = useRef<HTMLDivElement>(null);

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

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(profileLink);
  };

  const downloadCardImage = () => {
    if (!cardRef.current) return;

    htmlToImage
      .toPng(cardRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${displayName.replace(/\s+/g, '_')}_QRCode.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Failed to export QR code card image', err);
        alert('Failed to download QR code image. Please try again.');
      });
  };

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
          <div
            ref={cardRef}
            className='flex justify-center w-full max-w-xl mx-auto px-6 sm:px-0 mb-8'
          >
            <ProfileQRCard labels={{ displayName }} link={profileLink} />
          </div>

          <div className='flex flex-wrap gap-4 justify-center'>
            <Button size='lg' variant='default' onClick={copyLinkToClipboard}>
              <Copy className='mr-2' size={18} /> Copy Link
            </Button>
            <Button size='lg' variant='default' onClick={downloadCardImage}>
              <Download className='mr-2' size={18} /> Download QR Code
            </Button>
            <Button
              size='lg'
              variant='default'
              onClick={() => navigate(`/profile/${profileId}`)}
            >
              View Full Profile <ArrowRight size={20} className='ml-2' />
            </Button>{' '}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileCreated;
