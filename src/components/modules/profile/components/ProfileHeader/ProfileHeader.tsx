import type { ProfileHeaderProps } from './types';

const ProfileHeader = ({ fullName, summary }: ProfileHeaderProps) => (
  <header className='w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg px-6 sm:px-8 xl:px-12 2xl:px-20 py-16 text-left'>
    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900'>
      {fullName}
    </h1>
    {summary && (
      <p className='mt-8 text-base sm:text-lg text-gray-600 leading-relaxed'>
        {summary}
      </p>
    )}
  </header>
);

export default ProfileHeader;
