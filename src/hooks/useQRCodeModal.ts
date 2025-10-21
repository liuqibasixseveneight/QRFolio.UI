import { useState, type RefObject } from 'react';

import { captureElementAsImage, downloadImage } from '@/utils/imageCapture';
import { useToast } from '@/components/ui/molecules/Toast/use-toast';

export const useQRCodeModal = () => {
  const [copied, setCopied] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { toast } = useToast();

  const handleClose = (onClose: () => void) => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  const triggerEnterAnimation = () => {
    setTimeout(() => setIsVisible(true), 10);
  };

  // Helper function to safely copy text to clipboard
  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }

      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();

      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    } catch {
      return false;
    }
  };

  const handleShare = async (profileData: any) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profileData.labels.fullName}'s Professional Profile`,
          text: `Check out ${profileData.labels.fullName}'s professional profile`,
          url: profileData.link,
        });
        return;
      }

      // Fallback to copy
      const success = await copyToClipboard(profileData.link);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: 'Link Copied',
          description: 'Profile link has been copied to clipboard.',
          variant: 'success',
        });
      } else {
        throw new Error('Copy failed');
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

  const handleCopyLink = async (profileData: any) => {
    try {
      const success = await copyToClipboard(profileData.link);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: 'Link Copied',
          description: 'Profile link has been copied to clipboard.',
          variant: 'success',
        });
      } else {
        throw new Error('Copy failed');
      }
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast({
        title: 'Copy Failed',
        description: 'Failed to copy link. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveAsImage = async (
    qrCardRef: RefObject<HTMLDivElement>,
    profileData: any
  ) => {
    if (!qrCardRef.current) {
      toast({
        title: 'Save Failed',
        description: 'QR card element not found. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    try {
      // More specific selector for the ProfileQRCard component
      const profileCardElement = qrCardRef.current.querySelector(
        'div.w-full.font-sans.select-none.overflow-hidden'
      ) as HTMLElement;

      if (!profileCardElement) {
        throw new Error('ProfileQRCard element not found');
      }

      const fileName = `${profileData.labels.fullName.replace(
        /\s+/g,
        '_'
      )}_QR_Code.png`;
      const { dataUrl } = await captureElementAsImage(
        profileCardElement,
        fileName,
        {
          quality: 1.0,
          backgroundColor: '#ffffff',
          scale: 3, // Higher scale for better quality
        }
      );

      downloadImage(dataUrl, fileName);

      toast({
        title: 'QR Code Saved',
        description: 'Your QR code has been saved as an image.',
        variant: 'success',
      });
    } catch (error) {
      console.error('Failed to save QR code:', error);
      toast({
        title: 'Save Failed',
        description: 'Unable to save QR code. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    copied,
    isClosing,
    isVisible,
    isSaving,
    handleClose,
    triggerEnterAnimation,
    handleShare,
    handleCopyLink,
    handleSaveAsImage,
  };
};
