import { FC } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import StorefrontIcon from '@mui/icons-material/Storefront';

import { Supermarket } from '@/lib';

import { ColoredListItem, EmptyState } from '../../../ui';
import { SupermarketActions } from '../SupermarketActions';

type Props = {
  supermarkets: Supermarket[];
};

export const SupermarketList: FC<Props> = ({ supermarkets }) => {
  if (supermarkets.length === 0) {
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
        {supermarkets.map((supermarket, i) => (
          <ColoredListItem
            key={supermarket.id}
            item={supermarket}
            divider={i < supermarkets.length - 1}
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
