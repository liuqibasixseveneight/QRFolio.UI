import { Download, Share2 } from 'lucide-react';
import type { ProfileHeaderProps } from './types';

const ProfileHeader = ({ fullName, summary }: ProfileHeaderProps) => {
  return (
    <header className='relative w-full bg-white/90 backdrop-blur-sm border-b border-gray-200/50'>
      {/* Subtle background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20'>
        <div className='max-w-7xl mx-auto'>
          {/* Name */}
          <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-gray-900 mb-4 sm:mb-6'>
            {fullName}
          </h1>

          {/* Summary */}
          {summary && (
            <div className='max-w-4xl mb-6 sm:mb-8'>
              <p className='text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed font-light'>
                {summary}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8'>
            <button className='bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 active:scale-[0.98] shadow-md hover:shadow-lg'>
              <span className='flex items-center gap-2'>
                <Download className='w-5 h-5' />
                <span>Download CV</span>
              </span>
            </button>

            <button className='bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 active:scale-[0.98] border border-gray-300/50 hover:border-gray-400/50 shadow-md hover:shadow-lg'>
              <span className='flex items-center gap-2'>
                <Share2 className='w-5 h-5' />
                <span>Share Profile</span>
              </span>
            </button>
          </div>

          {/* Decorative line */}
          <div className='mt-6 sm:mt-8 w-24 h-1 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full'></div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
