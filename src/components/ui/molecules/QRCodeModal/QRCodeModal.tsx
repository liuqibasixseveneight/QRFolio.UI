import { useRef, type RefObject } from 'react';
import { Share2, X, Copy, Check, Download } from 'lucide-react';

import { ProfileQRCard } from '@/components/ui/molecules/ProfileQRCard';
import { Button } from '@/components/ui/atoms/Button';
import { useTranslations } from '@/hooks/useTranslations';
import { useQRCodeModal } from '@/hooks/useQRCodeModal';
import type { QRCodeModalProps } from './types';

const QRCodeModal = ({ isOpen, onClose, profileData }: QRCodeModalProps) => {
  const { t } = useTranslations();
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
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 lg:p-6 transition-all duration-200 ease-out ${
        isClosing
          ? 'bg-black/0 backdrop-blur-none'
          : 'bg-black/50 backdrop-blur-sm'
      }`}
      onClick={() => handleClose(onClose)}
    >
      <div
        className={`relative w-full max-w-[95vw] xs:max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-200 ease-out transform ${
          isClosing
            ? 'scale-95 opacity-0 translate-y-4'
            : isVisible
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between p-3 xs:p-4 sm:p-6 border-b border-gray-100'>
          <div className='flex-1 min-w-0'>
            <h2 className='text-lg xs:text-xl sm:text-2xl font-light text-gray-900 truncate'>
              {t('qr.modal.title')}
            </h2>
            <p className='text-gray-600 text-xs xs:text-sm mt-1 hidden xs:block'>
              {t('qr.modal.subtitle')}
            </p>
          </div>
          <button
            onClick={() => handleClose(onClose)}
            className='p-1.5 xs:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 flex-shrink-0'
            aria-label={t('qr.modal.closeModal')}
          >
            <X className='w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6' />
          </button>
        </div>

        <div className='overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-140px)]'>
          <div className='w-full' ref={qrCardRef}>
            <ProfileQRCard {...profileData} />
          </div>
        </div>

        <div className='flex flex-col gap-3 xs:gap-4 p-3 xs:p-4 sm:p-6 border-t border-gray-100 bg-gray-50'>
          <div className='flex items-center justify-center xs:justify-start gap-2 text-xs xs:text-sm text-gray-600'>
            <div className='w-2 h-2 bg-green-500 rounded-full flex-shrink-0'></div>
            <span>{t('qr.modal.readyToShare')}</span>
          </div>

          <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3'>
            <Button
              variant='outline'
              size='lg'
              onClick={() => handleCopyLink(profileData)}
              className='w-full text-xs xs:text-sm justify-center'
            >
              {copied ? (
                <>
                  <Check className='w-4 h-4 mr-2 flex-shrink-0' />
                  <span className='hidden xs:inline'>{t('qr.modal.copied')}</span>
                  <span className='xs:hidden'>{t('qr.modal.copiedShort')}</span>
                </>
              ) : (
                <>
                  <Copy className='w-4 h-4 mr-2 flex-shrink-0' />
                  <span className='hidden xs:inline'>{t('qr.copyLink')}</span>
                  <span className='xs:hidden'>{t('qr.modal.copy')}</span>
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
              className='w-full text-xs xs:text-sm justify-center'
            >
              <Download className='w-4 h-4 mr-2 flex-shrink-0' />
              {isSaving ? (
                <>
                  <span className='hidden xs:inline'>{t('qr.modal.saving')}</span>
                  <span className='xs:hidden'>{t('qr.modal.savingShort')}</span>
                </>
              ) : (
                <>
                  <span className='hidden xs:inline'>{t('qr.modal.saveImage')}</span>
                  <span className='xs:hidden'>{t('qr.modal.saveShort')}</span>
                </>
              )}
            </Button>

            <Button
              variant='outline'
              size='lg'
              onClick={() => handleShare(profileData)}
              className='w-full text-xs xs:text-sm justify-center'
            >
              <Share2 className='w-4 h-4 mr-2 flex-shrink-0' />
              <span className='hidden xs:inline'>{t('qr.modal.share')}</span>
              <span className='xs:hidden'>{t('qr.modal.share')}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
