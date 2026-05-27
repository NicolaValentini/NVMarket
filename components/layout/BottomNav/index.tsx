'use client';

import { FC, use } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { NAV_ITEMS } from '@/lib';
import { I18nContext } from '@/context';

export const BottomNav: FC = () => {
  const pathname = usePathname();
  const { locale } = use(I18nContext);

  const getValue = () =>
    NAV_ITEMS.findIndex(item => pathname.startsWith('/' + locale + item.path));

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: 'block', md: 'none' },
        zIndex: theme => theme.zIndex.drawer + 1,
      }}
      elevation={3}
    >
      <BottomNavigation value={getValue()} showLabels>
        {NAV_ITEMS.map(item => (
          <BottomNavigationAction
            key={item.path}
            icon={<Link href={item.path}>{item.icon}</Link>}
            label={<Link href={item.path}>{item.label}</Link>}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
