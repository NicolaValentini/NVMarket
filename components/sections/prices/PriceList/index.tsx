'use client';

import { FC, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CircularProgress from '@mui/material/CircularProgress';

import { getPricesByProductIdAction, Price, Result } from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { SmallEmptyState } from '../../../ui';
import { PriceActions } from '../PriceActions';

type Props = {
  productId: string;
};

export const PriceList: FC<Props> = ({ productId }) => {
  const [isLoading, setLoading] = useState(true);
  const [result, setResult] = useState<Result<Price[]>>({ isError: false });

  useEffect(() => {
    getPricesByProductIdAction(productId)
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
        <ListItem
          key={price.id}
          sx={{ paddingLeft: 8 }}
          divider={i < array.length - 1}
          secondaryAction={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <PriceActions action='favorite' price={price} />

              <PriceActions action='edit' price={price} />

              <PriceActions action='delete' price={price} />
            </Box>
          }
        >
          <ListItemText>
            {price.name} {price.price}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
