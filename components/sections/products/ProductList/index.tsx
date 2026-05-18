import { FC, Fragment } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import StorefrontIcon from '@mui/icons-material/Storefront';

import { getProductsWithTagsAction } from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { EmptyState, TagChip } from '../../../ui';
import { ProductActions } from '../ProductActions';

export const ProductList: FC = async () => {
  const result = await getProductsWithTagsAction();

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
          <ListItem
            key={product.id}
            divider={i < array.length - 1}
            secondaryAction={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <ProductActions action='edit' product={product} />

                <ProductActions action='delete' product={product} />
              </Box>
            }
          >
            <ListItemText>
              {product.tags.map(tag => (
                <Fragment key={tag.id}>
                  <TagChip tag={tag} />{' '}
                </Fragment>
              ))}{' '}
              {product.name}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
