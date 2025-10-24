import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';

import type { ProfileQRCardProps } from './types';
import { CvHostIconV1 } from '@/components/icons';

const ProfileQRCard = ({ link, labels }: ProfileQRCardProps) => {
  const { fullName, professionalSummary } = labels;
  const url = new URL(link);
  const path = url.pathname;

  return (
    <div className='w-full font-sans select-none overflow-hidden flex flex-col xl:flex-row'>
      {/* Left Section - Desktop Only */}
      <section className='hidden xl:flex w-full xl:w-1/2 flex-col justify-center px-8 2xl:px-12 py-12 2xl:py-16 border-r border-gray-100 bg-white'>
        <div className='max-w-lg 2xl:max-w-xl'>
          <p className='text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed mb-8 2xl:mb-12 font-light'>
            Scan the QR code to instantly access my professional resume on{' '}
            <span className='font-semibold text-gray-900'>CV HOST</span>
          </p>
          <h1 className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light tracking-tight mb-8 2xl:mb-10 text-gray-900'>
            {fullName}
          </h1>
          {professionalSummary && (
            <p className='text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed mb-6 font-light'>
              {professionalSummary}
            </p>
          )}
        </div>
      </section>

      {/* Right Section - QR Code & Mobile Content */}
      <section className='w-full xl:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-white text-center'>
        {/* Mobile Header */}
        <div className='xl:hidden mb-6 sm:mb-8 w-full max-w-sm sm:max-w-md mx-auto'>
          <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-tight mb-3 sm:mb-4 text-gray-900'>
            {fullName}
          </h1>
          <p className='text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed max-w-sm sm:max-w-md mx-auto font-light'>
            Scan the QR code to instantly access my professional resume on{' '}
            <span className='font-semibold text-gray-900'>CV HOST</span>
          </p>
        </div>

        {/* Instructions */}
        <div className='mb-6 sm:mb-8 w-full max-w-sm sm:max-w-md mx-auto'>
          <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-800 mb-2'>
            Grab your phone 👇
          </h2>
          <p className='text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg font-medium'>
            Scan the code to view my resume instantly
          </p>
          <p className='text-xs sm:text-sm text-gray-400 italic mt-2 font-light'>
            (No login, no apps required — just your camera!)
          </p>
        </div>

        {/* QR Code Container */}
        <div className='w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px] mx-auto mb-6 sm:mb-8'>
          <div className='rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 bg-gray-50 shadow-sm border border-gray-100'>
            <div
              aria-label='QR Code for resume'
              className='relative rounded-lg sm:rounded-xl bg-white p-2 sm:p-3 md:p-4 lg:p-6 shadow-sm flex items-center justify-center w-full aspect-square'
              style={{
                boxShadow:
                  '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
              }}
            >
              <QRCodeSVG
                value={link}
                size={Math.min(280, Math.max(160, window.innerWidth * 0.3))}
                bgColor='#ffffff'
                fgColor='#1f2937'
                level='H'
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1 sm:p-2 shadow-sm flex items-center justify-center w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border-2 sm:border-4 border-gray-200'>
                <CvHostIconV1 />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Link */}
        <Link
          to={path}
          className='mt-4 sm:mt-6 text-gray-700 text-xs sm:text-sm md:text-base max-w-xs sm:max-w-sm break-words text-center underline decoration-gray-400 decoration-2 underline-offset-4 hover:decoration-gray-600 transition-all duration-300 font-medium hover:text-gray-900'
          title={link}
        >
          {link}
        </Link>

        {/* Additional Info */}
        <div className='mt-4 sm:mt-6 text-center'>
          <p className='text-xs sm:text-sm text-gray-500 font-light max-w-sm sm:max-w-md mx-auto px-4'>
            Share this QR code on business cards, resumes, or social media for
            instant access to your professional profile.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProfileQRCard;
