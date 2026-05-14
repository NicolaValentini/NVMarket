import { FC, ReactNode } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  open: boolean;
  title: string;
  children: ReactNode;
  loading?: boolean;
  confirmLabel?: string;
  confirmColor?: 'error' | 'primary' | 'secondary' | 'warning';
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmDialog: FC<Props> = ({
  open,
  title,
  children,
  loading = false,
  confirmLabel = 'Confirm',
  confirmColor = 'error',
  onConfirm,
  onClose,
}) => (
  <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
    <DialogTitle>{title}</DialogTitle>

    <DialogContent>{children}</DialogContent>

    <DialogActions>
      <Button onClick={onClose} disabled={loading}>
        Cancel
      </Button>

      <Button
        variant='contained'
        color={confirmColor}
        onClick={onConfirm}
        disabled={loading}
      >
        {loading ? <CircularProgress size={20} /> : confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);
