import { useState } from 'react';
import { Calendar, Edit } from 'lucide-react';

import { AvailabilityBadge, QRCodeModal } from '@/components/ui';
import { formatDateWithOrdinal } from './utils';
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
  skills = [],
  updatedAt,
  isOwner = false,
  onEditClick,
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
                <div className='flex items-center justify-between mb-10'>
                  <AvailabilityBadge availability={availability} className='' />
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2 text-sm text-gray-500 py-3'>
                      <Calendar className='w-4 h-4 text-gray-400' />
                      <span>
                        Last Updated:{' '}
                        <span className='font-medium'>
                          {updatedAt
                            ? formatDateWithOrdinal(updatedAt)
                            : formatDateWithOrdinal(new Date())}
                        </span>
                      </span>
                    </div>
                    {isOwner && onEditClick && (
                      <button
                        onClick={onEditClick}
                        className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-lg transition-all duration-200 cursor-pointer'
                        title='Edit Profile'
                      >
                        <Edit className='w-4 h-4' />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>
                </div>

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
                    skills,
                    updatedAt,
                  }}
                  onViewQRCode={handleViewQRCode}
                />
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
