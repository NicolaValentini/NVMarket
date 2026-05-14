'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import { deleteSupermarketAction, Supermarket } from '@/lib';

import { ConfirmDialog } from '../../../ui';
import { ErrorAlert } from '../../../feedback';

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
      <div>
        Are you sure you want to delete <strong>{supermarket.name}</strong>? All
        associated prices will be deleted too.
      </div>

      <ErrorAlert message={error} />
    </ConfirmDialog>
  );
};
