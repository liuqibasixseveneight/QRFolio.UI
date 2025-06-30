import { useParams } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
};

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  const storedProfile = id ? localStorage.getItem(`profile-${id}`) : null;
  const profile: FormData | null = storedProfile
    ? JSON.parse(storedProfile)
    : null;

  if (!profile) {
    return (
      <div className='text-center mt-8'>
        <p className='text-lg text-gray-600'>
          Profile not found or has been deleted.
        </p>
      </div>
    );
  }

  return (
    <Card className='w-full max-w-md p-6 mx-auto mt-8'>
      <CardHeader>
        <CardTitle className='text-xl font-bold'>
          {profile.firstName} {profile.lastName}'s QRFolio
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Address:</strong> {profile.address}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
