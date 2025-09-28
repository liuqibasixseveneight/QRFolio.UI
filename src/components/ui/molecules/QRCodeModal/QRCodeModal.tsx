import { useRef, type RefObject } from 'react';
import { Share2, X, Copy, Check, Download } from 'lucide-react';

import { ProfileQRCard } from '@/components/ui/molecules/ProfileQRCard';
import { Button } from '@/components/ui/atoms/Button';
import { useQRCodeModal } from '@/hooks/useQRCodeModal';
import type { QRCodeModalProps } from './types';

const QRCodeModal = ({ isOpen, onClose, profileData }: QRCodeModalProps) => {
  const qrCardRef = useRef<HTMLDivElement>(null);

  const {
    copied,
    isClosing,
    isVisible,
    isSaving,
    handleClose,
    triggerEnterAnimation,
    handleShare,
    handleCopyLink,
    handleSaveAsImage,
  } = useQRCodeModal();

  if (!isOpen) {
    return null;
  }

  // Trigger enter animation when modal opens
  if (isOpen && !isVisible) {
    triggerEnterAnimation();
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ease-out ${
        isClosing
          ? 'bg-black/0 backdrop-blur-none'
          : 'bg-black/50 backdrop-blur-sm'
      }`}
      onClick={() => handleClose(onClose)}
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
            onClick={() => handleClose(onClose)}
            className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105'
            aria-label='Close modal'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        <div className='overflow-y-auto max-h-[calc(90vh-140px)]'>
          <div className='w-full' ref={qrCardRef}>
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
              onClick={() => handleCopyLink(profileData)}
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
              onClick={() =>
                handleSaveAsImage(
                  qrCardRef as RefObject<HTMLDivElement>,
                  profileData
                )
              }
              disabled={isSaving}
              className='min-w-[120px]'
            >
              <Download className='w-4 h-4 mr-2' />
              {isSaving ? 'Saving...' : 'Save Image'}
            </Button>

            <Button
              variant='outline'
              size='lg'
              onClick={() => handleShare(profileData)}
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
