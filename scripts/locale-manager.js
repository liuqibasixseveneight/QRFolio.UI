#!/usr/bin/env node

/**
 * Locale Manager Script
 *
 * Advanced script for managing locales in the QRFolio application.
 *
 * Commands:
 *   add <locale-code> <locale-name>  - Add a new locale
 *   remove <locale-code>             - Remove an existing locale
 *   list                             - List all available locales
 *   validate                         - Validate all locale files
 *
 * Examples:
 *   npm run locale-manager add es Spanish
 *   npm run locale-manager remove es
 *   npm run locale-manager list
 *   npm run locale-manager validate
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];
const localeCode = args[1];
const localeName = args[2];

const projectRoot = path.join(__dirname, '..');
const localesDir = path.join(projectRoot, 'src', 'locales');

// Validation functions
function validateLocaleCode(code) {
  if (!/^[a-z]{2}$/.test(code)) {
    console.error(
      '❌ Error: Locale code must be a 2-letter lowercase code (e.g., "es", "fr", "de")'
    );
    process.exit(1);
  }
}

function validateArguments() {
  if (!command) {
    console.error('❌ Error: Missing command');
    showUsage();
    process.exit(1);
  }
}

function showUsage() {
  console.log('📖 Usage:');
  console.log('  npm run locale-manager add <locale-code> <locale-name>');
  console.log('  npm run locale-manager remove <locale-code>');
  console.log('  npm run locale-manager list');
  console.log('  npm run locale-manager validate');
  console.log('');
  console.log('📝 Examples:');
  console.log('  npm run locale-manager add es Spanish');
  console.log('  npm run locale-manager remove es');
  console.log('  npm run locale-manager list');
  console.log('  npm run locale-manager validate');
}

// Helper functions
function getExistingLocales() {
  const typesPath = path.join(localesDir, 'types.ts');
  const content = fs.readFileSync(typesPath, 'utf8');
  const match = content.match(/export type LocaleKey = '([^']+)'/);
  if (match) {
    return match[1].split("' | '").join("', '").split("', '");
  }
  return [];
}

function createTemplate(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      result[key] = createTemplate(value, prefix + key + '.');
    } else {
      const placeholder = `[${prefix}${key}]`;
      result[key] = placeholder;
    }
  }
  return result;
}

// Command implementations
function addLocale() {
  if (!localeCode || !localeName) {
    console.error('❌ Error: Missing locale code or name');
    console.log(
      'Usage: npm run locale-manager add <locale-code> <locale-name>'
    );
    process.exit(1);
  }

  validateLocaleCode(localeCode);

  console.log(`🚀 Adding locale: ${localeCode} (${localeName})`);

  // Check if locale already exists
  const existingLocales = getExistingLocales();
  if (existingLocales.includes(localeCode)) {
    console.error(`❌ Error: Locale ${localeCode} already exists`);
    process.exit(1);
  }

  // Step 1: Create JSON file
  console.log('📝 Step 1: Creating JSON locale file...');
  const enJsonPath = path.join(localesDir, 'en.json');
  const newJsonPath = path.join(localesDir, `${localeCode}.json`);

  const enData = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));
  const templateData = createTemplate(enData);
  fs.writeFileSync(newJsonPath, JSON.stringify(templateData, null, 2));
  console.log(`✅ Created ${localeCode}.json`);

  // Step 2: Create TypeScript file
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
    const existingLocales = localeKeyMatch[1];
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

  console.log('\n🎉 Locale addition complete!');
  console.log('\n📋 Next steps:');
  console.log(
    `1. Edit src/locales/${localeCode}.json to add your translations`
  );
  console.log(
    `2. Replace all placeholder text (e.g., [common.save]) with actual ${localeName} translations`
  );
  console.log(`3. Run 'npm run dev' to test your new locale`);
  console.log(
    `4. Use the locale switcher in the UI to verify everything works`
  );
}

function removeLocale() {
  if (!localeCode) {
    console.error('❌ Error: Missing locale code');
    console.log('Usage: npm run locale-manager remove <locale-code>');
    process.exit(1);
  }

  validateLocaleCode(localeCode);

  console.log(`🗑️  Removing locale: ${localeCode}`);

  const existingLocales = getExistingLocales();
  if (!existingLocales.includes(localeCode)) {
    console.error(`❌ Error: Locale ${localeCode} does not exist`);
    process.exit(1);
  }

  if (localeCode === 'en') {
    console.error('❌ Error: Cannot remove the default English locale');
    process.exit(1);
  }

  // Remove files
  const jsonPath = path.join(localesDir, `${localeCode}.json`);
  const tsPath = path.join(localesDir, `${localeCode}.ts`);
  const readmePath = path.join(localesDir, `${localeCode}-README.md`);

  if (fs.existsSync(jsonPath)) fs.unlinkSync(jsonPath);
  if (fs.existsSync(tsPath)) fs.unlinkSync(tsPath);
  if (fs.existsSync(readmePath)) fs.unlinkSync(readmePath);

  console.log(`✅ Removed ${localeCode} files`);

  // Update types.ts
  console.log('📝 Updating types.ts...');
  const typesPath = path.join(localesDir, 'types.ts');
  let typesContent = fs.readFileSync(typesPath, 'utf8');

  // Update LocaleKey type
  const localeKeyRegex = /export type LocaleKey = '([^']+)'/;
  const localeKeyMatch = typesContent.match(localeKeyRegex);
  if (localeKeyMatch) {
    const locales = localeKeyMatch[1]
      .split("' | '")
      .filter((l) => l !== localeCode);
    const newLocaleKey = `export type LocaleKey = '${locales.join("' | '")}'`;
    typesContent = typesContent.replace(localeKeyRegex, newLocaleKey);
  }

  // Update availableLocales array
  const availableLocalesRegex =
    /export const availableLocales: LocaleKey\[\] = \[([^\]]+)\]/;
  const availableLocalesMatch = typesContent.match(availableLocalesRegex);
  if (availableLocalesMatch) {
    const locales = availableLocalesMatch[1]
      .split(',')
      .map((l) => l.trim().replace(/'/g, ''))
      .filter((l) => l !== localeCode);
    const newAvailableLocales = `export const availableLocales: LocaleKey[] = [${locales
      .map((l) => `'${l}'`)
      .join(', ')}]`;
    typesContent = typesContent.replace(
      availableLocalesRegex,
      newAvailableLocales
    );
  }

  fs.writeFileSync(typesPath, typesContent);
  console.log('✅ Updated types.ts');

  // Update index.ts
  console.log('📝 Updating index.ts...');
  const indexPath = path.join(localesDir, 'index.ts');
  let indexContent = fs.readFileSync(indexPath, 'utf8');

  // Remove import and export
  indexContent = indexContent.replace(
    new RegExp(`import \\{ ${localeCode} \\} from '\\.\\/${localeCode}';`, 'g'),
    ''
  );
  indexContent = indexContent.replace(
    new RegExp(`export \\{ ${localeCode} \\};`, 'g'),
    ''
  );

  // Update locales object
  const localesRegex = /export const locales = \{([^}]+)\} as const;/;
  const localesMatch = indexContent.match(localesRegex);
  if (localesMatch) {
    const existingLocales = localesMatch[1].replace(
      new RegExp(`\\s*${localeCode},\\s*`, 'g'),
      ''
    );
    const newLocales = `export const locales = {\n  ${existingLocales.trim()},\n} as const;`;
    indexContent = indexContent.replace(localesRegex, newLocales);
  }

  fs.writeFileSync(indexPath, indexContent);
  console.log('✅ Updated index.ts');

  // Update LocaleSwitcher
  console.log('📝 Updating LocaleSwitcher...');
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

  const localeLabelsRegex =
    /const localeLabels: Record<LocaleKey, string> = \{([^}]+)\};/;
  const localeLabelsMatch = switcherContent.match(localeLabelsRegex);
  if (localeLabelsMatch) {
    const existingLabels = localeLabelsMatch[1].replace(
      new RegExp(`\\s*${localeCode}: '[^']*',?\\s*`, 'g'),
      ''
    );
    const newLabels = `const localeLabels: Record<LocaleKey, string> = {\n  ${existingLabels.trim()},\n};`;
    switcherContent = switcherContent.replace(localeLabelsRegex, newLabels);
  }

  fs.writeFileSync(localeSwitcherPath, switcherContent);
  console.log('✅ Updated LocaleSwitcher');

  console.log('\n🎉 Locale removal complete!');
}

function listLocales() {
  console.log('📋 Available locales:');
  const existingLocales = getExistingLocales();
  existingLocales.forEach((locale) => {
    const isDefault = locale === 'en';
    const status = isDefault ? '(default)' : '';
    console.log(`  • ${locale} ${status}`);
  });
  console.log(`\nTotal: ${existingLocales.length} locale(s)`);
}

function validateLocales() {
  console.log('🔍 Validating locale files...');

  const existingLocales = getExistingLocales();
  const enJsonPath = path.join(localesDir, 'en.json');
  const enData = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

  let allValid = true;

  existingLocales.forEach((locale) => {
    const jsonPath = path.join(localesDir, `${locale}.json`);
    const tsPath = path.join(localesDir, `${locale}.ts`);

    if (!fs.existsSync(jsonPath)) {
      console.error(`❌ ${locale}: Missing JSON file`);
      allValid = false;
      return;
    }

    if (!fs.existsSync(tsPath)) {
      console.error(`❌ ${locale}: Missing TypeScript file`);
      allValid = false;
      return;
    }

    try {
      const localeData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

      // Check if structure matches English
      function compareStructure(en, locale, path = '') {
        for (const key in en) {
          const fullPath = path ? `${path}.${key}` : key;
          if (!(key in locale)) {
            console.error(`❌ ${locale}: Missing key "${fullPath}"`);
            allValid = false;
          } else if (
            typeof en[key] === 'object' &&
            typeof locale[key] === 'object'
          ) {
            compareStructure(en[key], locale[key], fullPath);
          }
        }
      }

      compareStructure(enData, localeData);

      // Check for placeholder text
      function checkPlaceholders(obj, path = '') {
        for (const [key, value] of Object.entries(obj)) {
          const fullPath = path ? `${path}.${key}` : key;
          if (typeof value === 'object') {
            checkPlaceholders(value, fullPath);
          } else if (
            typeof value === 'string' &&
            value.startsWith('[') &&
            value.endsWith(']')
          ) {
            console.warn(
              `⚠️  ${locale}: Placeholder found at "${fullPath}": ${value}`
            );
          }
        }
      }

      checkPlaceholders(localeData);

      console.log(`✅ ${locale}: Valid`);
    } catch (error) {
      console.error(`❌ ${locale}: Invalid JSON - ${error.message}`);
      allValid = false;
    }
  });

  if (allValid) {
    console.log('\n🎉 All locales are valid!');
  } else {
    console.log('\n❌ Some locales have issues that need to be fixed.');
    process.exit(1);
  }
}

// Main execution
validateArguments();

switch (command) {
  case 'add':
    addLocale();
    break;
  case 'remove':
    removeLocale();
    break;
  case 'list':
    listLocales();
    break;
  case 'validate':
    validateLocales();
    break;
  default:
    console.error(`❌ Error: Unknown command "${command}"`);
    showUsage();
    process.exit(1);
}
