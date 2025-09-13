/**
 * Locale Switcher Component
 *
 * A dropdown component that allows users to switch between available locales.
 * This component demonstrates how to use the locale system.
 */

import {
  useCurrentLocale,
  useSetLocale,
} from '../../../../context/LocaleProvider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';
import { availableLocales, type LocaleKey } from '../../../../locales';

export type LocaleSwitcherProps = {
  className?: string;
  variant?: 'default' | 'minimal';
};

const localeLabels: Record<LocaleKey, string> = {
  en: 'English', // This will be replaced with translation keys
};

export const LocaleSwitcher = ({
  className,
  variant = 'default',
}: LocaleSwitcherProps) => {
  const currentLocale = useCurrentLocale();
  const setLocale = useSetLocale();

  const handleLocaleChange = (locale: string) => {
    setLocale(locale as LocaleKey);
  };

  const options = availableLocales.map((locale: LocaleKey) => ({
    value: locale,
    label: localeLabels[locale] || locale.toUpperCase(),
  }));

  if (variant === 'minimal') {
    return (
      <select
        value={currentLocale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        className={`rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
        aria-label='Select language'
      >
        {options.map((option: { value: string; label: string }) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className={className} aria-label='Select language'>
        <SelectValue placeholder='Select language' />
      </SelectTrigger>
      <SelectContent>
        {options.map((option: { value: string; label: string }) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
