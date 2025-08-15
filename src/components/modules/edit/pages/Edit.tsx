import { EditProfile } from '../components';

const Edit = () => {
  return (
    <main className='min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-900 font-sans relative'>
      {/* Subtle background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-80 bg-indigo-50/40 rounded-full blur-3xl'></div>
      </div>

      {/* Main Content */}
      <div className='relative z-10 w-full h-full'>
        <EditProfile />
      </div>
    </main>
  );
};

export default Edit;
