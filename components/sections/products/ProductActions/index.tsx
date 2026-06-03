import { FC } from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { ProductWithQuantity } from '@/lib';

import { QuantityInput } from '../../../ui';

type Props = {
  disabled?: true;
  action: 'create' | 'buy' | 'edit' | 'delete';
  product?: Pick<ProductWithQuantity, 'id' | 'quantity' | 'hasPrices'>;
};

export const ProductActions: FC<Props> = ({ action, product, disabled }) => {
  if (action === 'create') {
    return (
      <Link href='/products/create'>
        <Button variant='contained' startIcon={<AddIcon />}>
          Add
        </Button>
      </Link>
    );
  }

  if (action === 'buy' && product?.id && product.hasPrices) {
    return (
      <QuantityInput
        value={product.quantity}
        productId={product.id}
        disabled={disabled}
      />
    );
  }

  if (action === 'edit' && product?.id) {
    return (
      <Link href={`/products/${product.id}/edit`}>
        <IconButton size='small'>
          <EditIcon fontSize='small' />
        </IconButton>
      </Link>
    );
  }

  if (action === 'delete' && product?.id) {
    return (
      <Link href={`/products/${product.id}/delete`}>
        <IconButton size='small' color='error'>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Link>
    );
  }

  return null;
};
