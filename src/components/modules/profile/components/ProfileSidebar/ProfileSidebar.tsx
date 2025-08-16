import {
  Mail,
  Phone,
  Linkedin,
  Globe,
  User,
  Wifi,
  Calendar,
  MapPin,
  Clock,
  Star,
  TrendingUp,
  Zap,
  Shield,
  Users,
  Eye,
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
          text: 'Available for Opportunities',
          bgColor: 'from-emerald-50/80 to-emerald-100/80',
          borderColor: 'border-emerald-200/60',
          textColor: 'text-emerald-800',
          statusColor: 'text-emerald-600',
          dotColor: 'bg-emerald-500',
          icon: <TrendingUp className='w-5 h-5' />,
        };
      case 'open':
        return {
          text: 'Open to New Roles',
          bgColor: 'from-blue-50/80 to-blue-100/80',
          borderColor: 'border-blue-200/60',
          textColor: 'text-blue-800',
          statusColor: 'text-blue-600',
          dotColor: 'bg-blue-500',
          icon: <Star className='w-5 h-5' />,
        };
      case 'unavailable':
        return {
          text: 'Currently Unavailable',
          bgColor: 'from-slate-50/80 to-slate-100/80',
          borderColor: 'border-slate-200/60',
          textColor: 'text-slate-800',
          statusColor: 'text-slate-600',
          dotColor: 'bg-slate-500',
          icon: <Clock className='w-5 h-5' />,
        };
      default:
        return {
          text: 'Available for Opportunities',
          bgColor: 'from-emerald-50/80 to-emerald-100/80',
          borderColor: 'border-emerald-200/60',
          textColor: 'text-emerald-800',
          statusColor: 'text-emerald-600',
          dotColor: 'bg-emerald-500',
          icon: <TrendingUp className='w-5 h-5' />,
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
    <aside className='w-full xl:w-96 px-4 sm:px-6 lg:px-8 xl:px-0 xl:pr-8 py-6 lg:py-8 xl:sticky xl:top-8 xl:h-fit space-y-6'>
      {/* Status Section */}
      <div
        className={`bg-gradient-to-br ${availabilityConfig.bgColor} backdrop-blur-sm rounded-2xl p-6 border ${availabilityConfig.borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}
      >
        <div className='text-center space-y-4'>
          <div className='flex items-center justify-center mb-3'>
            <div
              className={`w-14 h-14 ${availabilityConfig.bgColor} rounded-xl flex items-center justify-center shadow-lg border ${availabilityConfig.borderColor}`}
            >
              <div className={`text-2xl ${availabilityConfig.statusColor}`}>
                {availabilityConfig.icon}
              </div>
            </div>
          </div>
          <div
            className={`text-xl font-bold ${availabilityConfig.textColor} mb-2 flex items-center justify-center`}
          >
            <div
              className={`w-3 h-3 ${availabilityConfig.dotColor} rounded-full mr-3`}
            ></div>
            <span className='tracking-tight'>{availabilityConfig.text}</span>
          </div>
          <p className={`text-sm ${availabilityConfig.textColor} opacity-80`}>
            Ready to connect and explore new opportunities
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90'>
        {/* Header */}
        <div className='flex items-center space-x-3 pb-4 border-b border-gray-200/50 mb-6'>
          <div className='w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg'>
            <User className='w-6 h-6 text-white' />
          </div>
          <h2 className='text-xl font-bold text-gray-800 tracking-tight'>
            Contact Information
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
      </div>

      {/* Quick Actions */}
      <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90'>
        <h3 className='text-lg font-bold text-gray-800 mb-6 flex items-center space-x-3'>
          <div className='w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg'>
            <Wifi className='w-5 h-5 text-white' />
          </div>
          <span>Quick Actions</span>
        </h3>

        <div className='space-y-4'>
          <button className='w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-semibold px-4 py-4 rounded-2xl border-0 transition-all duration-300 active:scale-98 shadow-lg hover:shadow-xl cursor-pointer'>
            <span className='flex items-center justify-center gap-3'>
              <svg
                className='w-5 h-5'
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

          <button className='w-full bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-4 rounded-2xl border border-gray-300/60 hover:border-gray-400/60 transition-all duration-300 active:scale-98 shadow-lg hover:shadow-xl cursor-pointer'>
            <span className='flex items-center justify-center gap-3'>
              <svg
                className='w-5 h-5'
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

          <button className='w-full bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-gray-700 text-sm font-semibold px-4 py-4 rounded-2xl border border-slate-300/60 hover:border-slate-400/60 transition-all duration-300 active:scale-98 shadow-lg hover:shadow-xl cursor-pointer'>
            <span className='flex items-center justify-center gap-3'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                />
              </svg>
              View QR Code
            </span>
          </button>
        </div>
      </div>

      {/* Professional Stats Section */}
      <div className='bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-indigo-50/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300'>
        <h3 className='text-lg font-bold text-gray-800 mb-6 flex items-center space-x-3'>
          <div className='w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg'>
            <TrendingUp className='w-5 h-5 text-white' />
          </div>
          <span>Professional Stats</span>
        </h3>

        <div className='space-y-4'>
          <div className='flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 hover:border-emerald-200/60 transition-all duration-300'>
            <span className='text-sm text-gray-600 flex items-center gap-2'>
              <Users className='w-4 h-4 text-emerald-500' />
              Connections
            </span>
            <span className='text-lg font-bold text-gray-800'>89</span>
          </div>
          <div className='flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 hover:border-purple-200/60 transition-all duration-300'>
            <span className='text-sm text-gray-600 flex items-center gap-2'>
              <Zap className='w-4 h-4 text-purple-500' />
              Response Rate
            </span>
            <span className='text-lg font-bold text-emerald-600'>98%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
