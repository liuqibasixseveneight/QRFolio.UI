/**
 * Translation Example Component
 *
 * This component demonstrates how to use the translation system
 * with react-intl and our custom hooks.
 */

import { FormattedMessage, useIntl } from 'react-intl';

import { useTranslations } from '../../hooks/useTranslations';
import { LocaleSwitcher } from '../ui/molecules/LocaleSwitcher';

export function TranslationExample() {
  const { t } = useTranslations();
  const intl = useIntl();

  return (
    <div className='max-w-2xl mx-auto p-6 space-y-6'>
      <div className='border rounded-lg p-4'>
        <h2 className='text-xl font-semibold mb-4'>Translation Examples</h2>

        <div className='space-y-4'>
          {/* Using FormattedMessage component */}
          <div>
            <h3 className='font-medium mb-2'>
              Using FormattedMessage component:
            </h3>
            <p className='text-gray-600'>
              <FormattedMessage id='common.save' />
            </p>
            <p className='text-gray-600'>
              <FormattedMessage id='auth.welcomeBack' />
            </p>
            <p className='text-gray-600'>
              <FormattedMessage id='profile.personalInfo' />
            </p>
          </div>

          {/* Using custom hook */}
          <div>
            <h3 className='font-medium mb-2'>Using useTranslations hook:</h3>
            <p className='text-gray-600'>{t('common.loading')}</p>
            <p className='text-gray-600'>{t('dashboard.manageDescription')}</p>
            <p className='text-gray-600'>{t('qr.generateQR')}</p>
          </div>

          {/* Using useIntl directly */}
          <div>
            <h3 className='font-medium mb-2'>Using useIntl directly:</h3>
            <p className='text-gray-600'>
              {intl.formatMessage({ id: 'errors.somethingWentWrong' })}
            </p>
            <p className='text-gray-600'>
              {intl.formatMessage({ id: 'success.profileSaved' })}
            </p>
          </div>

          {/* Message with values */}
          <div>
            <h3 className='font-medium mb-2'>Messages with variables:</h3>
            <p className='text-gray-600'>
              <FormattedMessage
                id='validation.minLength'
                values={{ count: 8 }}
              />
            </p>
            <p className='text-gray-600'>
              {t('validation.maxLength', { count: 100 })}
            </p>
          </div>

          {/* Current locale info */}
          <div>
            <h3 className='font-medium mb-2'>Current locale:</h3>
            <p className='text-gray-600'>Current locale: {intl.locale}</p>
          </div>

          {/* Locale switcher */}
          <div>
            <h3 className='font-medium mb-2'>Locale Switcher:</h3>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
