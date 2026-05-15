import { FC } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { RouterDialog } from '../../ui/RouterDialog';
import { ErrorAlert } from '../ErrorAlert';

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
  if (!message) return null;

  return (
    <RouterDialog
      open={open}
      onCloseAction={onClose}
      onCloseBack={onCloseBack}
      onCloseRedirect={onCloseRedirect}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <ErrorAlert message={message} />
      </DialogContent>
    </RouterDialog>
  );
};
