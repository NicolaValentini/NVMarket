'use client';

import { FC, ReactNode, useState } from 'react';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';

import { Result } from '@/lib';

import { RouterDialog, RouterDialogOnCloseProps } from '../../ui';

import { ErrorAlert } from '../ErrorAlert';

type Props = RouterDialogOnCloseProps & {
  title: string;
  children: ReactNode;
  deleteAction: () => Promise<Result>;
};

export const DeleteDialog: FC<Props> = ({
  title,
  deleteAction,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
  children,
}) => {
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (handleClose: () => void) => {
    if (deleting) return;
    if (error) setError('');
    setDeleting(true);

    const result = await deleteAction();

    if (result.isError) setError(result.message!);
    else handleClose();

    setDeleting(false);
  };

  return (
    <RouterDialog
      open
      onCloseBack={!deleting ? onCloseBack : undefined}
      onCloseAction={!deleting ? onCloseAction : undefined}
      onCloseRedirect={!deleting ? onCloseRedirect : undefined}
      childrenAction={handleClose => (
        <>
          <DialogTitle>{title}</DialogTitle>

          <DialogContent>
            {children}

            <ErrorAlert message={error} />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} disabled={deleting}>
              Cancel
            </Button>

            <Button
              color='error'
              variant='contained'
              disabled={deleting}
              onClick={() => void handleDelete(handleClose)}
            >
              {deleting ? <CircularProgress size={20} /> : 'Delete'}
            </Button>
          </DialogActions>
        </>
      )}
    />
  );
};
