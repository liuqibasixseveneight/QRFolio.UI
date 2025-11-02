import { useState, useEffect } from 'react';
import { X, AlertTriangle, Check } from 'lucide-react';

import { Button } from '@/components/ui/atoms/Button';
import { LoadingSpinner } from '@/components/ui/atoms/LoadingSpinner';
import { useTranslations } from '@/hooks/useTranslations';
import type { ConfirmAddUserModalProps } from './types';

const ConfirmAddUserModal = ({
  isOpen,
  onClose,
  onConfirm,
  userId,
  userName,
  isLoading = false,
}: ConfirmAddUserModalProps) => {
  const { t } = useTranslations();
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsVisible(false);
      onClose();
    }, 200);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  useEffect(() => {
    if (isOpen && !isVisible) {
      setTimeout(() => setIsVisible(true), 10);
    }
  }, [isOpen, isVisible]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 lg:p-6 transition-all duration-200 ease-out ${
        isClosing
          ? 'bg-black/0 backdrop-blur-none'
          : 'bg-black/50 backdrop-blur-sm'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-[95vw] xs:max-w-md sm:max-w-lg overflow-hidden bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-200 ease-out transform ${
          isClosing
            ? 'scale-95 opacity-0 translate-y-4'
            : isVisible
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between p-3 xs:p-4 sm:p-6 border-b border-gray-100'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-amber-50 rounded-lg'>
              <AlertTriangle className='w-5 h-5 text-amber-600' />
            </div>
            <div>
              <h2 className='text-lg xs:text-xl font-medium text-gray-900'>
                {t('modal.confirmAddUser.title')}
              </h2>
              <p className='text-sm text-gray-600'>
                {t('modal.confirmAddUser.subtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className='p-1.5 xs:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            aria-label={t('modal.confirmAddUser.closeModal')}
          >
            <X className='w-4 xs:w-5 h-4 xs:h-5' />
          </button>
        </div>

        <div className='p-3 xs:p-4 sm:p-6 space-y-4'>
          {isLoading ? (
            <div className='flex flex-col items-center justify-center py-8'>
              <LoadingSpinner />
              <p className='text-gray-600 text-sm mt-4'>
                {t('modal.confirmAddUser.verifyingUser')}
              </p>
            </div>
          ) : (
            <>
              <div className='space-y-3'>
                <p className='text-sm text-gray-600'>
                  {t('modal.confirmAddUser.aboutToGrantAccess')}
                </p>

                {userName ? (
                  <div className='bg-green-50 border border-green-200 rounded-lg p-4 space-y-2'>
                    <div className='flex items-center gap-2'>
                      <Check className='w-4 h-4 text-green-600' />
                      <span className='text-sm font-medium text-green-900'>
                        {t('modal.confirmAddUser.userFound')}
                      </span>
                    </div>
                    <div className='ml-6 space-y-1'>
                      <p className='text-base font-semibold text-gray-900'>
                        {userName}
                      </p>
                      <code className='text-xs text-gray-600 font-mono'>
                        {userId}
                      </code>
                    </div>
                  </div>
                ) : (
                  <div className='bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2'>
                    <div className='flex items-center gap-2'>
                      <AlertTriangle className='w-4 h-4 text-amber-600' />
                      <span className='text-sm font-medium text-amber-900'>
                        {t('modal.confirmAddUser.noNameFound')}
                      </span>
                    </div>
                    <div className='ml-6'>
                      <code className='text-sm text-gray-900 font-mono'>
                        {userId}
                      </code>
                      <p className='text-xs text-amber-700 mt-1'>
                        {t('modal.confirmAddUser.noNameFoundDesc')}
                      </p>
                    </div>
                  </div>
                )}

                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                  <p className='text-sm text-blue-900'>
                    <strong>{t('modal.confirmAddUser.note')}</strong>{' '}
                    {t('modal.confirmAddUser.restrictedProfileNote')}
                  </p>
                </div>
              </div>

              <div className='flex flex-col-reverse xs:flex-row gap-3 pt-2'>
                <Button
                  variant='outline'
                  onClick={handleClose}
                  className='flex-1 xs:flex-none cursor-pointer border-gray-300 hover:bg-gray-50'
                  disabled={isLoading}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  variant='default'
                  onClick={handleConfirm}
                  className='flex-1 xs:flex-auto cursor-pointer bg-gray-900 hover:bg-gray-800'
                  disabled={isLoading}
                >
                  {t('modal.confirmAddUser.addUser')}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmAddUserModal;
