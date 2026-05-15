'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { deleteSupermarketAction, Supermarket } from '@/lib';

import { ColoredListItem } from '../../../ui';
import { ConfirmDialog, ErrorAlert } from '../../../feedback';

type Props = {
  intercepted?: boolean;
  supermarket: Supermarket;
};

export const SupermarketDelete: FC<Props> = ({ intercepted, supermarket }) => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  const handleClose = () => {
    if (intercepted) router.back();
    else router.push('./../');
  };

  const handleDelete = async () => {
    if (deleting) return;
    if (error) setError('');
    setDeleting(true);

    const result = await deleteSupermarketAction(supermarket.id);

    if (result.isError) setError(result.message!);
    else handleClose();

    setDeleting(false);
  };

  return (
    <ConfirmDialog
      open
      loading={deleting}
      onClose={handleClose}
      confirmLabel='Delete'
      title='Delete Supermarket'
      onConfirm={() => void handleDelete()}
    >
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}
      >
        <Typography>Are you sure you want to delete the supermarket</Typography>
        <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
          <List disablePadding sx={{ overflow: 'hidden' }}>
            <ColoredListItem item={supermarket} />
          </List>
        </Paper>
        <Typography>?</Typography>
        <Typography>All associated prices will be deleted too.</Typography>
      </Box>

      <ErrorAlert message={error} />
    </ConfirmDialog>
  );
};
