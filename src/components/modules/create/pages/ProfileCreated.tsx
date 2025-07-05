import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ProfileQRCard,
} from '@/components/ui';

const ProfileCreated = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const idFromState = location.state?.id ?? null;

  const [profileId] = useState(idFromState);
  const [profileData] = useState(() => {
    if (idFromState) {
      const stored = localStorage.getItem(`profile-${idFromState}`);
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  if (!profileData || !profileId) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-gray-50 to-white p-8'>
        <p className='text-lg text-gray-600 mb-4'>Profile data not found.</p>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </div>
    );
  }

  const profileLink = `${window.location.origin}/profile/${profileId}`;
  const displayName = profileData.fullName ?? 'Your QRFolio';

  return (
    <main className='relative flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-white overflow-hidden p-6'>
      <Card className='relative w-full max-w-3xl p-10 shadow-2xl rounded-3xl border border-indigo-100 bg-white/80 backdrop-blur-lg'>
        <CardHeader className='text-center space-y-2'>
          <CardTitle className='text-4xl font-extrabold text-indigo-700'>
            🎉 Your QRFolio is Ready!
          </CardTitle>
          <p className='text-gray-600 text-base max-w-lg mx-auto'>
            Your personal QR code makes sharing your resume easy and
            professional. Hand it to potential employers or connections and let
            your story speak for itself.
          </p>
        </CardHeader>
        <CardContent className='flex flex-col items-center gap-8 mt-6'>
          <ProfileQRCard labels={{ displayName }} link={profileLink} />
          <Button
            size='lg'
            className='gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-3 text-lg font-semibold shadow-md hover:shadow-lg transition'
            onClick={() => navigate(`/profile/${profileId}`)}
          >
            View Full Profile <ArrowRight size={20} />
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default ProfileCreated;
