#!/usr/bin/env node

/**
 * Add Locale Script
 *
 * Automates the process of adding a new locale to the QRFolio application.
 *
 * Usage: npm run add-locale <locale-code> <locale-name>
 * Example: npm run add-locale es Spanish
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get command line arguments
const args = process.argv.slice(2);
const localeCode = args[0];
const localeName = args[1];

if (!localeCode || !localeName) {
  console.error('❌ Error: Missing required arguments');
  console.log('Usage: npm run add-locale <locale-code> <locale-name>');
  console.log('Example: npm run add-locale es Spanish');
  process.exit(1);
}

// Validate locale code format
if (!/^[a-z]{2}$/.test(localeCode)) {
  console.error(
    '❌ Error: Locale code must be a 2-letter lowercase code (e.g., "es", "fr", "de")'
  );
  process.exit(1);
}

console.log(`🚀 Adding locale: ${localeCode} (${localeName})`);

const projectRoot = path.join(__dirname, '..');
const localesDir = path.join(projectRoot, 'src', 'locales');

// Step 1: Create the JSON locale file
console.log('📝 Step 1: Creating JSON locale file...');
const enJsonPath = path.join(localesDir, 'en.json');
const newJsonPath = path.join(localesDir, `${localeCode}.json`);

if (fs.existsSync(newJsonPath)) {
  console.error(`❌ Error: Locale file ${localeCode}.json already exists`);
  process.exit(1);
}

// Read the English locale file and create a template
const enData = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

// Create a template with placeholder values
function createTemplate(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      result[key] = createTemplate(value, prefix + key + '.');
    } else {
      // Create placeholder text
      const placeholder = `[${prefix}${key}]`;
      result[key] = placeholder;
    }
  }
  return result;
}

const templateData = createTemplate(enData);
fs.writeFileSync(newJsonPath, JSON.stringify(templateData, null, 2));
console.log(`✅ Created ${localeCode}.json`);

// Step 2: Create the TypeScript locale file
console.log('📝 Step 2: Creating TypeScript locale file...');
const newTsPath = path.join(localesDir, `${localeCode}.ts`);

const tsContent = `/**
 * ${localeName} locale file for QRFolio
 *
 * This file imports the JSON locale data and provides TypeScript types.
 * To add new translations, edit the corresponding JSON file.
 */

import ${localeCode}Data from './${localeCode}.json';

export const ${localeCode} = ${localeCode}Data;

// Type for the locale structure
export type LocaleMessages = typeof ${localeCode};
`;

fs.writeFileSync(newTsPath, tsContent);
console.log(`✅ Created ${localeCode}.ts`);

// Step 3: Update types.ts
console.log('📝 Step 3: Updating types.ts...');
const typesPath = path.join(localesDir, 'types.ts');
let typesContent = fs.readFileSync(typesPath, 'utf8');

// Update LocaleKey type
const localeKeyRegex = /export type LocaleKey = '([^']+)'/;
const localeKeyMatch = typesContent.match(localeKeyRegex);
if (localeKeyMatch) {
  const existingLocales = localeKeyMatch[1].split("' | '").join("', '");
  const newLocaleKey = `export type LocaleKey = '${existingLocales}' | '${localeCode}'`;
  typesContent = typesContent.replace(localeKeyRegex, newLocaleKey);
}

// Update availableLocales array
const availableLocalesRegex =
  /export const availableLocales: LocaleKey\[\] = \[([^\]]+)\]/;
const availableLocalesMatch = typesContent.match(availableLocalesRegex);
if (availableLocalesMatch) {
  const existingLocales = availableLocalesMatch[1];
  const newAvailableLocales = `export const availableLocales: LocaleKey[] = [${existingLocales}, '${localeCode}']`;
  typesContent = typesContent.replace(
    availableLocalesRegex,
    newAvailableLocales
  );
}

fs.writeFileSync(typesPath, typesContent);
console.log('✅ Updated types.ts');

// Step 4: Update index.ts
console.log('📝 Step 4: Updating index.ts...');
const indexPath = path.join(localesDir, 'index.ts');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Add import
const importRegex = /import { en } from '\.\/en';/;
const newImport = `import { en } from './en';\nimport { ${localeCode} } from './${localeCode}';`;
indexContent = indexContent.replace(importRegex, newImport);

// Add export
const exportRegex = /export { en };/;
const newExport = `export { en };\nexport { ${localeCode} };`;
indexContent = indexContent.replace(exportRegex, newExport);

// Update locales object
const localesRegex = /export const locales = \{([^}]+)\} as const;/;
const localesMatch = indexContent.match(localesRegex);
if (localesMatch) {
  const existingLocales = localesMatch[1].trim();
  const newLocales = `export const locales = {\n  ${existingLocales.replace(
    /^\s+|\s+$/g,
    ''
  )},\n  ${localeCode},\n} as const;`;
  indexContent = indexContent.replace(localesRegex, newLocales);
}

fs.writeFileSync(indexPath, indexContent);
console.log('✅ Updated index.ts');

// Step 5: Update LocaleSwitcher
console.log('📝 Step 5: Updating LocaleSwitcher...');
const localeSwitcherPath = path.join(
  projectRoot,
  'src',
  'components',
  'ui',
  'molecules',
  'LocaleSwitcher',
  'LocaleSwitcher.tsx'
);
let switcherContent = fs.readFileSync(localeSwitcherPath, 'utf8');

// Update localeLabels object
const localeLabelsRegex =
  /const localeLabels: Record<LocaleKey, string> = \{([^}]+)\};/;
const localeLabelsMatch = switcherContent.match(localeLabelsRegex);
if (localeLabelsMatch) {
  const existingLabels = localeLabelsMatch[1].trim();
  const newLabels = `const localeLabels: Record<LocaleKey, string> = {\n  ${existingLabels.replace(
    /^\s+|\s+$/g,
    ''
  )},\n  ${localeCode}: '${localeName}',\n};`;
  switcherContent = switcherContent.replace(localeLabelsRegex, newLabels);
}

fs.writeFileSync(localeSwitcherPath, switcherContent);
console.log('✅ Updated LocaleSwitcher');

// Step 6: Create a helpful README for the new locale
console.log('📝 Step 6: Creating locale documentation...');
const localeReadmePath = path.join(localesDir, `${localeCode}-README.md`);

const readmeContent = `# ${localeName} (${localeCode}) Locale

This file contains the ${localeName} translations for QRFolio.

## Files Created

- \`${localeCode}.json\` - Translation data
- \`${localeCode}.ts\` - TypeScript exports and types

## Next Steps

1. **Translate the content**: Edit \`${localeCode}.json\` and replace all placeholder text with actual ${localeName} translations
2. **Test the locale**: Run \`npm run dev\` and use the locale switcher to test your translations
3. **Verify completeness**: Ensure all translation keys have been translated (no placeholder text remains)

## Translation Guidelines

- Keep the same JSON structure as \`en.json\`
- Maintain the same keys and nesting
- Replace placeholder text like \`[common.save]\` with actual translations
- Test all UI components to ensure translations display correctly

## Example Translation

\`\`\`json
{
  "common": {
    "save": "Your translation here",
    "cancel": "Your translation here"
  }
}
\`\`\`

Happy translating! 🚀
`;

fs.writeFileSync(localeReadmePath, readmeContent);
console.log(`✅ Created ${localeCode}-README.md`);

console.log('\n🎉 Locale addition complete!');
console.log('\n📋 Next steps:');
console.log(`1. Edit src/locales/${localeCode}.json to add your translations`);
console.log(
  `2. Replace all placeholder text (e.g., [common.save]) with actual ${localeName} translations`
);
console.log(`3. Run 'npm run dev' to test your new locale`);
console.log(`4. Use the locale switcher in the UI to verify everything works`);
console.log(
  '\n📖 See src/locales/' + localeCode + '-README.md for detailed instructions'
);

console.log(
  '\n✨ Tip: You can now run the build to ensure everything compiles correctly!'
);
