import { FC } from 'react';

import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import StorefrontIcon from '@mui/icons-material/Storefront';

import {
  getProductsWithQuantityAndTagsAction,
  getProductsWithQuantityAndTagsBySupermarketAction,
} from '@/lib';

import { EmptyState } from '../../../ui';
import { ErrorAlert } from '../../../feedback';

import { ProductListItem } from '../ProductListItem';

type Props = {
  tagId?: string | undefined;
  supermarketId?: string | undefined;
};

export const ProductList: FC<Props> = async ({ tagId, supermarketId }) => {
  const result = supermarketId
    ? await getProductsWithQuantityAndTagsBySupermarketAction(supermarketId)
    : await getProductsWithQuantityAndTagsAction();

  if (result.isError) {
    return <ErrorAlert message={result.message} />;
  }

  const products = (result.data ?? []).filter(product => {
    return !(tagId && !product.tags.some(t => t.id === tagId));
  });

  if (!products.length) {
    return (
      <EmptyState
        icon={<StorefrontIcon sx={{ fontSize: 64 }} />}
        message='No products yet'
      />
    );
  }

  return (
    <Paper variant='outlined'>
      <List disablePadding>
        {products.map((product, i, array) => (
          <ProductListItem
            key={product.id}
            product={product}
            divider={i < array.length - 1}
          />
        ))}
      </List>
    </Paper>
  );
};
