'use client';

import { FC, use } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Paper from '@mui/material/Paper';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BottomNavigation from '@mui/material/BottomNavigation';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { I18nContext } from '@/context';

export const BottomNav: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = use(I18nContext);

  const getValue = () => {
    if (pathname.includes('/products')) return 0;
    if (pathname.includes('/tags')) return 1;
    if (pathname.includes('/supermarkets')) return 2;
    if (pathname.includes('/cart')) return 3;
    return 0;
  };

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
        <BottomNavigationAction
          label='Products'
          icon={<InventoryIcon />}
          onClick={() => router.push(`/${locale}/products`)}
        />

        <BottomNavigationAction
          label='Tags'
          icon={<LocalOfferIcon />}
          onClick={() => router.push(`/${locale}/tags`)}
        />

        <BottomNavigationAction
          label='Supermarkets'
          icon={<StorefrontIcon />}
          onClick={() => router.push(`/${locale}/supermarkets`)}
        />

        <BottomNavigationAction
          label='Cart'
          icon={<ShoppingBasketIcon />}
          onClick={() => router.push(`/${locale}/cart`)}
        />
      </BottomNavigation>
    </Paper>
  );
};
