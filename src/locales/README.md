# Locale System Documentation

This directory contains the internationalization (i18n) system for QRFolio, built with react-intl.

## Overview

The locale system provides:

- Type-safe translations with TypeScript
- Easy-to-use hooks and components
- Automatic locale persistence
- Support for ICU message format
- Extensible architecture for adding new languages

## File Structure

```
src/locales/
├── en.json             # English translations (JSON format)
├── en.ts               # English locale with TypeScript types
├── types.ts            # TypeScript type definitions
├── index.ts            # Main exports and helper functions
└── README.md           # This documentation
```

## Adding New Translations

### 1. Add to JSON File

Edit `src/locales/en.json` to add new translation keys:

```json
{
  "common": {
    "newKey": "New translation value"
  },
  "newSection": {
    "message": "Hello world",
    "messageWithVariable": "Hello {name}!"
  }
}
```

### 2. Types are Auto-Generated

TypeScript types are automatically generated from the JSON structure, so you get:

- Autocomplete for all translation keys
- Compile-time checking for missing keys
- Type safety for message values

## Usage in Components

### Method 1: FormattedMessage Component

```tsx
import { FormattedMessage } from 'react-intl';

function MyComponent() {
  return (
    <div>
      <FormattedMessage id='common.save' />
      <FormattedMessage id='validation.minLength' values={{ count: 8 }} />
    </div>
  );
}
```

### Method 2: useTranslations Hook

```tsx
import { useTranslations } from '../hooks/useTranslations';

function MyComponent() {
  const { t } = useTranslations();

  return (
    <div>
      <button>{t('common.save')}</button>
      <p>{t('validation.minLength', { count: 8 })}</p>
    </div>
  );
}
```

### Method 3: useIntl Hook

```tsx
import { useIntl } from 'react-intl';

function MyComponent() {
  const intl = useIntl();

  return (
    <div>
      <p>{intl.formatMessage({ id: 'common.save' })}</p>
    </div>
  );
}
```

## Adding New Locales

### 1. Create Locale Files

Create a new JSON file for your locale (e.g., `src/locales/es.json` for Spanish):

```json
{
  "common": {
    "save": "Guardar",
    "cancel": "Cancelar"
  }
}
```

### 2. Update TypeScript Files

Update `src/locales/types.ts`:

```typescript
export type LocaleKey = 'en' | 'es';
export const availableLocales: LocaleKey[] = ['en', 'es'];
```

Update `src/locales/en.ts` to create a similar file for your new locale:

```typescript
// src/locales/es.ts
import esData from './es.json';
export const es = esData;
export type LocaleMessages = typeof es;
```

Update `src/locales/index.ts`:

```typescript
export { en } from './en';
export { es } from './es'; // Add this line

export const locales = {
  en,
  es, // Add this line
} as const;
```

### 3. Update Locale Switcher

Update the locale labels in `src/components/ui/molecules/LocaleSwitcher/LocaleSwitcher.tsx`:

```typescript
const localeLabels: Record<LocaleKey, string> = {
  en: 'English',
  es: 'Español', // Add this line
};
```

## Message Format

The system supports ICU message format for complex messages:

```json
{
  "messages": {
    "welcome": "Welcome, {name}!",
    "itemCount": "You have {count, plural, =0 {no items} =1 {one item} other {# items}}",
    "lastLogin": "Last login: {date, date, short}"
  }
}
```

Usage:

```tsx
<FormattedMessage
  id="messages.welcome"
  values={{ name: 'John' }}
/>

<FormattedMessage
  id="messages.itemCount"
  values={{ count: 5 }}
/>

<FormattedMessage
  id="messages.lastLogin"
  values={{ date: new Date() }}
/>
```

## Best Practices

1. **Organize by Feature**: Group translations by feature or page
2. **Use Descriptive Keys**: Use clear, hierarchical key names
3. **Keep Messages Concise**: Write clear, concise messages
4. **Use Variables**: Use ICU format for dynamic content
5. **Test All Locales**: Test your app with all supported locales
6. **Fallback Handling**: Always provide fallback messages

## Locale Context

The `LocaleProvider` automatically:

- Persists the selected locale to localStorage
- Provides locale switching functionality
- Handles missing translation warnings
- Manages locale state across the app

## Development

### Adding Translations During Development

1. Add the translation key to `src/locales/en.json`
2. Use the key in your component with type safety
3. The TypeScript compiler will help catch typos and missing keys

### Debugging Missing Translations

In development mode, missing translations will log warnings to the console. Make sure all your translation keys exist in the JSON files.

## Examples

See `src/components/examples/TranslationExample.tsx` for comprehensive usage examples.
