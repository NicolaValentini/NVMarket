import { FC } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {
  checkDataFound,
  deleteSupermarketAction,
  getSupermarketByIdAction,
} from '@/lib';

import { DeleteDialog, ErrorDialog } from '../../../feedback';
import { ColoredListItem, RouterDialogOnCloseProps } from '../../../ui';

type Props = RouterDialogOnCloseProps & {
  id: string;
};

export const SupermarketDelete: FC<Props> = async ({
  id,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const supermarket = id ? await getSupermarketByIdAction(id) : undefined;

  const error = checkDataFound(supermarket, !id);
  const deleteAction = deleteSupermarketAction.bind(null, id);

  return error ? (
    <ErrorDialog
      open
      message={error}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  ) : (
    <DeleteDialog
      title='Delete Supermarket'
      deleteAction={deleteAction}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <Typography>Are you sure you want to delete the supermarket</Typography>
        <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
          <List disablePadding>
            <ColoredListItem item={supermarket!.data!} />
          </List>
        </Paper>
        <Typography>?</Typography>
        <Typography>All associated prices will be deleted too.</Typography>
      </Box>
    </DeleteDialog>
  );
};
