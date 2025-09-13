# Locale Management Scripts

This directory contains automated scripts for managing locales in the QRFolio application.

## 🚀 Quick Start

### Adding a New Locale

```bash
# Add Spanish locale
npm run locale-manager add es Spanish

# Add French locale
npm run locale-manager add fr French

# Add German locale
npm run locale-manager add de German
```

### Listing Available Locales

```bash
npm run locale-manager list
```

### Validating All Locales

```bash
npm run locale-manager validate
```

### Removing a Locale

```bash
npm run locale-manager remove es
```

## 📋 Available Commands

### `npm run locale-manager add <locale-code> <locale-name>`

**Purpose**: Automatically adds a new locale to the application.

**What it does**:

1. ✅ Creates `src/locales/{locale-code}.json` with template translations
2. ✅ Creates `src/locales/{locale-code}.ts` with TypeScript exports
3. ✅ Updates `src/locales/types.ts` with new locale type
4. ✅ Updates `src/locales/index.ts` with new locale exports
5. ✅ Updates `LocaleSwitcher` component with new locale label
6. ✅ Creates helpful README for the new locale

**Example**:

```bash
npm run locale-manager add es Spanish
```

**Output**:

```
🚀 Adding locale: es (Spanish)
📝 Step 1: Creating JSON locale file...
✅ Created es.json
📝 Step 2: Creating TypeScript locale file...
✅ Created es.ts
📝 Step 3: Updating types.ts...
✅ Updated types.ts
📝 Step 4: Updating index.ts...
✅ Updated index.ts
📝 Step 5: Updating LocaleSwitcher...
✅ Updated LocaleSwitcher

🎉 Locale addition complete!

📋 Next steps:
1. Edit src/locales/es.json to add your translations
2. Replace all placeholder text (e.g., [common.save]) with actual Spanish translations
3. Run 'npm run dev' to test your new locale
4. Use the locale switcher in the UI to verify everything works
```

### `npm run locale-manager remove <locale-code>`

**Purpose**: Removes an existing locale from the application.

**What it does**:

1. ✅ Deletes locale JSON and TypeScript files
2. ✅ Removes locale from types configuration
3. ✅ Removes locale from exports
4. ✅ Updates LocaleSwitcher component
5. ✅ Cleans up any generated README files

**Example**:

```bash
npm run locale-manager remove es
```

**Note**: Cannot remove the default English (`en`) locale.

### `npm run locale-manager list`

**Purpose**: Lists all available locales in the application.

**Example**:

```bash
npm run locale-manager list
```

**Output**:

```
📋 Available locales:
  • en (default)
  • es
  • fr

Total: 3 locale(s)
```

### `npm run locale-manager validate`

**Purpose**: Validates all locale files for completeness and correctness.

**What it checks**:

1. ✅ All locale files exist (JSON and TypeScript)
2. ✅ JSON files are valid
3. ✅ Locale structure matches English template
4. ✅ No missing translation keys
5. ⚠️ Warns about placeholder text that needs translation

**Example**:

```bash
npm run locale-manager validate
```

**Output**:

```
🔍 Validating locale files...
✅ en: Valid
⚠️  es: Placeholder found at "common.save": [common.save]
⚠️  es: Placeholder found at "landing.heroTitle": [landing.heroTitle]
✅ fr: Valid

🎉 All locales are valid!
```

## 🔧 Manual Process (Before Automation)

If you prefer to add locales manually, here's the step-by-step process:

### Step 1: Create Locale Files

```bash
# Create JSON file
cp src/locales/en.json src/locales/es.json

# Create TypeScript file
echo "import esData from './es.json';
export const es = esData;
export type LocaleMessages = typeof es;" > src/locales/es.ts
```

### Step 2: Update Types

```typescript
// src/locales/types.ts
export type LocaleKey = 'en' | 'es'; // Add 'es'
export const availableLocales: LocaleKey[] = ['en', 'es']; // Add 'es'
```

### Step 3: Update Exports

```typescript
// src/locales/index.ts
import { es } from './es';
export { es };
export const locales = { en, es } as const;
```

### Step 4: Update UI Components

```typescript
// LocaleSwitcher component
const localeLabels: Record<LocaleKey, string> = {
  en: 'English',
  es: 'Spanish', // Add this
};
```

## 📁 File Structure

After adding a locale, your file structure will look like this:

```
src/locales/
├── en.json              # English translations
├── en.ts               # English TypeScript exports
├── es.json              # Spanish translations (new)
├── es.ts               # Spanish TypeScript exports (new)
├── es-README.md        # Spanish locale documentation (new)
├── types.ts            # Updated with new locale
├── index.ts            # Updated with new locale exports
└── README.md           # Main locale documentation
```

## 🎯 Best Practices

### 1. Translation Guidelines

- Keep the same JSON structure as `en.json`
- Maintain the same keys and nesting
- Replace placeholder text with actual translations
- Test all UI components after translation

### 2. Locale Code Standards

- Use 2-letter ISO language codes (e.g., `es`, `fr`, `de`)
- Use lowercase letters only
- Follow ISO 639-1 standard

### 3. Testing

- Always run `npm run locale-manager validate` after adding translations
- Test the locale switcher in the UI
- Verify all components display correctly in the new locale

### 4. Maintenance

- Regularly validate all locales
- Keep translations up-to-date with English changes
- Remove unused locales to keep the codebase clean

## 🚨 Troubleshooting

### Common Issues

**"Locale already exists"**

```bash
❌ Error: Locale es already exists
```

**Solution**: Use `npm run locale-manager list` to see existing locales, or use `npm run locale-manager remove es` to remove it first.

**"Invalid locale code"**

```bash
❌ Error: Locale code must be a 2-letter lowercase code
```

**Solution**: Use 2-letter codes like `es`, `fr`, `de`, not `ESP` or `spanish`.

**"Cannot remove default locale"**

```bash
❌ Error: Cannot remove the default English locale
```

**Solution**: You cannot remove the `en` locale as it's the default fallback.

**Build errors after adding locale**

```bash
❌ TypeScript compilation errors
```

**Solution**: Run `npm run build` to check for errors, or use `npm run locale-manager validate` to check locale files.

## 🎉 Success!

After successfully adding a locale:

1. ✅ **Edit translations**: Replace placeholder text in the JSON file
2. ✅ **Test the app**: Run `npm run dev` and use the locale switcher
3. ✅ **Validate**: Run `npm run locale-manager validate` to ensure everything is correct
4. ✅ **Build**: Run `npm run build` to ensure the app compiles successfully

Your QRFolio application now supports multiple languages! 🌍
