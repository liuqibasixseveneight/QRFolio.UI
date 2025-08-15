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
          bgColor: 'from-green-50 to-green-100',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          statusColor: 'text-green-600',
          dotColor: 'bg-green-500',
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
          bgColor: 'from-gray-50 to-gray-100',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          statusColor: 'text-gray-600',
          dotColor: 'bg-gray-500',
        };
      default:
        return {
          text: 'Available',
          bgColor: 'from-green-50 to-green-100',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          statusColor: 'text-green-600',
          dotColor: 'bg-green-500',
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

    if (phoneData && phoneData.dialCode && phoneData.number) {
      // New phone format with country info
      return `${phoneData.flag} ${phoneData.dialCode} ${phoneData.number}`;
    }

    return phoneData;
  };

  return (
    <aside className='w-full xl:w-80 px-4 sm:px-6 lg:px-8 xl:px-0 xl:pr-8 py-8 xl:py-12 xl:sticky xl:top-8 xl:h-fit'>
      {/* Status Section - Moved above Contact */}
      <div
        className={`bg-gradient-to-br ${availabilityConfig.bgColor} backdrop-blur-sm rounded-2xl p-6 border ${availabilityConfig.borderColor} shadow-sm hover:shadow-md transition-all duration-300`}
      >
        <div className='text-center space-y-4'>
          <div
            className={`text-2xl font-bold ${availabilityConfig.textColor} mb-2 flex items-center justify-center`}
          >
            <div
              className={`w-3 h-3 ${availabilityConfig.dotColor} rounded-full mr-2`}
            ></div>
            <span>{availabilityConfig.text}</span>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className='mt-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6 hover:shadow-md hover:border-gray-300 transition-all duration-300'>
        {/* Header */}
        <div className='flex items-center space-x-3 pb-4 border-b border-gray-200'>
          <div className='w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center'>
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
              value={formatPhoneDisplay(phone)}
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
        <div className='pt-4 border-t border-gray-200'>
          <div className='flex items-center justify-center space-x-2'>
            <div className='w-2 h-2 bg-gray-400 rounded-full'></div>
            <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
            <div className='w-2 h-2 bg-gray-200 rounded-full'></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='mt-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2'>
          <Wifi className='w-5 h-5 text-gray-600' />
          <span>Quick Actions</span>
        </h3>

        <div className='space-y-3'>
          <button className='w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white text-sm font-medium px-4 py-3 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 active:scale-[0.98] shadow-sm hover:shadow-gray-500/25 cursor-pointer'>
            Download Resume
          </button>

          <button className='w-full bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-3 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-300 active:scale-[0.98] shadow-sm cursor-pointer'>
            Share Profile
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
