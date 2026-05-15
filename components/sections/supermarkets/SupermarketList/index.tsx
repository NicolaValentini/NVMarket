import { FC } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import StorefrontIcon from '@mui/icons-material/Storefront';

import { getSupermarketsAction } from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { ColoredListItem, EmptyState } from '../../../ui';
import { SupermarketActions } from '../SupermarketActions';

export const SupermarketList: FC = async () => {
  const result = await getSupermarketsAction();

  if (result.isError) {
    return <ErrorAlert message={result.message} />;
  }

  if (!result.data?.length) {
    return (
      <EmptyState
        icon={<StorefrontIcon sx={{ fontSize: 64 }} />}
        message='No supermarkets yet'
      />
    );
  }

  return (
    <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
      <List disablePadding>
        {result.data.map((supermarket, i, array) => (
          <ColoredListItem
            key={supermarket.id}
            item={supermarket}
            divider={i < array.length - 1}
            secondaryAction={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <SupermarketActions action='edit' supermarket={supermarket} />

                <SupermarketActions action='delete' supermarket={supermarket} />
              </Box>
            }
          />
        ))}
      </List>
    </Paper>
  );
};
