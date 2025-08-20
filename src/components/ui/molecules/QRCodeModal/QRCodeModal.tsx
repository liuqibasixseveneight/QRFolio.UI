import { useState, useRef } from 'react';
import { Download, Share2, X, Copy, Check } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

import { useToast } from '@/components/ui/molecules/Toast/use-toast';
import { ProfileQRCard } from '@/components/ui/molecules/ProfileQRCard';
import { Button } from '@/components/ui/atoms/Button';
import type { QRCodeModalProps } from './types';

const QRCodeModal = ({ isOpen, onClose, profileData }: QRCodeModalProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrCardRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  if (!isOpen) {
    return null;
  }

  const handleDownload = async () => {
    if (!qrCardRef.current) {
      return;
    }

    setIsDownloading(true);

    try {
      const dataUrl = await htmlToImage.toPng(qrCardRef.current, {
        quality: 1.0,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `${profileData.labels.fullName?.replace(
        /\s+/g,
        '_'
      )}_QRCode.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Download Successful',
        description: 'QR Code has been downloaded successfully.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Failed to download QR code:', error);

      toast({
        title: 'Download Failed',
        description: 'Failed to download QR code. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profileData.labels.fullName}'s Professional Profile`,
          text: `Check out ${profileData.labels.fullName}'s professional profile`,
          url: profileData.link,
        });
      } else {
        // Fallback to copying link
        await navigator.clipboard.writeText(profileData.link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        toast({
          title: 'Link Copied',
          description: 'Profile link has been copied to clipboard.',
          variant: 'default',
        });
      }
    } catch (error) {
      console.error('Failed to share:', error);

      toast({
        title: 'Share Failed',
        description: 'Failed to share profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileData.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      toast({
        title: 'Link Copied',
        description: 'Profile link has been copied to clipboard.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Failed to copy link:', error);

      toast({
        title: 'Copy Failed',
        description: 'Failed to copy link. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
      <div className='relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-100'>
          <div>
            <h2 className='text-2xl font-light text-gray-900'>QR Code</h2>
            <p className='text-gray-600 text-sm mt-1'>
              Share your professional profile with others
            </p>
          </div>
          <button
            onClick={onClose}
            className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer'
            aria-label='Close modal'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        {/* Content */}
        <div className='overflow-y-auto max-h-[calc(90vh-140px)]'>
          <div ref={qrCardRef} className='w-full'>
            <ProfileQRCard {...profileData} />
          </div>
        </div>

        {/* Footer Actions */}
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-gray-100 bg-gray-50'>
          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
            <span>Ready to share</span>
          </div>

          <div className='flex items-center gap-3'>
            <Button
              variant='outline'
              size='lg'
              onClick={handleCopyLink}
              className='min-w-[120px]'
            >
              {copied ? (
                <>
                  <Check className='w-4 h-4 mr-2' />
                  Copied
                </>
              ) : (
                <>
                  <Copy className='w-4 h-4 mr-2' />
                  Copy Link
                </>
              )}
            </Button>

            <Button
              variant='outline'
              size='lg'
              onClick={handleShare}
              className='min-w-[120px]'
            >
              <Share2 className='w-4 h-4 mr-2' />
              Share
            </Button>

            <Button
              size='lg'
              onClick={handleDownload}
              disabled={isDownloading}
              className='min-w-[140px]'
            >
              <Download className='w-4 h-4 mr-2' />
              {isDownloading ? 'Downloading...' : 'Download'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
