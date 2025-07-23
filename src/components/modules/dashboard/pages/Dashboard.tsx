import { useNavigate } from 'react-router-dom';
import { Pencil, Share2, Eye, Plus } from 'lucide-react';

import { Button, Card, CardContent } from '@/components/ui';

const Dashboard = () => {
  const navigate = useNavigate();

  // TODO: Replace with real user data / hook
  const resumeExists = true;
  const resume = {
    title: 'Product Designer Resume',
    updated: '2 days ago',
    id: 'abc123',
    publicUrl: `https://lytn.app/r/abc123`,
  };

  const handleCreate = () => {
    if (resumeExists) {
      // TODO: Future models here
      navigate(`/resume/${resume.id}/edit`);
    } else {
      navigate('/create-resume');
    }
  };

  const handleView = () => {
    window.open(resume.publicUrl, '_blank');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(resume.publicUrl);
  };

  const handleEdit = () => {
    navigate(`/resume/${resume.id}/edit`);
  };

  const actions = [
    {
      title: resumeExists ? 'Edit Your Resume' : 'Create Your Resume',
      description: resumeExists
        ? 'Update and refine your resume anytime'
        : 'Start crafting your professional story',
      icon: resumeExists ? Pencil : Plus,
      action: resumeExists ? handleEdit : handleCreate,
    },
    ...(resumeExists
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
          Your LYTN Dashboard
        </h1>
        <p className='text-gray-500 text-lg md:text-xl'>
          {resumeExists
            ? 'Manage, view, share, and edit your resume effortlessly'
            : 'Create and manage your beautiful LYTN resume'}
        </p>
      </section>

      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4'>
        {actions.map(({ title, description, icon: Icon, action }, idx) => (
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
    </main>
  );
};

export default Dashboard;
