import { Download, Share2 } from 'lucide-react';
import type { ProfileHeaderProps } from './types';

const ProfileHeader = ({ fullName, summary }: ProfileHeaderProps) => {
  return (
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
          {/* Name with clean typography - removed gradient */}
          <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-gray-900 mb-6 sm:mb-8'>
            {fullName}
          </h1>

          {/* Summary with enhanced styling */}
          {summary && (
            <div className='max-w-4xl mb-8 sm:mb-12'>
              <p className='text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed font-light'>
                {summary}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 sm:mb-12'>
            <button className='group bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95 shadow-lg hover:shadow-indigo-500/50 border border-indigo-500/20 flex items-center space-x-2 cursor-pointer'>
              <Download className='w-5 h-5' />
              <span>Download CV</span>
            </button>

            <button className='group bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95 border border-gray-300 hover:border-indigo-300 shadow-sm flex items-center space-x-2 cursor-pointer'>
              <Share2 className='w-5 h-5' />
              <span>Share Profile</span>
            </button>
          </div>

          {/* Decorative line */}
          <div className='mt-8 sm:mt-12 w-24 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full'></div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
