'use client';

import { FC, use } from 'react';
import { useRouter } from 'next/navigation';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Price } from '@/lib';
import { I18nContext } from '@/context';

type Props = {
  action: 'create' | 'edit' | 'delete';
  price?: Price;
  productId?: string;
};

export const PriceActions: FC<Props> = ({ action, price, productId }) => {
  const router = useRouter();
  const { locale } = use(I18nContext);

  if (action === 'create' && productId) {
    return (
      <IconButton
        size='small'
        onClick={() => router.push(`/${locale}/prices/create/${productId}`)}
      >
        <AddIcon fontSize='small' />
      </IconButton>
    );
  }

  if (action === 'edit' && price?.id) {
    return (
      <IconButton
        size='small'
        onClick={() => router.push(`/${locale}/prices/${price.id}/edit`)}
      >
        <EditIcon fontSize='small' />
      </IconButton>
    );
  }

  if (action === 'delete' && price?.id) {
    return (
      <IconButton
        size='small'
        color='error'
        onClick={() => router.push(`/${locale}/prices/${price.id}/delete`)}
      >
        <DeleteIcon fontSize='small' />
      </IconButton>
    );
  }

  return null;
};
