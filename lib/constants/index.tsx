import InventoryIcon from '@mui/icons-material/Inventory';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import { NavItem } from '../types';

export const COLORS = [
  '#4d9feb',
  '#89dc5f',
  '#eb524d',
  '#fac921',
  '#d7f5ff',
  '#f48fb1',
  '#ce93d8',
  '#80cbc4',
  '#ffcc80',
  '#a5d6a7',
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'Products', icon: <InventoryIcon />, path: '/products' },
  { label: 'Tags', icon: <LocalOfferIcon />, path: '/tags' },
  { label: 'Supermarkets', icon: <StorefrontIcon />, path: '/supermarkets' },
  { label: 'Cart', icon: <ShoppingBasketIcon />, path: '/cart' },
];
