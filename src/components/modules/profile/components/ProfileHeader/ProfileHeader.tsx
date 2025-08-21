import { useRef, useState } from 'react';
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
import html2pdf from 'html2pdf.js';

import {
  AvailabilityBadge,
  ProfileHeaderBadge,
  QRCodeModal,
} from '@/components/ui';
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
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

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
           <span class="flex items-center gap-3">
             <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
             <span>Generating...</span>
           </span>
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

      // Show success feedback
      if (button) {
        button.disabled = false;
        button.innerHTML = `
           <span class="flex items-center gap-3">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
             </svg>
             <span>Downloaded!</span>
           </span>
         `;

        // Reset to original state after 2 seconds
        setTimeout(() => {
          button.innerHTML = `
              <span class="flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>Download</span>
              </span>
            `;
        }, 2000);
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
           <span class="flex items-center gap-3">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
             </svg>
                              <span>Download</span>
           </span>
         `;
      }

      alert('Failed to generate resume. Please try again.');
    }
  };

  const handleDownloadProfilePDF = async () => {
    try {
      console.log('🔵 Starting PDF generation...');
      // Show loading state
      const button = document.querySelector(
        '[data-download-pdf]'
      ) as HTMLButtonElement;
      if (button) {
        button.disabled = true;
        button.innerHTML = `
           <span class="flex items-center gap-3">
             <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
             <span>Generating PDF...</span>
           </span>
         `;
      }

      // Get the entire profile page content (excluding navbar)
      // Try multiple selectors to find the profile content
      console.log('🔍 Looking for profile page element...');
      let profilePage = document.querySelector(
        '[data-profile-page]'
      ) as HTMLElement;
      console.log('🔍 Found with [data-profile-page]:', profilePage);

      if (!profilePage) {
        console.log('🔄 Fallback: Looking for main element...');
        // Fallback: try to find the main element or any container with profile content
        profilePage = document.querySelector('main') as HTMLElement;
        console.log('🔍 Found main element:', profilePage);
      }

      if (!profilePage) {
        console.error(
          '❌ Profile page element not found. Available elements:',
          document.querySelectorAll('[data-profile-page]')
        );
        console.error('❌ Main elements:', document.querySelectorAll('main'));
        console.error(
          '❌ All elements with data attributes:',
          document.querySelectorAll('[data-*]')
        );
        throw new Error(
          'Profile page content not found. Please ensure the page is fully loaded.'
        );
      }

      console.log('✅ Profile page element found:', profilePage);
      console.log(
        '📏 Element dimensions:',
        profilePage.offsetWidth,
        'x',
        profilePage.offsetHeight
      );

      // Ensure the element is visible and has content
      if (profilePage.offsetHeight === 0 || profilePage.offsetWidth === 0) {
        console.error(
          '❌ Profile page element has no dimensions:',
          profilePage.offsetHeight,
          profilePage.offsetWidth
        );
        throw new Error(
          'Profile page content is not properly rendered. Please try again.'
        );
      }

      // Longer delay to ensure page is fully rendered and all content is loaded
      console.log('⏳ Waiting for page to fully render...');
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Preprocess CSS to fix modern color functions that html2pdf can't handle
      console.log('🎨 Preprocessing CSS colors...');

      // Create a temporary clone of the profile page for PDF generation
      const profileClone = profilePage.cloneNode(true) as HTMLElement;

      // Add a style tag to override problematic colors with standard ones
      const styleOverride = document.createElement('style');
      styleOverride.textContent = `
        * {
          color: #000000 !important;
          background-color: #ffffff !important;
          border-color: #d1d5db !important;
        }
        .bg-gray-50 { background-color: #f9fafb !important; }
        .bg-gray-100 { background-color: #f3f4f6 !important; }
        .bg-gray-200 { background-color: #e5e7eb !important; }
        .bg-gray-300 { background-color: #d1d5db !important; }
        .bg-gray-400 { background-color: #9ca3af !important; }
        .bg-gray-500 { background-color: #6b7280 !important; }
        .bg-gray-600 { background-color: #4b5563 !important; }
        .bg-gray-700 { background-color: #374151 !important; }
        .bg-gray-800 { background-color: #1f2937 !important; }
        .bg-gray-900 { background-color: #111827 !important; }
        .text-gray-50 { color: #f9fafb !important; }
        .text-gray-100 { color: #f3f4f6 !important; }
        .text-gray-200 { color: #e5e7eb !important; }
        .text-gray-300 { color: #d1d5db !important; }
        .text-gray-400 { color: #9ca3af !important; }
        .text-gray-500 { color: #6b7280 !important; }
        .text-gray-600 { color: #4b5563 !important; }
        .text-gray-700 { color: #374151 !important; }
        .text-gray-800 { color: #1f2937 !important; }
        .text-gray-900 { color: #111827 !important; }
        .border-gray-200 { border-color: #e5e7eb !important; }
        .border-gray-300 { border-color: #d1d5db !important; }
        .border-gray-400 { border-color: #9ca3af !important; }
        .border-gray-500 { border-color: #6b7280 !important; }
        .border-gray-600 { border-color: #4b5563 !important; }
        .border-gray-700 { border-color: #374151 !important; }
        .border-gray-800 { border-color: #1f2937 !important; }
        .border-gray-900 { border-color: #111827 !important; }
        .bg-white { background-color: #ffffff !important; }
        .bg-black { background-color: #000000 !important; }
        .text-white { color: #ffffff !important; }
        .text-black { color: #000000 !important; }
        .bg-blue-500 { background-color: #3b82f6 !important; }
        .bg-blue-600 { background-color: #2563eb !important; }
        .bg-blue-700 { background-color: #1d4ed8 !important; }
        .text-blue-500 { color: #3b82f6 !important; }
        .text-blue-600 { color: #2563eb !important; }
        .text-blue-700 { color: #1d4ed8 !important; }
        .bg-green-500 { background-color: #10b981 !important; }
        .bg-green-600 { background-color: #059669 !important; }
        .text-green-500 { color: #10b981 !important; }
        .text-green-600 { color: #059669 !important; }
        .bg-red-500 { background-color: #ef4444 !important; }
        .bg-red-600 { background-color: #dc2626 !important; }
        .text-red-500 { color: #ef4444 !important; }
        .text-red-600 { color: #dc2626 !important; }
        .bg-yellow-500 { background-color: #f59e0b !important; }
        .bg-yellow-600 { background-color: #d97706 !important; }
        .text-yellow-500 { color: #f59e0b !important; }
        .text-yellow-600 { color: #d97706 !important; }
        .bg-purple-500 { background-color: #8b5cf6 !important; }
        .bg-purple-600 { background-color: #7c3aed !important; }
        .text-purple-500 { color: #8b5cf6 !important; }
        .text-purple-600 { color: #7c3aed !important; }
        .bg-indigo-500 { background-color: #6366f1 !important; }
        .bg-indigo-600 { background-color: #4f46e5 !important; }
        .text-indigo-500 { color: #6366f1 !important; }
        .text-indigo-600 { color: #4f46e5 !important; }
        .bg-pink-500 { background-color: #ec4899 !important; }
        .bg-pink-600 { background-color: #db2777 !important; }
        .text-pink-500 { color: #ec4899 !important; }
        .text-pink-600 { color: #db2777 !important; }
        .bg-teal-500 { background-color: #14b8a6 !important; }
        .bg-teal-600 { background-color: #0d9488 !important; }
        .text-teal-500 { color: #14b8a6 !important; }
        .text-teal-600 { color: #0d9488 !important; }
        .bg-orange-500 { background-color: #f97316 !important; }
        .bg-orange-600 { background-color: #ea580c !important; }
        .text-orange-500 { color: #f97316 !important; }
        .text-orange-600 { color: #ea580c !important; }
        .bg-cyan-500 { background-color: #06b6d4 !important; }
        .bg-cyan-600 { background-color: #0891b2 !important; }
        .text-cyan-500 { color: #06b6d4 !important; }
        .text-cyan-600 { color: #0891b2 !important; }
        .bg-emerald-500 { background-color: #10b981 !important; }
        .bg-emerald-600 { background-color: #059669 !important; }
        .text-emerald-500 { color: #10b981 !important; }
        .text-emerald-600 { color: #059669 !important; }
        .bg-rose-500 { background-color: #f43f5e !important; }
        .bg-rose-600 { background-color: #e11d48 !important; }
        .text-rose-500 { color: #f43f5e !important; }
        .text-rose-600 { color: #e11d48 !important; }
        .bg-slate-50 { background-color: #f8fafc !important; }
        .bg-slate-100 { background-color: #f1f5f9 !important; }
        .bg-slate-200 { background-color: #e2e8f0 !important; }
        .bg-slate-300 { background-color: #cbd5e1 !important; }
        .bg-slate-400 { background-color: #94a3b8 !important; }
        .bg-slate-500 { background-color: #64748b !important; }
        .bg-slate-600 { background-color: #475569 !important; }
        .bg-slate-700 { background-color: #334155 !important; }
        .bg-slate-800 { background-color: #1e293b !important; }
        .bg-slate-900 { background-color: #0f172a !important; }
        .text-slate-50 { color: #f8fafc !important; }
        .text-slate-100 { color: #f1f5f9 !important; }
        .text-slate-200 { color: #e2e8f0 !important; }
        .text-slate-300 { color: #cbd5e1 !important; }
        .text-slate-400 { color: #94a3b8 !important; }
        .text-slate-500 { color: #64748b !important; }
        .text-slate-600 { color: #64748b !important; }
        .text-slate-700 { color: #334155 !important; }
        .text-slate-800 { color: #1e293b !important; }
        .text-slate-900 { color: #0f172a !important; }
        .border-slate-200 { border-color: #e2e8f0 !important; }
        .border-slate-300 { border-color: #cbd5e1 !important; }
        .border-slate-400 { border-color: #94a3b8 !important; }
        .border-slate-500 { border-color: #64748b !important; }
        .border-slate-600 { border-color: #475569 !important; }
        .border-slate-700 { border-color: #334155 !important; }
        .border-slate-800 { border-color: #1e293b !important; }
        .border-slate-900 { border-color: #0f172a !important; }
      `;

      // Append the style override to the clone
      profileClone.appendChild(styleOverride);

      console.log('✅ CSS preprocessing complete');

      // Configure PDF options
      const pdfOptions = {
        margin: [10, 10, 10, 10],
        filename: `${fullName?.replace(/\s+/g, '_')}_Profile.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
      };

      // Generate PDF using the preprocessed clone
      console.log('📄 Generating PDF with options:', pdfOptions);
      console.log(
        '📄 Using preprocessed element:',
        profileClone.tagName,
        profileClone.classList
      );
      await html2pdf().from(profileClone).set(pdfOptions).save();
      console.log('✅ PDF generated successfully!');

      // Show success feedback
      if (button) {
        button.disabled = false;
        button.innerHTML = `
           <span class="flex items-center gap-3">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
             </svg>
             <span>Downloaded!</span>
           </span>
         `;

        // Reset to original state after 2 seconds
        setTimeout(() => {
          button.innerHTML = `
             <span class="flex items-center gap-3">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
               </svg>
               <span>Download PDF</span>
             </span>
           `;
        }, 2000);
      }
    } catch (error) {
      console.error('❌ Failed to generate PDF:', error);
      console.error('❌ Error details:', error);

      // Reset button state on error
      const button = document.querySelector(
        '[data-download-pdf]'
      ) as HTMLButtonElement;
      if (button) {
        button.disabled = false;
        button.innerHTML = `
           <span class="flex items-center gap-3">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.293.707V19a2 2 0 01-2 2z"></span>
             </svg>
             <span>Download PDF</span>
           </span>
         `;
      }

      alert('Failed to generate PDF. Please try again.');
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
          <span class="flex items-center gap-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Copied!</span>
          </span>
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
    setIsQRModalOpen(true);
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
                      label={portfolio}
                      type='link'
                      href={portfolio}
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12'>
                  <button
                    data-download-pdf
                    onClick={handleDownloadProfilePDF}
                    className='bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-lg font-medium text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                  >
                    <span className='flex items-center gap-3'>
                      <Download className='w-6 h-6' />
                      <span>Download PDF</span>
                    </span>
                  </button>

                  <button
                    data-share-profile
                    onClick={handleShareProfile}
                    className='bg-white hover:bg-gray-50 text-gray-700 px-6 py-4 rounded-lg font-medium text-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 cursor-pointer whitespace-nowrap'
                  >
                    <span className='flex items-center gap-3'>
                      <Share2 className='w-6 h-6' />
                      <span>Share Profile</span>
                    </span>
                  </button>

                  <button
                    onClick={handleViewQRCode}
                    className='bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-medium text-lg transition-all duration-300 cursor-pointer'
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

      {/* QR Code Modal */}
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
