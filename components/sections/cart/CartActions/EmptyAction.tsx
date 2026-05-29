'use client';

import { FC, startTransition, useActionState } from 'react';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  EmptyCart,
  emptyCartItemByProductIdAction,
  emptyCartItemsBySupermarketAction,
} from '@/lib';

type Props = { productId: string } | { supermarketId: string };

export const EmptyAction: FC<Props> = props => {
  console.log({ props });
  const [, dispatchAction, isPending] = useActionState<EmptyCart>(
    'productId' in props
      ? emptyCartItemByProductIdAction
      : emptyCartItemsBySupermarketAction,
    'productId' in props
      ? { productId: props.productId }
      : { supermarketId: props.supermarketId },
  );

  return (
    <IconButton
      size='small'
      disabled={isPending}
      onClick={() => startTransition(dispatchAction)}
    >
      <DeleteIcon fontSize='small' />
    </IconButton>
  );
};
