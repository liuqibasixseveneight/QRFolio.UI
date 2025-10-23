import {
  Mail,
  Phone,
  Linkedin,
  Globe,
  User,
  Wifi,
  Clock,
  Star,
  TrendingUp,
  Zap,
  Users,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ContactItem } from '@/components/ui';
import type { ProfileSidebarProps } from './types';

const ProfileSidebar = ({
  email,
  phone,
  linkedin,
  portfolio,
  availability,
  showEmail = true,
  showPhone = true,
  showLinkedIn = true,
  showPortfolio = true,
}: ProfileSidebarProps) => {
  const getAvailabilityConfig = (status?: string) => {
    switch (status) {
      case 'available':
        return {
          text: 'Actively looking',
          bgColor: 'from-emerald-50/90 to-emerald-100/90',
          borderColor: 'border-emerald-200/60',
          textColor: 'text-emerald-800',
          statusColor: 'text-emerald-600',
          dotColor: 'bg-emerald-500',
          icon: <TrendingUp className='w-6 h-6' />,
        };
      case 'open':
        return {
          text: 'Casually looking',
          bgColor: 'from-blue-50/90 to-blue-100/90',
          borderColor: 'border-blue-200/60',
          textColor: 'text-blue-800',
          statusColor: 'text-blue-600',
          dotColor: 'bg-blue-500',
          icon: <Star className='w-6 h-6' />,
        };
      case 'unavailable':
        return {
          text: 'Not looking',
          bgColor: 'from-slate-50/90 to-slate-100/90',
          borderColor: 'border-slate-200/60',
          textColor: 'text-slate-800',
          statusColor: 'text-slate-600',
          dotColor: 'bg-slate-500',
          icon: <Clock className='w-6 h-6' />,
        };
      default:
        return {
          text: 'Actively looking',
          bgColor: 'from-emerald-50/90 to-emerald-100/90',
          borderColor: 'border-emerald-200/60',
          textColor: 'text-emerald-800',
          statusColor: 'text-emerald-600',
          dotColor: 'bg-emerald-500',
          icon: <TrendingUp className='w-6 h-6' />,
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
    <aside className='w-full xl:w-80 px-4 sm:px-6 lg:px-8 xl:px-0 xl:pr-8 py-6 lg:py-8 xl:sticky xl:top-8 xl:h-fit space-y-8'>
      <div
        className={`bg-gradient-to-br ${availabilityConfig.bgColor} backdrop-blur-sm rounded-3xl p-8 border ${availabilityConfig.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300`}
      >
        <div className='text-center space-y-6'>
          <div className='flex items-center justify-center mb-4'>
            <div
              className={`w-16 h-16 ${availabilityConfig.bgColor} rounded-2xl flex items-center justify-center shadow-xl border ${availabilityConfig.borderColor}`}
            >
              <div className={`text-2xl ${availabilityConfig.statusColor}`}>
                {availabilityConfig.icon}
              </div>
            </div>
          </div>
          <div
            className={`text-xl font-bold ${availabilityConfig.textColor} mb-3 flex items-center justify-center`}
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

      <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white'>
        <div className='flex items-center space-x-4 pb-6 border-b border-gray-200/50 mb-8'>
          <div className='w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl'>
            <User className='w-7 h-7 text-white' />
          </div>
          <h2 className='text-xl font-bold text-gray-800 tracking-tight'>
            Contact Information
          </h2>
        </div>

        <div className='space-y-5'>
          {email && showEmail && (
            <ContactItem
              icon={<Mail />}
              label='Email'
              value={email}
              href={`mailto:${email}`}
            />
          )}
          {phone && showPhone && (
            <ContactItem
              icon={<Phone />}
              label='Phone'
              value={renderPhoneWithRegion(phone)}
            />
          )}
          {linkedin && showLinkedIn && (
            <ContactItem
              icon={<Linkedin />}
              label='LinkedIn'
              value={linkedin}
              href={linkedin}
            />
          )}
          {portfolio && showPortfolio && (
            <ContactItem
              icon={<Globe />}
              label='Portfolio'
              value={portfolio}
              href={portfolio}
            />
          )}
        </div>
      </div>

      <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white'>
        <h3 className='text-lg font-bold text-gray-800 mb-8 flex items-center space-x-4'>
          <div className='w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl'>
            <Wifi className='w-6 h-6 text-white' />
          </div>
          <span>Quick Actions</span>
        </h3>

        <div className='space-y-4'>
          <button className='w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-semibold px-6 py-4 rounded-2xl border-0 transition-all duration-300 active:scale-98 shadow-xl hover:shadow-2xl cursor-pointer group'>
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
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
            </span>
          </button>

          <button className='w-full bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-6 py-4 rounded-2xl border border-gray-300/60 hover:border-gray-400/60 transition-all duration-300 active:scale-98 shadow-xl hover:shadow-2xl cursor-pointer group'>
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
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
            </span>
          </button>

          <button className='w-full bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-gray-700 text-sm font-semibold px-6 py-4 rounded-2xl border border-slate-300/60 hover:border-slate-400/60 transition-all duration-300 active:scale-98 shadow-xl hover:shadow-2xl cursor-pointer group'>
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
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
            </span>
          </button>
        </div>
      </div>

      <div className='bg-gradient-to-br from-slate-50/90 via-blue-50/70 to-indigo-50/90 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/60 shadow-xl hover:shadow-2xl transition-all duration-300'>
        <h3 className='text-lg font-bold text-gray-800 mb-8 flex items-center space-x-4'>
          <div className='w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl'>
            <TrendingUp className='w-6 h-6 text-white' />
          </div>
          <span>Professional Stats</span>
        </h3>

        <div className='space-y-5'>
          <div className='flex items-center justify-between p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 hover:border-emerald-200/60 transition-all duration-300'>
            <span className='text-sm text-gray-600 flex items-center gap-3'>
              <Users className='w-5 h-5 text-emerald-500' />
              Connections
            </span>
            <span className='text-lg font-bold text-gray-800'>89</span>
          </div>
          <div className='flex items-center justify-between p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 hover:border-purple-200/60 transition-all duration-300'>
            <span className='text-sm text-gray-600 flex items-center gap-3'>
              <Zap className='w-5 h-5 text-purple-500' />
              Response Rate
            </span>
            <span className='text-lg font-bold text-emerald-600'>98%</span>
          </div>
        </div>
      </div>

      <div className='bg-gradient-to-br from-purple-50/90 via-pink-50/70 to-rose-50/90 backdrop-blur-sm rounded-3xl p-8 border border-purple-200/60 shadow-xl hover:shadow-2xl transition-all duration-300'>
        <h3 className='text-lg font-bold text-gray-800 mb-8 flex items-center space-x-4'>
          <div className='w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl'>
            <Sparkles className='w-6 h-6 text-white' />
          </div>
          <span>Profile Insights</span>
        </h3>

        <div className='space-y-4'>
          <div className='text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60'>
            <div className='text-2xl font-bold text-purple-600 mb-2'>24</div>
            <div className='text-sm text-gray-600'>Profile Views</div>
          </div>
          <div className='text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60'>
            <div className='text-2xl font-bold text-pink-600 mb-2'>12</div>
            <div className='text-sm text-gray-600'>Downloads</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
