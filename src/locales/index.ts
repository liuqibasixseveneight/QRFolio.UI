/**
 * Locales index file for QRFolio
 *
 * This file exports all locale-related functionality including:
 * - Locale data
 * - Type definitions
 * - Configuration
 * - Helper functions
 */

import { en, type LocaleMessages } from './en';
import type {
  LocaleKey,
  AvailableLocales,
  LocaleConfig,
  MessageKey,
  AllMessageKeys,
} from './types';
import { defaultLocale, availableLocales } from './types';

export { en };
export type { LocaleMessages };
export type {
  LocaleKey,
  AvailableLocales,
  LocaleConfig,
  MessageKey,
  AllMessageKeys,
};
export { defaultLocale, availableLocales };

// Locale registry - add new locales here
export const locales = {
  en,
} as const;

// Helper function to get locale messages
export const getLocaleMessages = (locale: LocaleKey): LocaleMessages => {
  return locales[locale];
};

// Helper function to check if a locale is supported
export const isLocaleSupported = (locale: string): locale is LocaleKey => {
  return availableLocales.includes(locale as LocaleKey);
};
