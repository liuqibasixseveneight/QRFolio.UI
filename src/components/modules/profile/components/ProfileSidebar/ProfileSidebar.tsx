import {
  Mail,
  Phone,
  Linkedin,
  Globe,
  User,
  Wifi,
  Calendar,
} from 'lucide-react';
import { ContactItem } from '@/components/ui';
import type { ProfileSidebarProps } from './types';

const ProfileSidebar = ({
  email,
  phone,
  linkedin,
  portfolio,
  availability,
}: ProfileSidebarProps) => {
  const getAvailabilityConfig = (status?: string) => {
    switch (status) {
      case 'available':
        return {
          text: 'Available',
          bgColor: 'from-emerald-50 to-emerald-100',
          borderColor: 'border-emerald-200',
          textColor: 'text-emerald-800',
          statusColor: 'text-emerald-600',
          dotColor: 'bg-emerald-500',
        };
      case 'open':
        return {
          text: 'Open',
          bgColor: 'from-blue-50 to-blue-100',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          statusColor: 'text-blue-600',
          dotColor: 'bg-blue-500',
        };
      case 'unavailable':
        return {
          text: 'Unavailable',
          bgColor: 'from-slate-50 to-slate-100',
          borderColor: 'border-slate-200',
          textColor: 'text-slate-800',
          statusColor: 'text-slate-600',
          dotColor: 'bg-slate-500',
        };
      default:
        return {
          text: 'Available',
          bgColor: 'from-emerald-50 to-emerald-100',
          borderColor: 'border-emerald-200',
          textColor: 'text-emerald-800',
          statusColor: 'text-emerald-600',
          dotColor: 'bg-emerald-500',
        };
    }
  };

  const displayAvailability = availability || 'available';
  const availabilityConfig = getAvailabilityConfig(availability);

  // Helper function to format phone display
  const formatPhoneDisplay = (phoneData: any) => {
    if (typeof phoneData === 'string') {
      // Legacy phone format - just return as is
      return phoneData;
    }

    if (phoneData && phoneData.number) {
      // New phone format - show country and dial code with number
      const countryInfo =
        phoneData.countryCode && phoneData.dialCode
          ? `${phoneData.countryCode} ${phoneData.dialCode}`
          : '';
      return countryInfo
        ? `${countryInfo} • ${phoneData.number}`
        : phoneData.number;
    }

    return phoneData;
  };

  // Helper function to render phone with styled region
  const renderPhoneWithRegion = (phoneData: any) => {
    if (typeof phoneData === 'string') {
      return phoneData;
    }

    if (phoneData && phoneData.number) {
      const countryInfo =
        phoneData.countryCode && phoneData.dialCode
          ? `${phoneData.countryCode} ${phoneData.dialCode}`
          : '';

      if (countryInfo) {
        return (
          <span className='flex items-center gap-2'>
            <span className='text-sm text-gray-500 font-medium tracking-wide'>
              {countryInfo}
            </span>
            <span className='text-sm'>{phoneData.number}</span>
          </span>
        );
      }
      return phoneData.number;
    }

    return phoneData;
  };

  return (
    <aside className='w-full xl:w-80 px-4 sm:px-6 lg:px-8 xl:px-0 xl:pr-8 py-6 lg:py-8 xl:sticky xl:top-8 xl:h-fit'>
      {/* Status Section */}
      <div
        className={`bg-gradient-to-br ${availabilityConfig.bgColor} backdrop-blur-sm rounded-2xl p-6 border ${availabilityConfig.borderColor} shadow-lg`}
      >
        <div className='text-center space-y-4'>
          <div
            className={`text-2xl font-bold ${availabilityConfig.textColor} mb-2 flex items-center justify-center`}
          >
            <div
              className={`w-3 h-3 ${availabilityConfig.dotColor} rounded-full mr-3`}
            ></div>
            <span className='tracking-tight'>{availabilityConfig.text}</span>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className='mt-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg space-y-6'>
        {/* Header */}
        <div className='flex items-center space-x-3 pb-4 border-b border-gray-200/50'>
          <div className='w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md'>
            <User className='w-4 h-4 text-white' />
          </div>
          <h2 className='text-xl font-bold text-gray-800 tracking-tight'>
            Contact
          </h2>
        </div>

        {/* Contact Items */}
        <div className='space-y-4'>
          {email && (
            <ContactItem
              icon={<Mail />}
              label='Email'
              value={email}
              href={`mailto:${email}`}
            />
          )}
          {phone && (
            <ContactItem
              icon={<Phone />}
              label='Phone'
              value={renderPhoneWithRegion(phone)}
            />
          )}
          {linkedin && (
            <ContactItem
              icon={<Linkedin />}
              label='LinkedIn'
              value={linkedin}
              href={linkedin}
            />
          )}
          {portfolio && (
            <ContactItem
              icon={<Globe />}
              label='Portfolio'
              value={portfolio}
              href={portfolio}
            />
          )}
        </div>

        {/* Decorative element */}
        <div className='pt-4 border-t border-gray-200/50'>
          <div className='flex items-center justify-center space-x-2'>
            <div className='w-2 h-2 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full'></div>
            <div className='w-2 h-2 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full'></div>
            <div className='w-2 h-2 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full'></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='mt-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg'>
        <h3 className='text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2'>
          <div className='w-6 h-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md'>
            <Wifi className='w-3 h-3 text-white' />
          </div>
          <span>Quick Actions</span>
        </h3>

        <div className='space-y-3'>
          <button className='w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-semibold px-4 py-3 rounded-xl border-0 transition-all duration-200 active:scale-[0.98] shadow-md hover:shadow-lg'>
            <span className='flex items-center justify-center gap-2'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
              Download Resume
            </span>
          </button>

          <button className='w-full bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-3 rounded-xl border border-gray-300/50 hover:border-gray-400/50 transition-all duration-200 active:scale-[0.98] shadow-md hover:shadow-lg'>
            <span className='flex items-center justify-center gap-2'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z'
                />
              </svg>
              Share Profile
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
