'use client';

import { createContext, Dispatch, SetStateAction } from 'react';

import { Dictionary, en, Locale } from '@/lib';

export type I18nData = {
  locale: Locale;
  dictionary: Dictionary;
};

type i18nContext = I18nData & {
  setI18n: Dispatch<SetStateAction<I18nData>>;
};

export const I18nContext = createContext<i18nContext>({
  locale: 'en',
  dictionary: en,
  setI18n: () => {},
});
