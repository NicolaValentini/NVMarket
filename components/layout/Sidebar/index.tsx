'use client';

import { FC, use } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { NAV_ITEMS } from '@/lib';
import { I18nContext } from '@/context';

const DRAWER_WIDTH = 220;
const DRAWER_WIDTH_COLLAPSED = 64;

type Props = {
  open: boolean;
};

export const Sidebar: FC<Props> = ({ open }) => {
  const pathname = usePathname();
  const { locale } = use(I18nContext);

  return (
    <Drawer
      variant='permanent'
      sx={{
        display: { xs: 'none', md: 'block' },
        width: open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
        flexShrink: 0,
        transition: theme =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: open
              ? theme.transitions.duration.enteringScreen
              : theme.transitions.duration.leavingScreen,
          }),
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
          overflowX: 'hidden',
          transition: theme =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: open
                ? theme.transitions.duration.enteringScreen
                : theme.transitions.duration.leavingScreen,
            }),
        },
      }}
    >
      <Toolbar />

      <Divider />

      <List>
        {NAV_ITEMS.map(item => (
          <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
            <Tooltip title={!open ? item.label : ''} placement='right'>
              <Link href={item.path}>
                <ListItemButton
                  selected={pathname.startsWith('/' + locale + item.path)}
                  sx={{ minHeight: 48, px: 2.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto' }}>
                    {item.icon}
                  </ListItemIcon>

                  {open && <ListItemText primary={item.label} />}
                </ListItemButton>
              </Link>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
