import { CreateProfileTabs } from '../components';

const CreateProfile = () => {
  return (
    <main className='flex flex-col items-center justify-start w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-auto p-4 sm:p-6 lg:p-8'>
      <div className='relative w-full max-w-6xl mx-auto space-y-8 sm:space-y-12'>
        <div className='relative z-10 w-full'>
          <header className='text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent'>
              Create Your Resume
            </h1>
            <p className='text-gray-600 text-base sm:text-lg max-w-3xl mx-auto'>
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
