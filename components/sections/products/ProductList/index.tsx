import { FC } from 'react';

import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import StorefrontIcon from '@mui/icons-material/Storefront';

import { getProductsWithQuantityAndTagsAction } from '@/lib';

import { EmptyState } from '../../../ui';
import { ErrorAlert } from '../../../feedback';

import { ProductListItem } from '../ProductListItem';

export const ProductList: FC = async () => {
  const result = await getProductsWithQuantityAndTagsAction();

  if (result.isError) {
    return <ErrorAlert message={result.message} />;
  }

  if (!result.data?.length) {
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
        {result.data.map((product, i, array) => (
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
