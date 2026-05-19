'use client';

import { FC, use } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { ProductWithQuantity } from '@/lib';
import { I18nContext } from '@/context';

import { QuantityInput } from '../../../ui';

type Props = {
  action: 'create' | 'buy' | 'edit' | 'delete';
  product?: ProductWithQuantity;
};

export const ProductActions: FC<Props> = ({ action, product }) => {
  const router = useRouter();
  const { locale } = use(I18nContext);

  if (action === 'create') {
    return (
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={() => router.push(`/${locale}/products/create`)}
      >
        Add
      </Button>
    );
  }

  if (action === 'buy' && product?.id) {
    return <QuantityInput value={product.quantity} productId={product.id} />;
  }

  if (action === 'edit' && product?.id) {
    return (
      <IconButton
        size='small'
        onClick={() => router.push(`/${locale}/products/${product.id}/edit`)}
      >
        <EditIcon fontSize='small' />
      </IconButton>
    );
  }

  if (action === 'delete' && product?.id) {
    return (
      <IconButton
        size='small'
        color='error'
        onClick={() => router.push(`/${locale}/products/${product.id}/delete`)}
      >
        <DeleteIcon fontSize='small' />
      </IconButton>
    );
  }

  return null;
};
