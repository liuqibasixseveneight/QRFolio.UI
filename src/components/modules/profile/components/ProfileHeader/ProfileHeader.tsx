import { useState } from 'react';
import { Calendar } from 'lucide-react';

import { AvailabilityBadge, QRCodeModal } from '@/components/ui';
import { formatDate } from './utils';
import { ActionButtons, ContactInformation } from './components';
import type { ProfileHeaderProps } from './types';

const ProfileHeader = ({
  fullName,
  summary,
  email,
  phone,
  linkedin,
  portfolio,
  availability,
  workExperience = [],
  education = [],
  languages = [],
  updatedAt,
}: ProfileHeaderProps) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleViewQRCode = () => {
    setIsQRModalOpen(true);
  };

  return (
    <div className='w-full bg-white border-b border-gray-100 shadow-sm'>
      <div className='w-full px-6 sm:px-8 lg:px-12'>
        <div className='max-w-6xl mx-auto w-full'>
          <header className='relative w-full'>
            <div className='px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32'>
              <div className='w-full'>
                <AvailabilityBadge
                  availability={availability}
                  className='mb-10'
                />

                <h1 className='text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-gray-900 mb-8 sm:mb-10 leading-tight'>
                  {fullName}
                </h1>

                {summary && (
                  <div className='max-w-4xl mb-12 sm:mb-16'>
                    <p className='text-xl sm:text-2xl lg:text-3xl text-gray-600 leading-relaxed font-light'>
                      {summary}
                    </p>
                  </div>
                )}

                <ContactInformation
                  email={email}
                  phone={phone}
                  linkedin={linkedin}
                  portfolio={portfolio}
                />

                <ActionButtons
                  profileData={{
                    fullName,
                    summary,
                    email,
                    phone,
                    linkedin,
                    portfolio,
                    availability,
                    workExperience,
                    education,
                    languages,
                    updatedAt,
                  }}
                  onViewQRCode={handleViewQRCode}
                />

                <div className='flex flex-wrap items-center gap-8 text-sm text-gray-500 mb-8'>
                  <span className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    Last Updated:{' '}
                    {updatedAt ? formatDate(updatedAt) : formatDate(new Date())}
                  </span>
                </div>

                <div className='w-32 h-px bg-gray-300'></div>
              </div>
            </div>
          </header>
        </div>
      </div>

      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        profileData={{
          link: window.location.href,
          labels: {
            fullName: fullName || '',
            professionalSummary: summary || '',
          },
        }}
      />
    </div>
  );
};

export default ProfileHeader;
