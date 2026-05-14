'use client';

import { FC, use } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { ThemeContext } from '@/context';

type Props = {
  onMenuClick: VoidFunction;
};

export const Topbar: FC<Props> = ({ onMenuClick }) => {
  const { mode, setTheme } = use(ThemeContext);

  const toggleTheme = () => {
    setTheme({ mode: mode === 'dark' ? 'light' : 'dark' });
  };

  return (
    <AppBar position='fixed' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          onClick={onMenuClick}
          sx={{ mr: 1, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <ShoppingCartIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

        <Typography
          variant='h6'
          noWrap
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
        >
          NVMarket
        </Typography>

        <IconButton color='inherit' onClick={toggleTheme}>
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
