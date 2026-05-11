'use client';

import { FC, ReactNode, useState, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { Dictionary, Locale } from '@/lib';
import { darkTheme, lightTheme, EmotionRegistry } from '@/theme';
import { I18nContext, I18nData, ThemeContext, ThemeData } from '@/context';

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

  const [{ mode }, setTheme] = useState<ThemeData>({ mode: 'dark' });

  const theme = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode],
  );

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
