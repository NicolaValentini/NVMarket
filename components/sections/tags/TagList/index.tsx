import { FC } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import StorefrontIcon from '@mui/icons-material/Storefront';

import { getTagsAction } from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { ColoredListItem, EmptyState } from '../../../ui';
import { TagActions } from '../TagActions';

export const TagList: FC = async () => {
  const result = await getTagsAction();

  if (result.isError) {
    return <ErrorAlert message={result.message} />;
  }

  if (!result.data?.length) {
    return (
      <EmptyState
        icon={<StorefrontIcon sx={{ fontSize: 64 }} />}
        message='No tags yet'
      />
    );
  }

  return (
    <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
      <List disablePadding>
        {result.data.map((tag, i, array) => (
          <ColoredListItem
            key={tag.id}
            item={tag}
            divider={i < array.length - 1}
            secondaryAction={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TagActions action='edit' tag={tag} />

                <TagActions action='delete' tag={tag} />
              </Box>
            }
          />
        ))}
      </List>
    </Paper>
  );
};
