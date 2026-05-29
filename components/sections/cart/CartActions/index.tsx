import { FC } from 'react';

import { EmptyAction } from './EmptyAction';

type Props = {
  action: 'empty';
} & ({ productId: string } | { supermarketId: string });

export const CartActions: FC<Props> = ({ action, ...rest }) => {
  if (action === 'empty' && ('productId' in rest || 'supermarketId' in rest)) {
    return (
      <EmptyAction
        {...('productId' in rest
          ? { productId: rest.productId }
          : { supermarketId: rest.supermarketId })}
      />
    );
  }

  return null;
};
