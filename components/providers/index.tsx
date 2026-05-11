'use client';

import { FC, ReactNode, useState } from 'react';

import { Dictionary, Locale } from '@/lib';
import { I18nContext, I18nData } from '@/context';

type Props = {
  locale: Locale;
  children: ReactNode;
  dictionary: Dictionary;
};

export const Providers: FC<Props> = ({
  locale: initialLocale,
  dictionary: initialDictionary,
  children,
}) => {
  const [{ locale, dictionary }, setI18n] = useState<I18nData>({
    locale: initialLocale,
    dictionary: initialDictionary,
  });

  return (
    <I18nContext.Provider value={{ locale, dictionary, setI18n }}>
      {children}
    </I18nContext.Provider>
  );
};
