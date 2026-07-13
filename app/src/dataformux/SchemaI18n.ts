// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import schemaMessages from "../locales/schema_zh_TW.json";

type SchemaMessages = Record<string, string>;

const translations: SchemaMessages = schemaMessages;

/**
 * Translate a schema-driven UI string.
 * Schema strings come from @minecraft/bedrock-schemas .form.json files
 * and are NOT part of the react-intl locale system.
 *
 * This utility provides a translation layer for those strings.
 *
 * @param text - The English schema string to translate
 * @returns The translated string, or the original if no translation exists
 */
export function translateSchemaText(text: string): string {
  if (!text || typeof text !== "string") {
    return text ?? "";
  }

  const trimmed = text.trim();
  if (!trimmed) {
    return text;
  }

  const translated = translations[trimmed];
  if (translated !== undefined) {
    return translated;
  }

  // Try the non-trimmed version too
  if (trimmed !== text && translations[text] !== undefined) {
    return translations[text];
  }

  return text;
}

/**
 * Check if there's a translation available for a schema string.
 * Useful for debugging or conditionally showing original text.
 */
export function hasSchemaTranslation(text: string): boolean {
  if (!text || typeof text !== "string") {
    return false;
  }
  return translations[text.trim()] !== undefined || translations[text] !== undefined;
}

/**
 * Get statistics about the translation map.
 */
export function getSchemaTranslationStats(): { total: number; sample: Array<{ en: string; zh: string }> } {
  const entries = Object.entries(translations);
  return {
    total: entries.length,
    sample: entries.slice(0, 5).map(([en, zh]) => ({ en, zh })),
  };
}
