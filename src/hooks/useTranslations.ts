/**
 * Custom hook for type-safe translations
 *
 * This hook provides a type-safe way to access translations with
 * autocomplete and compile-time checking.
 */

import { useIntl } from 'react-intl';

import type { AllMessageKeys } from '../locales';

type TranslationValues = {
  [key: string]: string | number | boolean | Date;
};

export const useTranslations = () => {
  const intl = useIntl();

  const t = (key: AllMessageKeys, values?: TranslationValues): string => {
    return intl.formatMessage({ id: key }, values);
  };

  return { t };
};

// Convenience hook for common translation patterns
export const useTranslation = () => {
  const { t } = useTranslations();
  return t;
};
