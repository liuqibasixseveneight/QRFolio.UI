import { useNavigate } from 'react-router-dom';
import { Pencil, Share2, Eye, Plus } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

import { Button, LoadingSpinner } from '@/components/ui';
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
      titleKey: profileExists
        ? 'dashboard.actions.editResume'
        : 'dashboard.actions.createResume',
      descriptionKey: profileExists
        ? 'dashboard.actions.editDescription'
        : 'dashboard.actions.createDescription',
      icon: profileExists ? Pencil : Plus,
      action: profileExists ? handleEdit : handleCreate,
    },
    ...(profileExists
      ? [
          {
            titleKey: 'dashboard.actions.viewResume',
            descriptionKey: 'dashboard.actions.viewDescription',
            icon: Eye,
            action: handleView,
          },
          {
            titleKey: 'dashboard.actions.shareResume',
            descriptionKey: 'dashboard.actions.shareDescription',
            icon: Share2,
            action: handleShare,
          },
        ]
      : []),
  ];

  return (
    <main className='min-h-screen w-full bg-gray-50 text-gray-900 font-sans relative overflow-hidden'>
      <div className='w-full bg-white border-b border-gray-100 shadow-sm'>
        <div className='w-full px-6 sm:px-8 lg:px-12'>
          <div className='max-w-6xl mx-auto w-full'>
            <div className='px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32'>
              <div className='text-center'>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] tracking-tight text-gray-900 mb-6'>
                  <FormattedMessage
                    id={
                      profileExists
                        ? 'dashboard.manageResume'
                        : 'dashboard.createResume'
                    }
                  />
                </h1>
                <p className='text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto'>
                  <FormattedMessage
                    id={
                      profileExists
                        ? 'dashboard.manageDescription'
                        : 'dashboard.createDescription'
                    }
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='relative z-10 px-6 sm:px-8 lg:px-12 py-16 lg:py-20'>
        <div className='max-w-6xl mx-auto w-full'>
          {loading ? (
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 px-8 sm:px-12 py-16 text-center'>
              <div className='w-16 h-16 mx-auto mb-6'>
                <LoadingSpinner />
              </div>
              <p className='text-gray-600 text-lg font-medium'>
                <FormattedMessage id='dashboard.loadingDashboard' />
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {actions?.map(
                ({ titleKey, descriptionKey, icon: Icon, action }, idx) => (
                  <div
                    key={idx}
                    className='bg-white shadow-sm border border-gray-100 rounded-2xl px-6 sm:px-8 py-12 transition-all duration-300 cursor-pointer hover:shadow-md group'
                    onClick={action}
                  >
                    <div className='flex flex-col items-center text-center space-y-6 h-full justify-between'>
                      <div className='w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300'>
                        <Icon className='w-8 h-8 text-gray-600' />
                      </div>
                      <div className='flex-1 flex flex-col justify-center'>
                        <h3 className='text-2xl font-light text-gray-900 mb-3'>
                          <FormattedMessage id={titleKey} />
                        </h3>
                        <p className='text-gray-600 text-base leading-relaxed font-light'>
                          <FormattedMessage id={descriptionKey} />
                        </p>
                      </div>
                      <Button
                        variant='outline'
                        className='border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer w-full'
                      >
                        <FormattedMessage
                          id={
                            titleKey.includes('create')
                              ? 'dashboard.actions.createButton'
                              : 'dashboard.actions.openButton'
                          }
                        />
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
