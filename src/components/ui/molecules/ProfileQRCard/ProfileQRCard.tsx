import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';

import type { ProfileQRCardProps } from './types';
import { LytnIconV1 } from '@/components/icons';

const ProfileQRCard = ({ link, labels }: ProfileQRCardProps) => {
  const { fullName, professionalSummary } = labels;
  const url = new URL(link);
  const path = url.pathname;

  return (
    <main className='w-full min-h-screen font-sans select-none overflow-hidden flex flex-col lg:flex-row bg-gradient-to-br from-slate-50 via-white to-indigo-50'>
      {/* Left Section - Desktop Only */}
      <section className='hidden lg:flex w-full lg:w-1/2 flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 border-r border-gray-200/50 bg-white/95 backdrop-blur-sm'>
        <div className='max-w-xl'>
          <p className='text-lg sm:text-xl text-gray-600 leading-relaxed mb-12 font-light'>
            Scan the QR code to instantly access my professional resume on{' '}
            <span className='font-semibold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              LYTN
            </span>
          </p>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-10 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent'>
            {fullName}
          </h1>
          <p className='text-lg sm:text-xl text-gray-600 leading-relaxed mb-6 font-light'>
            {professionalSummary}
          </p>
        </div>
      </section>

      {/* Right Section - QR Code & Mobile Content */}
      <section className='w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 lg:px-24 py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50/50 via-white/50 to-indigo-50/50 text-center'>
        {/* Mobile Header */}
        <div className='lg:hidden mb-8 w-full max-w-md mx-auto'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent'>
            {fullName}
          </h1>
          <p className='text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto font-light'>
            Scan the QR code to instantly access my professional resume on{' '}
            <span className='font-semibold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              LYTN
            </span>
          </p>
        </div>

        {/* Instructions */}
        <div className='mb-8 w-full max-w-md mx-auto'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-2 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent'>
            Grab your phone 👇
          </h2>
          <p className='text-gray-600 text-sm sm:text-base md:text-lg font-medium'>
            Scan the code to view my resume instantly
          </p>
          <p className='text-xs sm:text-sm text-gray-400 italic mt-2 font-light'>
            (No login, no apps required — just your camera!)
          </p>
        </div>

        {/* QR Code Container */}
        <div className='w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] mx-auto mb-8'>
          <div
            className='rounded-4xl p-3 sm:p-4 md:p-6 bg-gradient-to-tr from-indigo-50 via-white to-indigo-50 shadow-2xl border border-indigo-100/50'
            style={{
              boxShadow:
                '0 20px 40px rgba(99, 102, 241, 0.15), 0 8px 16px rgba(99, 102, 241, 0.1)',
              background:
                'linear-gradient(135deg, rgba(238, 242, 255, 0.8) 0%, rgba(255, 255, 255, 1) 50%, rgba(238, 242, 255, 0.8) 100%)',
            }}
          >
            <div
              aria-label='QR Code for resume'
              className='relative rounded-3xl bg-white p-3 sm:p-4 md:p-6 shadow-lg flex items-center justify-center w-full aspect-square'
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 1) 100%)',
              }}
            >
              <QRCodeSVG
                value={link}
                size={Math.min(280, Math.max(200, window.innerWidth * 0.4))}
                bgColor='#ffffff'
                fgColor='#1f2937'
                level='H'
                style={{
                  width: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
                }}
              />
              <div
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 border-indigo-200/80'
                style={{
                  transition: 'all 0.3s ease',
                  boxShadow:
                    '0 8px 16px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                }}
              >
                <LytnIconV1 />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Link */}
        <Link
          to={path}
          className='mt-6 text-gray-700 text-xs sm:text-sm md:text-base max-w-xs break-words text-center underline decoration-indigo-600 decoration-2 underline-offset-4 hover:decoration-indigo-800 transition-all duration-300 font-medium hover:text-indigo-700'
          title={link}
        >
          {link}
        </Link>

        {/* Additional Info */}
        <div className='mt-6 text-center'>
          <p className='text-xs sm:text-sm text-gray-500 font-light max-w-md mx-auto'>
            Share this QR code on business cards, resumes, or social media for
            instant access to your professional profile.
          </p>
        </div>
      </section>
    </main>
  );
};

export default ProfileQRCard;
