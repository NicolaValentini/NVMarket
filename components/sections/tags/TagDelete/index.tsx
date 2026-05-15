'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { deleteTagAction, Tag } from '@/lib';

import { TagChip } from '../../../ui';
import { ConfirmDialog, ErrorAlert } from '../../../feedback';

type Props = {
  intercepted?: boolean;
  tag: Tag;
};

export const TagDelete: FC<Props> = ({ intercepted, tag }) => {
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

    const result = await deleteTagAction(tag.id);

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
      title='Delete Tag'
      onConfirm={() => void handleDelete()}
    >
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}
      >
        <Typography>Are you sure you want to delete the tag</Typography>
        <TagChip tag={tag} />
        <Typography>?</Typography>
      </Box>

      <ErrorAlert message={error} />
    </ConfirmDialog>
  );
};
