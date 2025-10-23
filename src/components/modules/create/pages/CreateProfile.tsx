import { CreateProfileTabs } from '../components';

const CreateProfile = () => {
  return (
    <main className='min-h-screen w-full bg-gray-50 text-gray-900 font-sans relative'>
      <div className='relative z-10 w-full h-full'>
        <CreateProfileTabs />
      </div>
    </main>
  );
};

export default CreateProfile;
