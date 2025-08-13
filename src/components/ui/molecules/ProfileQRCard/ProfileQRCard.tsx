import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';

import type { ProfileQRCardProps } from './types';
import { LytnIconV1 } from '@/components/icons';

const ProfileQRCard = ({ link, labels }: ProfileQRCardProps) => {
  const { fullName, professionalSummary } = labels;
  const url = new URL(link);
  const path = url.pathname;

  return (
    <main className='w-full min-h-screen font-sans select-none overflow-hidden flex flex-col lg:flex-row bg-gray-50 lg:bg-white'>
      <section className='hidden lg:flex w-full lg:w-1/2 flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 border-r border-gray-200 bg-white'>
        <div className='max-w-xl'>
          <p className='text-lg sm:text-xl text-gray-600 leading-relaxed mb-12'>
            Scan the QR code to instantly access my professional resume on{' '}
            <span className='font-semibold text-gray-900'>LYTN</span>
          </p>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-10'>
            {fullName}
          </h1>
          <p className='text-lg sm:text-xl text-gray-600 leading-relaxed mb-6'>
            {professionalSummary}
          </p>
        </div>
      </section>

      <section className='w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-24 py-12 bg-gray-50 text-center'>
        <div className='lg:hidden mb-8'>
          <h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight mb-4'>
            {fullName}
          </h1>
          <p className='text-base sm:text-lg text-gray-600 leading-relaxed max-w-md mx-auto'>
            Scan the QR code to instantly access my professional resume on{' '}
            <span className='font-semibold text-gray-900'>LYTN</span>
          </p>
        </div>

        <div className='mb-6'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-gray-800 mb-1'>
            Grab your phone 👇
          </h2>
          <p className='text-gray-600 text-base sm:text-lg'>
            Scan the code to view my resume instantly
          </p>
          <p className='text-sm text-gray-400 italic mt-1'>
            (No login, no apps required — just your camera!)
          </p>
        </div>

        <div
          className='rounded-4xl p-4 sm:p-6 bg-gradient-to-tr from-indigo-50 via-white to-indigo-50 shadow-lg'
          style={{ boxShadow: '0 12px 24px rgba(99, 102, 241, 0.15)' }}
        >
          <div
            aria-label='QR Code for resume'
            className='relative rounded-3xl bg-white p-4 sm:p-6 shadow-md flex items-center justify-center w-full max-w-[256px]'
          >
            <QRCodeSVG
              value={link}
              size={200}
              bgColor='#ffffff'
              fgColor='#1f2937'
              level='H'
              style={{ width: '100%', height: 'auto' }}
            />
            <div
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md flex items-center justify-center w-[64px] h-[64px] sm:w-[80px] sm:h-[80px]'
              style={{
                transition: 'transform 0.2s ease',
                border: '5px solid #e0e7ff',
              }}
            >
              <LytnIconV1 />
            </div>
          </div>
        </div>

        <Link
          to={path}
          className='mt-8 text-gray-700 text-sm sm:text-base max-w-xs break-words text-center underline decoration-indigo-600 decoration-2 underline-offset-4 hover:decoration-indigo-800 transition-colors duration-300'
          title={link}
        >
          {link}
        </Link>
      </section>
    </main>
  );
};

export default ProfileQRCard;
