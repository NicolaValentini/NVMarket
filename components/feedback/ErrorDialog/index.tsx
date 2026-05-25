import { FC } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { RouterDialog, RouterDialogOnCloseProps } from '../../ui/RouterDialog';

import { ErrorAlert } from '../ErrorAlert';

type Props = RouterDialogOnCloseProps & {
  open: boolean;
  title?: string;
  message: string | null | undefined;
};

export const ErrorDialog: FC<Props> = ({
  open,
  title,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
  message,
}) => {
  if (!message) return null;

  return (
    <RouterDialog
      open={open}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    >
      <DialogTitle>{title ?? 'An error occurred'}</DialogTitle>

      <DialogContent>
        <ErrorAlert message={message} />
      </DialogContent>
    </RouterDialog>
  );
};
