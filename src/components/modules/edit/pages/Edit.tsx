import { EditProfile } from '../components';

const Edit = () => {
  return (
    <main className='min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-900 font-sans relative'>
      {/* Subtle background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-50/40 rounded-full blur-3xl'></div>
      </div>

      {/* Header Section */}
      <header className='relative w-full overflow-hidden bg-white border-b border-gray-200'>
        {/* Background with subtle gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-indigo-100/50'></div>

        {/* Subtle background elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-40 -right-40 w-80 h-80 bg-indigo-100/20 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-50/30 rounded-full blur-3xl'></div>
        </div>

        {/* Content */}
        <div className='relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 py-16 sm:py-20 lg:py-24 xl:py-32'>
          <div className='max-w-7xl mx-auto'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-gray-900 mb-6 sm:mb-8'>
              Edit Your Profile
            </h1>
            <p className='text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed font-light max-w-4xl'>
              Update your professional profile details below. Your changes will
              be reflected in your personalized QR code and resume.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className='relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 py-8 xl:py-12'>
        <div className='max-w-4xl mx-auto'>
          <EditProfile />
        </div>
      </div>
    </main>
  );
};

export default Edit;
