import { useState, useEffect } from 'react';
import { Share2, X, Copy, Check } from 'lucide-react';

import { useToast } from '@/components/ui/molecules/Toast/use-toast';
import { ProfileQRCard } from '@/components/ui/molecules/ProfileQRCard';
import { Button } from '@/components/ui/atoms/Button';
import type { QRCodeModalProps } from './types';

const QRCodeModal = ({ isOpen, onClose, profileData }: QRCodeModalProps) => {
  const [copied, setCopied] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { toast } = useToast();

  // Handle close animation
  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  // Trigger enter animation when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready for animation
      setTimeout(() => setIsVisible(true), 10);
    }
  }, [isOpen]);

  // Don't render if not open
  if (!isOpen) {
    return null;
  }

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
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ease-out ${
        isClosing
          ? 'bg-black/0 backdrop-blur-none'
          : 'bg-black/50 backdrop-blur-sm'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl transition-all duration-200 ease-out transform ${
          isClosing
            ? 'scale-95 opacity-0 translate-y-4'
            : isVisible
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between p-6 border-b border-gray-100'>
          <div>
            <h2 className='text-2xl font-light text-gray-900'>QR Code</h2>
            <p className='text-gray-600 text-sm mt-1'>
              Share your professional profile with others
            </p>
          </div>
          <button
            onClick={handleClose}
            className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105'
            aria-label='Close modal'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        <div className='overflow-y-auto max-h-[calc(90vh-140px)]'>
          <div className='w-full'>
            <ProfileQRCard {...profileData} />
          </div>
        </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
