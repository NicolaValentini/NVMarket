import { FC } from 'react';
import Link from 'next/link';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Price } from '@/lib';

import { FavoriteAction } from './FavoriteAction';

type Props = {
  action: 'create' | 'favorite' | 'edit' | 'delete';
  price?: Price;
  productId?: string;
};

export const PriceActions: FC<Props> = ({ action, price, productId }) => {
  if (action === 'create' && productId) {
    return (
      <Link href={`/prices/create/${productId}`}>
        <IconButton size='small'>
          <AddIcon fontSize='small' />
        </IconButton>
      </Link>
    );
  }

  if (action === 'favorite' && price?.id) {
    return <FavoriteAction price={price} />;
  }

  if (action === 'edit' && price?.id) {
    return (
      <Link href={`/prices/${price.id}/edit`}>
        <IconButton size='small'>
          <EditIcon fontSize='small' />
        </IconButton>
      </Link>
    );
  }

  if (action === 'delete' && price?.id) {
    return (
      <Link href={`/prices/${price.id}/delete`}>
        <IconButton size='small' color='error'>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Link>
    );
  }

  return null;
};
