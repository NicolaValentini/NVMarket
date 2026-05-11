import { createTheme, type Theme } from '@mui/material/styles';

export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4d9feb',
    },
    secondary: {
      main: '#89dc5f',
    },
    error: {
      main: '#eb524d',
    },
    warning: {
      main: '#fac921',
    },
    info: {
      main: '#d7f5ff',
    },
    background: {
      default: '#0f1117',
      paper: '#1a1d27',
    },
    text: {
      primary: '#f0f4f8',
      secondary: '#a0aec0',
    },
  },
});

export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#5cb832',
    },
    error: {
      main: '#eb524d',
    },
    warning: {
      main: '#e6b800',
    },
    info: {
      main: '#4d9feb',
    },
    background: {
      default: '#f0f4f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1d27',
      secondary: '#4a5568',
    },
  },
});
