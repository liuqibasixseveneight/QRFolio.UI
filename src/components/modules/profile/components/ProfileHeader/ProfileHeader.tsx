import { Download, Share2, QrCode, Eye, TrendingUp, Star } from 'lucide-react';
import { useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import type { ProfileHeaderProps } from './types';

const ProfileHeader = ({
  fullName,
  summary,
  email,
  phone,
  linkedin,
  portfolio,
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
    <header className='relative w-full bg-gradient-to-r from-slate-50/95 via-white to-blue-50/95 backdrop-blur-sm border-b border-slate-200/40 shadow-lg overflow-hidden'>
      {/* Simplified background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-slate-100/30 to-blue-100/30 rounded-full blur-3xl'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 py-16 sm:py-20 lg:py-24'>
        <div className='max-w-7xl mx-auto'>
          {/* Professional Badge */}
          <div className='inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl text-blue-700 text-sm font-semibold mb-8 shadow-lg'>
            <div className='w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full'></div>
            <span className='tracking-wide'>Professional Profile</span>
          </div>

          {/* Name */}
          <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-slate-900 mb-6 sm:mb-8 leading-tight'>
            {fullName}
          </h1>

          {/* Summary */}
          {summary && (
            <div className='max-w-4xl mb-8 sm:mb-12'>
              <p className='text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed font-light'>
                {summary}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 sm:mb-12'>
            <button
              data-download-cv
              onClick={handleDownloadCV}
              className='group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 active:scale-98 shadow-lg hover:shadow-xl border border-blue-500/20 hover:border-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
            >
              <span className='flex items-center gap-3'>
                <Download className='w-6 h-6' />
                <span>Download CV</span>
              </span>
            </button>

            <button
              data-share-profile
              onClick={handleShareProfile}
              className='group bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 active:scale-98 border border-slate-200/60 hover:border-slate-300/60 shadow-lg hover:shadow-xl cursor-pointer'
            >
              <span className='flex items-center gap-3'>
                <Share2 className='w-6 h-6' />
                <span>Share Profile</span>
              </span>
            </button>

            <button
              onClick={handleViewQRCode}
              className='group bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 active:scale-98 border border-slate-300/60 hover:border-slate-400/60 shadow-lg hover:shadow-xl cursor-pointer'
            >
              <span className='flex items-center gap-3'>
                <QrCode className='w-6 h-6' />
                <span>QR Code</span>
              </span>
            </button>
          </div>

          {/* Stats Row */}
          <div className='flex flex-wrap items-center gap-8 text-sm text-slate-500 mb-8'>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full'></div>
              <span>Profile Views</span>
            </div>
            <div className='w-1 h-1 bg-gradient-to-r from-slate-300 to-slate-400 rounded-full'></div>
            <span>
              Last Updated:{' '}
              {updatedAt
                ? new Date(updatedAt).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </span>
            <div className='w-1 h-1 bg-gradient-to-r from-slate-300 to-slate-400 rounded-full'></div>
            <span>Professional Network</span>
          </div>

          {/* Decorative line */}
          <div className='w-40 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg'></div>
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
            {updatedAt
              ? new Date(updatedAt).toLocaleDateString()
              : new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
