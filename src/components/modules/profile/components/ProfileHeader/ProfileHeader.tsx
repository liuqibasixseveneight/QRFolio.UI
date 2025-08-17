import { useRef } from 'react';
import {
  Download,
  Share2,
  QrCode,
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Globe,
} from 'lucide-react';
import * as htmlToImage from 'html-to-image';

import { AvailabilityBadge, ProfileHeaderBadge } from '@/components/ui';
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
  const profileRef = useRef<HTMLDivElement>(null);

  // Helper function to format phone display
  const formatPhoneDisplay = (phoneData: any) => {
    if (typeof phoneData === 'string') {
      return phoneData;
    }
    if (phoneData && phoneData.number) {
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

  // Helper function to format date in day/month/year format
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDownloadCV = async () => {
    if (!profileRef.current) return;

    try {
      // Show loading state
      const button = document.querySelector(
        '[data-download-cv]'
      ) as HTMLButtonElement;
      if (button) {
        button.disabled = true;
        button.innerHTML = `
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          <span>Generating...</span>
        `;
      }

      // Generate the image
      const dataUrl = await htmlToImage.toPng(profileRef.current, {
        cacheBust: true,
        quality: 1.0,
        backgroundColor: '#ffffff',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `${fullName?.replace(/\s+/g, '_')}_Resume.png`;
      link.href = dataUrl;
      link.click();

      // Reset button state
      if (button) {
        button.disabled = false;
        button.innerHTML = `
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span>Download CV</span>
        `;
      }
    } catch (error) {
      console.error('Failed to generate resume:', error);

      // Reset button state on error
      const button = document.querySelector(
        '[data-download-cv]'
      ) as HTMLButtonElement;
      if (button) {
        button.disabled = false;
        button.innerHTML = `
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span>Download CV</span>
        `;
      }

      alert('Failed to generate resume. Please try again.');
    }
  };

  const handleShareProfile = async () => {
    try {
      const profileUrl = window.location.href;
      await navigator.clipboard.writeText(profileUrl);

      // Show success feedback
      const button = document.querySelector(
        '[data-share-profile]'
      ) as HTMLButtonElement;
      if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = `
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Copied!</span>
        `;

        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to copy profile link:', error);
      alert('Failed to copy profile link. Please try again.');
    }
  };

  const handleViewQRCode = () => {
    // Navigate to QR code view or open modal
    const profileUrl = window.location.href;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      profileUrl
    )}`;

    // Open QR code in new tab
    window.open(qrCodeUrl, '_blank');
  };

  return (
    <div className='w-full bg-white border-b border-gray-100 shadow-sm'>
      {/* Content container with proper width constraints */}
      <div className='w-full px-6 sm:px-8 lg:px-12'>
        <div className='max-w-6xl mx-auto w-full'>
          <header className='relative w-full'>
            {/* Content */}
            <div className='px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32'>
              <div className='w-full'>
                {/* Availability Badge */}
                <AvailabilityBadge
                  availability={availability}
                  className='mb-10'
                />

                {/* Name */}
                <h1 className='text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-gray-900 mb-8 sm:mb-10 leading-tight'>
                  {fullName}
                </h1>

                {/* Summary */}
                {summary && (
                  <div className='max-w-4xl mb-12 sm:mb-16'>
                    <p className='text-xl sm:text-2xl lg:text-3xl text-gray-600 leading-relaxed font-light'>
                      {summary}
                    </p>
                  </div>
                )}

                {/* Contact Information Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12'>
                  {email && (
                    <ProfileHeaderBadge
                      icon={Mail}
                      label={email}
                      type='email'
                      href={email}
                    />
                  )}
                  {phone && (
                    <ProfileHeaderBadge
                      icon={Phone}
                      label={formatPhoneDisplay(phone)}
                      type='phone'
                    />
                  )}
                  {linkedin && (
                    <ProfileHeaderBadge
                      icon={Linkedin}
                      label='LinkedIn'
                      type='linkedin'
                      href={linkedin}
                    />
                  )}
                  {portfolio && (
                    <ProfileHeaderBadge
                      icon={Globe}
                      label='Portfolio'
                      type='link'
                      href={portfolio}
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12'>
                  <button
                    data-download-cv
                    onClick={handleDownloadCV}
                    className='bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                  >
                    <span className='flex items-center gap-3'>
                      <Download className='w-6 h-6' />
                      <span>Download CV</span>
                    </span>
                  </button>

                  <button
                    data-share-profile
                    onClick={handleShareProfile}
                    className='bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 cursor-pointer'
                  >
                    <span className='flex items-center gap-3'>
                      <Share2 className='w-6 h-6' />
                      <span>Share Profile</span>
                    </span>
                  </button>

                  <button
                    onClick={handleViewQRCode}
                    className='bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 cursor-pointer'
                  >
                    <span className='flex items-center gap-3'>
                      <QrCode className='w-6 h-6' />
                      <span>QR Code</span>
                    </span>
                  </button>
                </div>

                {/* Stats Row */}
                <div className='flex flex-wrap items-center gap-8 text-sm text-gray-500 mb-8'>
                  <span className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    Last Updated:{' '}
                    {updatedAt ? formatDate(updatedAt) : formatDate(new Date())}
                  </span>
                </div>

                {/* Decorative line */}
                <div className='w-32 h-px bg-gray-300'></div>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Hidden div for resume generation - contains the profile content */}
      <div
        ref={profileRef}
        className='absolute -left-[9999px] w-[800px] bg-white p-8 text-black'
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        {/* Resume Header */}
        <div className='text-center mb-8 border-b-2 border-gray-300 pb-6'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>{fullName}</h1>
          {summary && (
            <p className='text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto'>
              {summary}
            </p>
          )}
        </div>

        {/* Contact Information */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2'>
            Contact Information
          </h2>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            {email && (
              <div>
                <strong>Email:</strong> {email}
              </div>
            )}
            {phone && (
              <div>
                <strong>Phone:</strong> {formatPhoneDisplay(phone)}
              </div>
            )}
            {linkedin && (
              <div>
                <strong>LinkedIn:</strong> {linkedin}
              </div>
            )}
            {portfolio && (
              <div>
                <strong>Portfolio:</strong> {portfolio}
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {summary && (
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2'>
              Professional Summary
            </h2>
            <p className='text-gray-700 leading-relaxed'>{summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience && workExperience.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2'>
              Work Experience
            </h2>
            <div className='space-y-4'>
              {workExperience.map((exp, index) => (
                <div key={index} className='border-l-4 border-blue-500 pl-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {exp?.jobTitle || '[Job Title]'}
                  </h3>
                  <p className='text-gray-600'>
                    {exp?.companyName || '[Company Name]'}
                    {exp?.location && ` • ${exp.location}`}
                    {exp?.dateFrom &&
                      exp?.dateTo &&
                      ` • ${exp.dateFrom} - ${exp.dateTo}`}
                  </p>
                  {exp?.responsibilities && (
                    <p className='text-gray-700 mt-2'>{exp.responsibilities}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2'>
              Education
            </h2>
            <div className='space-y-4'>
              {education.map((edu, index) => (
                <div key={index} className='border-l-4 border-emerald-500 pl-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {edu?.degree || '[Degree]'} in{' '}
                    {edu?.fieldOfStudy || '[Field of Study]'}
                  </h3>
                  <p className='text-gray-600'>
                    {edu?.schoolName || '[School Name]'}
                    {edu?.dateFrom &&
                      edu?.dateTo &&
                      ` • ${edu.dateFrom} - ${edu.dateTo}`}
                  </p>
                  {edu?.description && (
                    <p className='text-gray-700 mt-2'>{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2'>
              Languages
            </h2>
            <div className='space-y-4'>
              {languages.map((lang, index) => (
                <div key={index} className='border-l-4 border-purple-500 pl-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {lang?.language || '[Language]'}
                  </h3>
                  <p className='text-gray-600'>
                    {lang?.fluencyLevel || '[Fluency Level]'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className='text-center text-sm text-gray-500 border-t border-gray-300 pt-4'>
          <p>Generated by LYTN - Professional Resume Builder</p>
          <p>
            Last Updated:{' '}
            {updatedAt ? formatDate(updatedAt) : formatDate(new Date())}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
