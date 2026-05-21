'use client';

import { FC, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CircularProgress from '@mui/material/CircularProgress';

import {
  getPricesWithSupermarketByProductIdAction,
  PriceWithSupermarket,
  Result,
} from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { ColoredListItem, SmallEmptyState } from '../../../ui';
import { PriceActions } from '../PriceActions';

type Props = {
  productId: string;
};

export const PriceList: FC<Props> = ({ productId }) => {
  const [isLoading, setLoading] = useState(true);
  const [result, setResult] = useState<Result<PriceWithSupermarket[]>>({
    isError: false,
  });

  useEffect(() => {
    getPricesWithSupermarketByProductIdAction(productId)
      .then(setResult)
      .finally(() => setLoading(false));
  }, [productId]);

  if (result.isError) {
    return <ErrorAlert message={result.message} />;
  }

  if (isLoading) {
    return (
      <SmallEmptyState
        icon={<CircularProgress size={32} />}
        message='Fetching prices'
      />
    );
  }

  if (!result.data?.length) {
    return (
      <SmallEmptyState
        icon={<StorefrontIcon sx={{ fontSize: 32 }} />}
        message='No prices yet'
      />
    );
  }

  return (
    <List disablePadding>
      {result.data.map((price, i, array) => (
        <ColoredListItem
          key={price.id}
          item={{
            id: price.id,
            name: price.supermarketName,
            color: price.supermarketColor,
          }}
          sx={{ paddingLeft: 10 }}
          divider={i < array.length - 1}
          primary={[price.name, price.price, price.yuka]
            .filter(Boolean)
            .join(' - ')}
          secondaryAction={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <PriceActions action='favorite' price={price} />

              <PriceActions action='edit' price={price} />

              <PriceActions action='delete' price={price} />
            </Box>
          }
        />
      ))}
    </List>
  );
};
