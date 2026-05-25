import { FC } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import StorefrontIcon from '@mui/icons-material/Storefront';

import { getTagsAction } from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { EmptyState, TagChip } from '../../../ui';

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
    <Paper variant='outlined'>
      <List disablePadding>
        {result.data.map((tag, i, array) => (
          <ListItem
            key={tag.id}
            divider={i < array.length - 1}
            secondaryAction={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TagActions action='edit' tag={tag} />

                <TagActions action='delete' tag={tag} />
              </Box>
            }
          >
            <ListItemText primary={<TagChip tag={tag} />} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
