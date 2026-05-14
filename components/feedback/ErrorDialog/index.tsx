'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';

import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

type Props = {
  open: boolean;
  title: string;
  onClose?: () => void;
  onCloseBack?: boolean;
  onCloseRedirect?: string;
  message: string | null | undefined;
};

export const ErrorDialog: FC<Props> = ({
  open,
  title,
  onClose,
  onCloseBack,
  onCloseRedirect,
  message,
}) => {
  const router = useRouter();

  if (!message) return null;

  const handleClose = () => {
    if (onClose) onClose();
    else if (onCloseBack) router.back();
    else if (onCloseRedirect) router.push(onCloseRedirect);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Alert severity='error' sx={{ mb: 2 }}>
          {message}
        </Alert>
      </DialogContent>
    </Dialog>
  );
};
