'use client';

import { FC, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import Dialog from '@mui/material/Dialog';

type Props = {
  open: boolean;
  onCloseBack?: boolean | undefined;
  onCloseRedirect?: string | undefined;
  onCloseAction?: (() => void) | undefined;
  children: ReactNode;
};

export const RouterDialog: FC<Props> = ({
  open,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
  children,
}) => {
  const router = useRouter();

  const handleClose = () => {
    if (onCloseAction) onCloseAction();
    else if (onCloseBack) router.back();
    else if (onCloseRedirect) router.push(onCloseRedirect);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
      {children}
    </Dialog>
  );
};
