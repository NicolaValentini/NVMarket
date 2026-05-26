'use client';

import { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { Dictionary, Locale } from '@/lib';
import { darkTheme, EmotionRegistry, lightTheme } from '@/theme';
import { I18nContext, I18nData, ThemeContext, ThemeData } from '@/context';

type Props = {
  locale: Locale;
  children: ReactNode;
  dictionary: Dictionary;
  setCookieLocaleAction: (locale: Locale) => Promise<void>;
};

export const Providers: FC<Props> = ({
  setCookieLocaleAction,
  locale: initialLocale,
  dictionary: initialDictionary,
  children,
}) => {
  const [{ locale, dictionary }, setI18n] = useState<I18nData>({
    locale: initialLocale,
    dictionary: initialDictionary,
  });

  const [{ mode }, setTheme] = useState<ThemeData>({ mode: 'dark' });

  const theme = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode],
  );

  useEffect(() => {
    void setCookieLocaleAction(locale);
  }, [locale]);

  return (
    <EmotionRegistry options={{ key: 'mui' }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeContext.Provider value={{ mode, setTheme }}>
          <I18nContext.Provider value={{ locale, dictionary, setI18n }}>
            {children}
          </I18nContext.Provider>
        </ThemeContext.Provider>
      </MuiThemeProvider>
    </EmotionRegistry>
  );
};
