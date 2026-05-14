'use client';

import { FC, ReactNode, useState } from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Topbar } from '../Topbar';
import { Sidebar } from '../Sidebar';
import { BottomNav } from '../BottomNav';

const DRAWER_WIDTH = 220;
const DRAWER_WIDTH_COLLAPSED = 64;

type Props = {
  children: ReactNode;
};

export const AppShell: FC<Props> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [, /*mobileOpen*/ setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Topbar onMenuClick={() => setMobileOpen(prev => !prev)} />

      <Sidebar open={sidebarOpen} />

      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'fixed',
          top: '50%',
          left: sidebarOpen ? DRAWER_WIDTH - 12 : DRAWER_WIDTH_COLLAPSED - 12,
          transform: 'translateY(-50%)',
          zIndex: theme => theme.zIndex.drawer + 2,
          transition: theme =>
            theme.transitions.create('left', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        <IconButton
          size='small'
          onClick={() => setSidebarOpen(prev => !prev)}
          sx={{
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { md: 0 },
          pb: { xs: 8, md: 3 },
          transition: theme =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        <Toolbar />

        {children}
      </Box>

      <BottomNav />
    </Box>
  );
};
