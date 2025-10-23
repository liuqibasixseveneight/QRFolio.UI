/**
 * Locale Provider for QRFolio
 *
 * This provider manages locale state and provides internationalization context
 * to all child components using react-intl.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { IntlProvider } from 'react-intl';

import {
  defaultLocale,
  availableLocales,
  getLocaleMessages,
  type LocaleKey,
} from '../locales';

// Helper function to flatten nested objects for react-intl
const flattenMessages = (
  nestedMessages: any,
  prefix = ''
): Record<string, string> => {
  const flattened: Record<string, string> = {};

  for (const key in nestedMessages) {
    if (nestedMessages.hasOwnProperty(key)) {
      const value = nestedMessages[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(flattened, flattenMessages(value, newKey));
      } else {
        flattened[newKey] = String(value);
      }
    }
  }

  return flattened;
};

type LocaleContextType = {
  locale: LocaleKey;
  setLocale: (locale: LocaleKey) => void;
  availableLocales: readonly LocaleKey[];
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

type LocaleProviderProps = {
  children: ReactNode;
  initialLocale?: LocaleKey;
};

export const LocaleProvider = ({
  children,
  initialLocale,
}: LocaleProviderProps) => {
  const [locale, setLocale] = useState<LocaleKey>(() => {
    // Try to get locale from localStorage first
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('qrfolio-locale') as LocaleKey;
      if (savedLocale && availableLocales.includes(savedLocale)) {
        return savedLocale;
      }
    }
    // Fall back to initialLocale or default
    return initialLocale || defaultLocale;
  });

  // Save locale to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('qrfolio-locale', locale);
    }
  }, [locale]);

  // Get messages for the current locale and flatten them for react-intl
  const nestedMessages = getLocaleMessages(locale);
  const messages = flattenMessages(nestedMessages);

  const contextValue: LocaleContextType = {
    locale,
    setLocale,
    availableLocales,
  };

  return (
    <LocaleContext.Provider value={contextValue}>
      <IntlProvider
        locale={locale}
        messages={messages}
        defaultLocale={defaultLocale}
        onError={(error) => {
          // Suppress missing translation warnings in development
          if (process.env.NODE_ENV === 'development') {
            console.warn('Missing translation:', error.message);
          }
        }}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

// Hook to use locale context
export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

// Hook to get the current locale
export const useCurrentLocale = (): LocaleKey => {
  const { locale } = useLocale();
  return locale;
};

// Hook to change locale
export const useSetLocale = () => {
  const { setLocale } = useLocale();
  return setLocale;
};
