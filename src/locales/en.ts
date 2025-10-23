/**
 * English locale file for QRFolio
 *
 * This file imports the JSON locale data and provides TypeScript types.
 * To add new translations, edit the corresponding JSON file.
 */

import enData from './en.json';

export const en = enData;

// Type for the locale structure
export type LocaleMessages = typeof en;
