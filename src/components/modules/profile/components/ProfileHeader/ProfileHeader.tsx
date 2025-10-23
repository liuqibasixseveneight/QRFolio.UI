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
  // Privacy settings with defaults to true for backward compatibility
  showName = true,
  showEmail = true,
  showPhone = true,
  showLinkedIn = true,
  showPortfolio = true,
  showWorkExperience = true,
  showEducation = true,
  showLanguages = true,
  showSkills = true,
}: ProfileHeaderProps) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleViewQRCode = () => {
    setIsQRModalOpen(true);
  };

  return (
    <div className='w-full bg-white border-b border-gray-100 shadow-sm'>
      <div className='w-full px-4 xs:px-6 sm:px-8 lg:px-12'>
        <div className='max-w-6xl mx-auto w-full'>
          <header className='relative w-full'>
            <div className='px-4 xs:px-6 sm:px-8 lg:px-12 py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-32'>
              <div className='w-full'>
                <div className='flex flex-col xs:flex-row xs:items-center justify-between mb-6 xs:mb-8 sm:mb-10 gap-4'>
                  <AvailabilityBadge availability={availability} className='' />
                  <div className='flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4'>
                    <div className='flex items-center gap-2 text-xs sm:text-sm text-gray-500 py-2 sm:py-3'>
                      <Calendar className='w-3 xs:w-4 h-3 xs:h-4 text-gray-400' />
                      <span className='hidden xs:inline'>
                        Last Updated:{' '}
                        <span className='font-medium'>
                          {updatedAt
                            ? formatDateWithOrdinal(updatedAt)
                            : formatDateWithOrdinal(new Date())}
                        </span>
                      </span>
                      <span className='xs:hidden'>
                        Updated{' '}
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
                        className='flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-lg transition-all duration-200 cursor-pointer'
                        title='Edit Profile'
                      >
                        <Edit className='w-3 xs:w-4 h-3 xs:h-4' />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>
                </div>

                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light tracking-tight text-gray-900 mb-6 sm:mb-8 md:mb-10 leading-tight'>
                  {showName ? fullName : 'Profile'}
                </h1>

                {summary && (
                  <div className='max-w-4xl mb-8 xs:mb-10 sm:mb-12 lg:mb-16'>
                    <p className='text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 leading-relaxed font-light'>
                      {summary}
                    </p>
                  </div>
                )}

                <ContactInformation
                  email={email}
                  phone={phone}
                  linkedin={linkedin}
                  portfolio={portfolio}
                  showEmail={showEmail}
                  showPhone={showPhone}
                  showLinkedIn={showLinkedIn}
                  showPortfolio={showPortfolio}
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
