import { useState } from 'react';
import { Download, Share2, QrCode, Check, Loader2 } from 'lucide-react';

import type { ProfileHeaderProps } from '../types';
import { generatePDF } from './PDFGenerator';
import { useToast } from '@/components/ui/molecules/Toast/use-toast';

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
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      await generatePDF(profileData);
      setDownloadSuccess(true);
      toast({
        title: 'PDF Downloaded Successfully! 📄',
        description: 'Your resume has been saved as a PDF.',
        variant: 'success',
      });
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: 'PDF Download Failed',
        description: `Failed to generate PDF: ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareProfile = async () => {
    setIsSharing(true);
    try {
      const profileUrl = window.location.href;
      await navigator.clipboard.writeText(profileUrl);

      setShareSuccess(true);
      toast({
        title: 'Profile Link Copied',
        description: 'Profile link has been copied to clipboard.',
        variant: 'success',
      });
      setTimeout(() => {
        setShareSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy profile link:', error);
      toast({
        title: 'Copy Failed',
        description: 'Failed to copy profile link. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12'>
      <button
        data-download-resume
        onClick={handleDownloadPDF}
        disabled={isDownloading || downloadSuccess}
        className='bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-lg font-medium text-lg transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'
      >
        <span className='flex items-center gap-3'>
          {isDownloading ? (
            <Loader2 className='w-6 h-6 animate-spin' />
          ) : downloadSuccess ? (
            <Check className='w-6 h-6' />
          ) : (
            <Download className='w-6 h-6' />
          )}
          <span>
            {isDownloading
              ? 'Generating PDF...'
              : downloadSuccess
              ? 'Downloaded!'
              : 'Download Resume'}
          </span>
        </span>
      </button>

      <button
        data-share-profile
        onClick={handleShareProfile}
        disabled={isSharing || shareSuccess}
        className='bg-white hover:bg-gray-50 text-gray-700 px-6 py-4 rounded-lg font-medium text-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none'
      >
        <span className='flex items-center gap-3'>
          {isSharing ? (
            <Loader2 className='w-6 h-6 animate-spin' />
          ) : shareSuccess ? (
            <Check className='w-6 h-6' />
          ) : (
            <Share2 className='w-6 h-6' />
          )}
          <span>
            {isSharing
              ? 'Copying...'
              : shareSuccess
              ? 'Copied!'
              : 'Share Profile'}
          </span>
        </span>
      </button>

      <button
        onClick={onViewQRCode}
        className='bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-medium text-lg transition-all duration-300 cursor-pointer'
      >
        <span className='flex items-center gap-3'>
          <QrCode className='w-6 h-6' />
          <span>Generate QR Code</span>
        </span>
      </button>
    </div>
  );
};
