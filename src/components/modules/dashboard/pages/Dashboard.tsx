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
    <main className='min-h-screen w-full bg-gray-50 text-gray-900 font-sans relative overflow-hidden'>
      {/* Content container with proper width constraints */}
      <div className='relative z-10 px-6 sm:px-8 lg:px-12 py-16 lg:py-20'>
        <div className='max-w-6xl mx-auto w-full'>
          {/* Header Section */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 px-12 py-16 mb-16'>
            <div className='text-center'>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] tracking-tight text-gray-900 mb-6'>
                {profileExists ? 'Manage Your Resume' : 'Create Your Resume'}
              </h1>
              <p className='text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto'>
                {profileExists
                  ? 'Manage, view, share, and edit your resume effortlessly'
                  : 'Start crafting your beautiful, professional resume'}
              </p>
            </div>
          </div>

          {loading ? (
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 px-12 py-16 text-center'>
              <div className='w-16 h-16 mx-auto mb-6'>
                <LoadingSpinner />
              </div>
              <p className='text-gray-600 text-lg font-medium'>
                Loading your dashboard...
              </p>
            </div>
          ) : (
            /* Actions Grid */
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {actions?.map(
                ({ title, description, icon: Icon, action }, idx) => (
                  <div
                    key={idx}
                    className='bg-white shadow-sm border border-gray-100 rounded-2xl px-8 py-12 transition-all duration-300 cursor-pointer hover:shadow-md'
                    onClick={action}
                  >
                    <div className='flex flex-col items-center text-center space-y-6 h-full justify-between'>
                      <div className='w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center'>
                        <Icon className='w-8 h-8 text-gray-600' />
                      </div>
                      <div className='flex-1 flex flex-col justify-center'>
                        <h3 className='text-2xl font-light text-gray-900 mb-3'>
                          {title}
                        </h3>
                        <p className='text-gray-600 text-base leading-relaxed font-light'>
                          {description}
                        </p>
                      </div>
                      <Button
                        variant='outline'
                        className='border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer w-full'
                      >
                        {title.includes('Create') ? 'Create' : 'Open'}
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
