import { useNavigate } from 'react-router-dom';
import { Pencil, Share2, Eye, Plus } from 'lucide-react';

import { Button, Card, CardContent, LoadingSpinner } from '@/components/ui';
import { useGetProfile } from '@/apollo/profile';
import { useAuth } from '@/context';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();

  const [
    data,
    {
      loading,
      // @ts-ignore
      error,
    },
  ] = useGetProfile(userId || '');

  const profileExists = !!data?.profile;

  const handleCreate = () => {
    if (profileExists) {
      navigate(`/profile/${userId}/edit`);
    } else {
      navigate('/create-profile');
    }
  };
  const handleEdit = () => {
    navigate(`/profile/${userId}/edit`);
  };
  const handleView = () => {
    navigate(`/profile/${userId}`);
  };
  const handleShare = () => {
    navigate(`/profile/${userId}/share`);
  };

  const actions = [
    {
      title: profileExists ? 'Edit Your Resume' : 'Create Your Resume',
      description: profileExists
        ? 'Update and refine your resume anytime'
        : 'Start crafting your professional story',
      icon: profileExists ? Pencil : Plus,
      action: profileExists ? handleEdit : handleCreate,
    },
    ...(profileExists
      ? [
          {
            title: 'View Resume',
            description: 'Preview your resume as others will see it',
            icon: Eye,
            action: handleView,
          },
          {
            title: 'Share Resume',
            description: 'Copy your public resume link to share easily',
            icon: Share2,
            action: handleShare,
          },
        ]
      : []),
  ];

  return (
    <main className='flex flex-col items-center min-h-screen bg-white text-gray-900 px-4 md:px-8 py-16 max-w-7xl mx-auto font-sans'>
      <section className='w-full max-w-2xl text-center mb-12 px-4'>
        <h1 className='text-4xl md:text-5xl font-extralight tracking-tight mb-4'>
          Your dashboard
        </h1>
        <p className='text-gray-500 text-lg md:text-xl'>
          {profileExists
            ? 'Manage, view, share, and edit your resume effortlessly'
            : 'Create and manage your beautiful resume'}
        </p>
      </section>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4'>
          {actions?.map(({ title, description, icon: Icon, action }, idx) => (
            <Card
              key={idx}
              onClick={action}
              className='cursor-pointer border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center bg-white'
            >
              <CardContent className='flex flex-col items-center space-y-4'>
                <Icon className='w-8 h-8 text-gray-700' />
                <h3 className='text-lg font-medium text-gray-900'>{title}</h3>
                <p className='text-gray-500 text-sm'>{description}</p>
                <Button
                  variant='outline'
                  className='mt-2 rounded-md px-4 py-2 shadow-sm hover:bg-gray-50 transition'
                >
                  {title.includes('Create') ? 'Create' : 'Open'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </main>
  );
};

export default Dashboard;
