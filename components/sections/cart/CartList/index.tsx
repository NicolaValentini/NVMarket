import { FC } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import StorefrontIcon from '@mui/icons-material/Storefront';

import {
  getCartItemsGroupedBySupermarketAction,
  getPriceDisplayName,
} from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { ColoredListItem, EmptyState, TagChip } from '../../../ui';

import { ProductActions } from '../../products';

import { CartActions } from '../CartActions';

type Props = {
  tagId?: string | undefined;
  productId?: string | undefined;
  supermarketId?: string | undefined;
};

export const CartList: FC<Props> = async ({
  tagId,
  productId,
  supermarketId,
}) => {
  const result = await getCartItemsGroupedBySupermarketAction(
    productId,
    supermarketId,
  );

  if (result.isError) {
    return <ErrorAlert message={result.message} />;
  }

  const cartItemsBySupermarket = (result.data ?? []).filter(cartItem => {
    return !(
      tagId && !cartItem.items.find(item => item.tags.some(t => t.id === tagId))
    );
  });

  if (!cartItemsBySupermarket.length) {
    return (
      <EmptyState
        icon={<StorefrontIcon sx={{ fontSize: 64 }} />}
        message='No cart items yet'
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {cartItemsBySupermarket.map(cartItemBySupermarket => (
        <Paper key={cartItemBySupermarket.supermarket.id} variant='outlined'>
          <List disablePadding>
            <ColoredListItem
              key={cartItemBySupermarket.supermarket.id + 'listItem'}
              item={cartItemBySupermarket.supermarket}
              divider
              secondaryAction={
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <CartActions
                    action='empty'
                    supermarketId={cartItemBySupermarket.supermarket.id}
                  />
                </Box>
              }
            />

            {cartItemBySupermarket.items
              .filter(cartItem => {
                return !(tagId && !cartItem.tags.some(t => t.id === tagId));
              })
              .map((cartItem, i, array) => {
                const displayValue = [
                  cartItem.productName,
                  getPriceDisplayName({
                    name: cartItem.priceName,
                    price: cartItem.price,
                    yuka: cartItem.yuka,
                  }),
                ].join(' - ');

                return (
                  <ColoredListItem
                    key={cartItem.id}
                    item={cartItemBySupermarket.supermarket}
                    divider={i < array.length - 1}
                    primary={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {cartItem.favorite ? (
                          <strong>{displayValue}</strong>
                        ) : (
                          displayValue
                        )}
                        {cartItem.tags.map(tag => (
                          <TagChip key={tag.id} tag={tag} />
                        ))}
                      </Box>
                    }
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <ProductActions
                          action='buy'
                          product={{
                            id: cartItem.product_id,
                            quantity: cartItem.quantity,
                            hasPrices: true,
                          }}
                        />

                        <CartActions
                          action='empty'
                          productId={cartItem.product_id}
                        />
                      </Box>
                    }
                  />
                );
              })}
          </List>
        </Paper>
      ))}
    </Box>
  );
};
