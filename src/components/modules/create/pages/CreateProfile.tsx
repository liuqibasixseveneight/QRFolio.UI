import { CreateProfileTabs } from '../components';

const CreateProfile = () => {
  return (
    <main className='flex flex-col items-center justify-start w-full min-h-screen bg-neutral-50 overflow-auto p-6'>
      <div className='relative w-full max-w-2xl space-y-12'>
        <div className='relative z-10 w-full'>
          <header className='text-center space-y-2'>
            <h1 className='text-3xl md:text-4xl font-bold text-neutral-900'>
              Create Your resume
            </h1>
            <p className='text-neutral-600 text-base'>
              Fill in your details to generate your personalized resume
            </p>
          </header>

          <CreateProfileTabs />
        </div>
      </div>
    </main>
  );
};

export default CreateProfile;
