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
    <main className='flex flex-col items-center min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-gray-900 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 font-sans relative overflow-hidden'>
      {/* Subtle background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/10 to-purple-100/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl'></div>
      </div>

      <section className='w-full text-center mb-8 sm:mb-12 md:mb-16 px-4 relative z-10'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent'>
          Your dashboard
        </h1>
        <p className='text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-4xl mx-auto'>
          {profileExists
            ? 'Manage, view, share, and edit your resume effortlessly'
            : 'Create and manage your beautiful resume'}
        </p>
      </section>

      {loading ? (
        <div className='flex flex-col items-center justify-center space-y-4 relative z-10 flex-1'>
          <LoadingSpinner size={20} />
          <p className='text-gray-600 text-lg font-medium'>
            Loading your dashboard...
          </p>
        </div>
      ) : (
        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 w-full px-4 relative z-10'>
          {actions?.map(({ title, description, icon: Icon, action }, idx) => (
            <div
              key={idx}
              onClick={action}
              className='cursor-pointer rounded-xl p-6 sm:p-8 hover:bg-white/80 transition-all duration-200 flex flex-col items-center text-center bg-white/60 backdrop-blur-sm group h-full'
            >
              <div className='flex flex-col items-center space-y-4 sm:space-y-6 w-full flex-1 justify-between'>
                <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-200'>
                  <Icon className='w-6 h-6 sm:w-8 sm:h-8 text-indigo-700 group-hover:text-indigo-800 transition-colors duration-200' />
                </div>
                <div className='flex-1 flex flex-col justify-center'>
                  <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 group-hover:text-indigo-800 transition-colors duration-200 leading-tight mb-2'>
                    {title}
                  </h3>
                  <p className='text-gray-600 text-sm sm:text-base leading-relaxed font-light'>
                    {description}
                  </p>
                </div>
                <Button
                  variant='outline'
                  className='mt-4 sm:mt-6 rounded-lg px-6 py-3 transition-all duration-200 hover:bg-indigo-50 hover:border-indigo-300 font-medium w-full sm:w-auto'
                >
                  {title.includes('Create') ? 'Create' : 'Open'}
                </Button>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Dashboard;
