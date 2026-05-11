'use client';

import { createContext, Dispatch, SetStateAction } from 'react';

export type ThemeMode = 'light' | 'dark';

export type ThemeData = {
  mode: ThemeMode;
};

type ThemeContextType = ThemeData & {
  setTheme: Dispatch<SetStateAction<ThemeData>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  setTheme: () => {},
});
