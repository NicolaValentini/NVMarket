import { i18n } from './config';
import { en, it } from './dictionaries';
import type { Dictionary, Locale } from './types';

const dictionaries: Record<Locale, Dictionary> = {
  en,
  it,
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (!i18n.locales.includes(locale)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Unknown locale "${locale}", using default.`);
    }

    locale = i18n.defaultLocale;
  }

  return dictionaries[locale];
}
