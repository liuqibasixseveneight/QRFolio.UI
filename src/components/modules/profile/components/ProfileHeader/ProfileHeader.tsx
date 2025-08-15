import { Download, Share2 } from 'lucide-react';
import type { ProfileHeaderProps } from './types';

const ProfileHeader = ({ fullName, summary }: ProfileHeaderProps) => {
  return (
    <header className='relative w-full bg-gradient-to-r from-slate-50/95 via-white to-blue-50/95 backdrop-blur-sm border-b border-slate-200/40 shadow-xl shadow-slate-200/20'>
      {/* Subtle background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-slate-100/30 to-blue-100/30 rounded-full blur-3xl'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20'>
        <div className='max-w-7xl mx-auto'>
          {/* Name */}
          <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-slate-900 mb-4 sm:mb-6'>
            {fullName}
          </h1>

          {/* Summary */}
          {summary && (
            <div className='max-w-4xl mb-6 sm:mb-8'>
              <p className='text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-light'>
                {summary}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8'>
            <button className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 active:scale-[0.98] shadow-lg hover:shadow-xl shadow-blue-500/25 hover:shadow-blue-500/35'>
              <span className='flex items-center gap-2'>
                <Download className='w-5 h-5' />
                <span>Download CV</span>
              </span>
            </button>

            <button className='bg-white/90 hover:bg-white text-slate-700 px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 active:scale-[0.98] border border-slate-200/50 hover:border-slate-300/50 shadow-lg hover:shadow-xl shadow-slate-200/30 hover:shadow-slate-200/40 backdrop-blur-sm'>
              <span className='flex items-center gap-2'>
                <Share2 className='w-5 h-5' />
                <span>Share Profile</span>
              </span>
            </button>
          </div>

          {/* Decorative line */}
          <div className='mt-6 sm:mt-8 w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg'></div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
