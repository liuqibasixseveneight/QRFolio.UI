import { useState } from 'react';
import { Calendar, Edit, Globe, Lock, Shield } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

import {
  AvailabilityBadge,
  QRCodeModal,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import { formatDateWithOrdinal } from './utils';
import { ActionButtons, ContactInformation } from './components';
import type { ProfileHeaderProps } from './types';

const ACCESS_LEVELS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  RESTRICTED: 'restricted',
} as const;

const getVisibilityConfig = (level: string) => {
  switch (level) {
    case ACCESS_LEVELS.PUBLIC:
      return {
        icon: Globe,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
        iconColor: 'text-green-600',
      };
    case ACCESS_LEVELS.PRIVATE:
      return {
        icon: Lock,
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-700',
        iconColor: 'text-yellow-600',
      };
    case ACCESS_LEVELS.RESTRICTED:
      return {
        icon: Shield,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-700',
        iconColor: 'text-blue-600',
      };
    default:
      return {
        icon: Globe,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
        iconColor: 'text-green-600',
      };
  }
};

const ProfileHeader = ({
  fullName,
  summary,
  email,
  phone,
  linkedin,
  portfolio,
  availability,
  accessLevel = 'public',
  workExperience = [],
  education = [],
  languages = [],
  skills = [],
  updatedAt,
  isOwner = false,
  onEditClick,
  showName = true,
  showEmail = true,
  showPhone = true,
  showLinkedIn = true,
  showPortfolio = true,
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
                <div className='flex flex-wrap items-center gap-2 xs:gap-4 sm:justify-between mb-10 xs:mb-12 sm:mb-14'>
                  <AvailabilityBadge availability={availability} className='' />
                  <div className='flex flex-wrap items-center gap-2 xs:gap-4'>
                    {isOwner && onEditClick && (
                      <button
                        onClick={onEditClick}
                        className='flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-lg transition-all duration-200 cursor-pointer'
                        title='Edit Profile'
                      >
                        <Edit className='w-3 sm:w-4 h-3 sm:h-4' />
                        <span>
                          <FormattedMessage id='profile.editProfile' />
                        </span>
                      </button>
                    )}
                    {isOwner && accessLevel && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-lg border ${
                              getVisibilityConfig(accessLevel).bgColor
                            } ${getVisibilityConfig(accessLevel).borderColor}`}
                          >
                            {(() => {
                              const Icon =
                                getVisibilityConfig(accessLevel).icon;
                              return (
                                <Icon
                                  className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${
                                    getVisibilityConfig(accessLevel).iconColor
                                  }`}
                                />
                              );
                            })()}
                            <span
                              className={`text-xs sm:text-sm font-medium ${
                                getVisibilityConfig(accessLevel).textColor
                              }`}
                            >
                              <FormattedMessage
                                id={`profile.visibility.${accessLevel}`}
                              />
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <FormattedMessage
                            id={`profile.visibility.${accessLevel}Tooltip`}
                          />
                        </TooltipContent>
                      </Tooltip>
                    )}
                    <div className='hidden xs:flex items-center gap-2 text-xs sm:text-sm text-gray-500'>
                      <Calendar className='w-3 xs:w-4 h-3 xs:h-4 text-gray-400' />
                      <span>
                        <FormattedMessage id='profile.lastUpdated' />:{' '}
                        <span className='font-medium'>
                          {updatedAt
                            ? formatDateWithOrdinal(updatedAt)
                            : formatDateWithOrdinal(new Date())}
                        </span>
                      </span>
                    </div>
                    <div className='xs:hidden flex items-center gap-2 text-xs text-gray-500'>
                      <Calendar className='w-3 h-3 text-gray-400' />
                      <span>
                        <FormattedMessage id='profile.updated' />{' '}
                        <span className='font-medium'>
                          {updatedAt
                            ? formatDateWithOrdinal(updatedAt)
                            : formatDateWithOrdinal(new Date())}
                        </span>
                      </span>
                    </div>
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
