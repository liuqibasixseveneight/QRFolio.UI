/**
 * Locale types and configuration for QRFolio
 */

import type { LocaleMessages } from './en';

// Supported locales
export type LocaleKey = 'en';
export type AvailableLocales = LocaleKey;

// Default locale
export const defaultLocale: LocaleKey = 'en';

// Available locales list
export const availableLocales: LocaleKey[] = ['en'];

// Locale configuration
export type LocaleConfig = {
  locale: LocaleKey;
  messages: LocaleMessages;
};

// Message keys type for type safety
export type MessageKey = keyof LocaleMessages;
export type NestedMessageKey<T> = T extends Record<string, any>
  ? {
      [K in keyof T]: T[K] extends Record<string, any>
        ? `${K & string}.${NestedMessageKey<T[K]> & string}`
        : K & string;
    }[keyof T]
  : never;

export type AllMessageKeys = NestedMessageKey<LocaleMessages>;
