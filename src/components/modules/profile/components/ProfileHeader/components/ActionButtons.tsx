import { Download, Share2, QrCode } from 'lucide-react';

import type { ProfileHeaderProps } from '../types';
import { handleDownloadPDF } from './PDFGenerator';

type ActionButtonsProps = {
  profileData: ProfileHeaderProps;
  onViewQRCode: () => void;
};

/**
 * Displays action buttons for profile interactions
 */
export const ActionButtons = ({
  profileData,
  onViewQRCode,
}: ActionButtonsProps) => {
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

  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12'>
      <button
        data-download-resume
        onClick={() => handleDownloadPDF(profileData)}
        className='bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-lg font-medium text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
      >
        <span className='flex items-center gap-3'>
          <Download className='w-6 h-6' />
          <span>Download Resume</span>
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
        onClick={onViewQRCode}
        className='bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-medium text-lg transition-all duration-300 cursor-pointer'
      >
        <span className='flex items-center gap-3'>
          <QrCode className='w-6 h-6' />
          <span>QR Code</span>
        </span>
      </button>
    </div>
  );
};
