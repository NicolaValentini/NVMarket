'use client';

import { FC, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import Dialog from '@mui/material/Dialog';

export type RouterDialogOnCloseProps = {
  onCloseBack?: boolean | undefined;
  onCloseRedirect?: string | undefined;
  onCloseAction?: (() => void) | undefined;
};

type Props = RouterDialogOnCloseProps & {
  open: boolean;
} & (
    | { children: ReactNode }
    | { childrenAction: (handleClose: () => void) => ReactNode }
  );

export const RouterDialog: FC<Props> = ({
  open,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
  ...rest
}) => {
  const router = useRouter();

  const handleClose = () => {
    if (onCloseAction) onCloseAction();
    else if (onCloseBack) router.back();
    else if (onCloseRedirect) router.push(onCloseRedirect);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
      {'children' in rest ? rest.children : rest.childrenAction(handleClose)}
    </Dialog>
  );
};
